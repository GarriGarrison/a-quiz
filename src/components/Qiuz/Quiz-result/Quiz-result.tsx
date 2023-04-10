import { FC } from 'react'
import { Space } from '@alfalab/core-components/space'
import { Typography } from '@alfalab/core-components/typography'
import { Button } from '@alfalab/core-components/button'
import { calcPrecentAnswers } from '@/utils/calc-percent'
import { QuizResultProps } from './Quiz-result.props'
import './Quiz-result.scss'

export const QuizResult: FC<QuizResultProps> = ({ rightAnswers, quizLength, handleRetryTest }) => {
  const IQ_LEVEL = 80
  const iqCalc = calcPrecentAnswers(rightAnswers, quizLength)

  return (
    <div className="quiz-results">
      <Space direction="vertical" size={20}>
        <Typography.Title tag="h1">Тест закончен</Typography.Title>
        <Typography.Text view="primary-large">
          {iqCalc >= IQ_LEVEL ? (
            <span>Ты успешно прошел тест, ты набрал больше 80% верных ответов</span>
          ) : (
            <span>Тест не пройден, ты набрал меньше 80% верных ответов</span>
          )}
        </Typography.Text>
        <Typography.Text view="primary-large">
          Ваш результат: {rightAnswers} из {quizLength} правильных ответов
        </Typography.Text>
        {iqCalc < IQ_LEVEL ? (
          <Button view="primary" onClick={handleRetryTest}>
            Пройти ещё раз
          </Button>
        ) : null}
      </Space>
    </div>
  )
}
