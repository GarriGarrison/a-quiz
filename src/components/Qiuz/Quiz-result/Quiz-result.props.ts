import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface QuizResultProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: never
  rightAnswers: number
  quizLength: number
  handleRetryTest: () => void
}
