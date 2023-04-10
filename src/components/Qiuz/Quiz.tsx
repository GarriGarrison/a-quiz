import { FC, useState, useCallback } from 'react'
import { Spinner } from '@alfalab/core-components/spinner'
import { Notification } from '@alfalab/core-components/notification'
import { Welcome } from '@/components/Welcome'
import { getQuestions } from '@/api/quiz'
import { ReqParams } from '@/types/params'
import { QuizType } from '@/types/api'
import { QuizCard } from './Quiz-card'
import { QuizResult } from './Quiz-result'
import './Quiz.scss'

export const Quiz: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasErrorParams, setHasErrorParams] = useState<boolean>(false)
  const [isWelcome, setIsWelcome] = useState<boolean>(true)
  const [quizzes, setQuizzes] = useState<QuizType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [rightAnswers, setRightAnswers] = useState<number>(0)

  const { answers, category, difficulty, question, correct_answers, multiple_correct_answers } =
    quizzes[currentQuestion] || {}
  const quizLength = quizzes.length

  const fetchQuizzes = async ({ difficulty, category, count }: ReqParams) => {
    setIsLoading(true)
    try {
      const response = await getQuestions(difficulty, count, category)
      setQuizzes(response)
      console.log('res', response) //! оставил для контрольной проверки
    } catch (err) {
      throw new Error('Произошла ошибка загрузки с сервера')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInitParams = async ({ difficulty, category, count }: ReqParams) => {
    try {
      await fetchQuizzes({ difficulty, category, count })
      setHasErrorParams(false)
      setIsWelcome(false)
    } catch {
      setHasErrorParams(true)
    }
  }

  const handleSwitchQuestion = (isRightAnswer: boolean) => {
    if (isRightAnswer) {
      setRightAnswers((prev) => prev + 1)
    }
    setCurrentQuestion((prev) => prev + 1)
  }

  const handleRetryTest = () => {
    setRightAnswers(0)
    setCurrentQuestion(0)
  }

  const hideNotification = useCallback(() => setHasErrorParams(false), [])

  if (isLoading) {
    return (
      <div className="quiz centered">
        <Spinner visible={true} size="m" />
      </div>
    )
  }

  return (
    <>
      {isWelcome ? (
        <Welcome onStart={handleInitParams} />
      ) : (
        <div className="quiz">
          {currentQuestion === quizLength ? (
            <QuizResult rightAnswers={rightAnswers} quizLength={quizLength} handleRetryTest={handleRetryTest} />
          ) : (
            <QuizCard
              answers={answers}
              category={category}
              difficulty={difficulty}
              question={question}
              currentQuestion={currentQuestion + 1}
              quizLength={quizLength}
              multipleAnswers={multiple_correct_answers}
              correct={correct_answers}
              handleSwitchQuestion={handleSwitchQuestion}
            />
          )}
        </div>
      )}
      <Notification
        badge="negative"
        title="По выбранным параметрам не удалось получить список вопросов"
        visible={hasErrorParams}
        onClickOutside={hideNotification}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
      >
        Попробуйте выбрать другие параметры
      </Notification>
    </>
  )
}
