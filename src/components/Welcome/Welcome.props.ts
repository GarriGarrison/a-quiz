import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ReqParams } from '@/types/params'

export interface WelcomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: never
  onStart: ({difficulty, category, count}: ReqParams) => void
}
