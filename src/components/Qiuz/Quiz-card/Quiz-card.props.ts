import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { CorrectAnswersNames, QuizType } from '@/types/api'

export interface QuizCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: never
  answers: QuizType['answers']
  category: QuizType['category']
  difficulty: QuizType['difficulty']
  question: QuizType['question']
  currentQuestion: number
  quizLength: number
  multipleAnswers: 'true' | 'false'
  correct: Record<CorrectAnswersNames, 'true' | 'false'>
  handleSwitchQuestion: (isRight: boolean) => void
}
