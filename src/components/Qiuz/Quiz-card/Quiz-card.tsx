import { FC, useState } from 'react'
import { Space } from '@alfalab/core-components/space'
import { Typography } from '@alfalab/core-components/typography'
import { RadioGroup, RadioGroupProps } from '@alfalab/core-components/radio-group'
import { Radio } from '@alfalab/core-components/radio'
import { Button } from '@alfalab/core-components/button'
import { CheckboxGroup, CheckboxGroupProps } from '@alfalab/core-components/checkbox-group'
import { Checkbox } from '@alfalab/core-components/checkbox'
import { AnswersNames, CorrectAnswersNames } from '@/types/api'
import { isSetTrue } from '@/utils/is-set-true'
import { boolToStr } from '@/utils/bool-to-str'
import { QuizCardProps } from './Quiz-card.props'
import './Quiz-card.scss'

export const QuizCard: FC<QuizCardProps> = ({
  answers,
  category,
  difficulty,
  question,
  currentQuestion,
  quizLength,
  multipleAnswers,
  correct,
  handleSwitchQuestion,
}) => {
  const [valueRadio, setValueRadio] = useState<RadioGroupProps['value']>(null)

  //* Если вопрос с мультивыбором
  const initialStateCheck = {
    answer_a: false,
    answer_b: false,
    answer_c: false,
    answer_d: false,
    answer_e: false,
    answer_f: false,
  }
  const [valuesSelect, setValuesSelect] = useState(initialStateCheck)

  const handleChangeRadio: RadioGroupProps['onChange'] = (_, payload) => {
    setValueRadio(payload?.value)
  }

  const handleSelectCheck: CheckboxGroupProps['onChange'] = (_, payload) => {
    setValuesSelect(
      Object.assign(Object.assign({}, valuesSelect), {
        [payload?.name as string]: payload?.checked,
      })
    )
  }

  const handleChangeQuestion = () => {
    if (multipleAnswers === 'true') {
      //* Метод Object.values() использовать нельзя, т.к. он возвращает значения в произволном порядке
      //* возвращает массив значений перечисляемых свойств объекта в том же порядке что и цикл for...in

      //? Возможно в объекте valueSelect сделать такие же ключи как в  объекте correct (answer_Х_correct)
      //? и поодному ключу доставать значения из двух объектов и сравнивать их
      //? очень странное название ключей answer_Х_correct для выбора пользователя

      if (
        correct.answer_a_correct === boolToStr(valuesSelect.answer_a) &&
        correct.answer_b_correct === boolToStr(valuesSelect.answer_b) &&
        correct.answer_c_correct === boolToStr(valuesSelect.answer_c) &&
        correct.answer_d_correct === boolToStr(valuesSelect.answer_d) &&
        correct.answer_e_correct === boolToStr(valuesSelect.answer_e) &&
        correct.answer_f_correct === boolToStr(valuesSelect.answer_f)
      ) {
        handleSwitchQuestion(true)
      } else {
        handleSwitchQuestion(false)
      }
    } else {
      if (isSetTrue(correct[`${valueRadio}_correct` as CorrectAnswersNames])) {
        handleSwitchQuestion(true)
      } else {
        handleSwitchQuestion(false)
      }
      setValueRadio(null)
    }
  }

  return (
    <div className="quiz-card">
      <Space direction="vertical" size={16}>
        <Typography.Title tag="h1">
          Вопрос {currentQuestion} из {quizLength}
        </Typography.Title>
        <Space direction="vertical" size={8}>
          <Typography.Text view="primary-small">Категория вопроса: {category}</Typography.Text>
          <Typography.Text view="primary-small">Сложность вопроса: {difficulty}</Typography.Text>
        </Space>
        {multipleAnswers === 'false' ? (
          <RadioGroup label={question} value={valueRadio} onChange={handleChangeRadio}>
            {Object.keys(answers)
              .filter((name) => answers[name as AnswersNames])
              .map((name) => (
                <Radio key={name} label={answers[name as AnswersNames]} value={name} />
              ))}
          </RadioGroup>
        ) : (
          <CheckboxGroup label={question} onChange={handleSelectCheck}>
            {Object.keys(answers)
              .filter((answer) => answers[answer as AnswersNames])
              .map((answer, index) => (
                <Checkbox
                  key={index}
                  label={answers[answer as AnswersNames]}
                  name={answer}
                  checked={valuesSelect[answer as AnswersNames]}
                />
              ))}
          </CheckboxGroup>
        )}
        <Button
          view="primary"
          size="m"
          onClick={handleChangeQuestion}
          //* проверку что где-то стоит галочка не делал, т.к. мне попался вопрос где все правильные ответы были false
          disabled={!valueRadio && multipleAnswers === 'false'}
        >
          Следующий вопрос
        </Button>
      </Space>
    </div>
  )
}
