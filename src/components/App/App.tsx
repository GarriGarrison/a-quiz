import { FC } from 'react'
import {Quiz} from '@/components/Qiuz'
import './App.scss'

export const App: FC = () => {
  return (
    <div className="app">
      <Quiz />
    </div>
  )
}
