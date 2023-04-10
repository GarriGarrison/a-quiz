import { FC, useState, ChangeEvent } from 'react'
import { Typography } from '@alfalab/core-components/typography'
import { Button } from '@alfalab/core-components/button'
import { Select, SelectProps } from '@alfalab/core-components/select'
import { Space } from '@alfalab/core-components/space'
import { MaskedInput } from '@alfalab/core-components/masked-input'
import { Category, Difficulty } from '@/types/params'
import { optionsCategory, optionsDifficulty } from '@/types/selected'
import { WelcomeProps } from './Welcome.props'
import './Welcome.scss'

export const Welcome: FC<WelcomeProps> = ({ onStart }) => {
  const maskLimitQuestion = [/[0-2]/, /[0-9]/]

  const [difficulty, setDifficulty] = useState<Difficulty>('Easy')
  const [category, setCategory] = useState<Category | undefined>()
  const [quizCount, setQuizCount] = useState<string>('1')

  const handleChangeDifficulty: SelectProps['onChange'] = (payload) => {
    if (payload.selected) {
      setDifficulty(payload.selected.content as Difficulty)
    }
  }

  const handleChangeCategory: SelectProps['onChange'] = (payload) => {
    if (payload.selected) {
      setCategory(payload.selected.content as Category)
    }
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizCount(event.target.value)
  }

  //? Данный компонент возможно переделать на FormContorl (p.s. К сожалению нехватает времени)

  return (
    <div className="welcome">
      <Space direction="vertical" size={16}>
        <Typography.Title tag="h1">Добро пожаловать в викторину!</Typography.Title>
        <Space direction="vertical" size={14}>
          <Select
            options={optionsDifficulty}
            placeholder="Выберите уровень сложности"
            onChange={handleChangeDifficulty}
          />
          <Select options={optionsCategory} placeholder="Выберите категорию вопросов" onChange={handleChangeCategory} />
          <MaskedInput mask={maskLimitQuestion} onChange={handleInput} />
        </Space>
        <Typography.Text view="primary-large">
          Для успешного прохождения теста необходимо набрать не менее 80% правильных ответов
        </Typography.Text>
        <Button view="primary" onClick={() => onStart({ difficulty, category, count: quizCount })}>
          Начать тест
        </Button>
      </Space>
    </div>
  )
}
