import axios from 'axios'
import { QuizType } from '@/types/api'
import { Difficulty } from '@/types/params'

const { VITE_API_URL: URL, VITE_API_VERSION: API, VITE_API_KEY: KEY } = import.meta.env

export const getQuestions = async (difficulty: Difficulty = 'Easy', count: string = '1', category?: string): Promise<QuizType[]> => {
  if (category) {
    return await(
      await axios.get(
        `${URL}/${API}/questions?apiKey=${KEY}&category=${category}&difficulty=${difficulty}&limit=${count}`
      )
    ).data
  }

  return await (
    await axios.get(`${URL}/${API}/questions?apiKey=${KEY}&difficulty=${difficulty}&limit=${count}`)
  ).data
}
