import { Category, Difficulty } from '@/types/params'

type OptionsSelect<T> = {
  key: string
  content: T
}

export const optionsDifficulty: OptionsSelect<Difficulty>[] = [
  { key: '1', content: 'Easy' },
  { key: '2', content: 'Medium' },
  { key: '3', content: 'Hard' },
]

export const optionsCategory: OptionsSelect<Category>[] = [
  { key: '1', content: Category.Linux },
  { key: '2', content: Category.DevOps },
  { key: '3', content: Category.Program },
  { key: '4', content: Category.Cloud },
  { key: '5', content: Category.Docker },
  { key: '6', content: Category.Kubernetes },
]
