export type Difficulty = 'Easy' | 'Medium' | 'Hard'

//! некоторые категории выдают ошибку - отставил так для контрольной проверки
export const enum Category {
  Linux = 'Linux',
  DevOps = 'DevOps',
  Program = 'Programming (PHP, JS, Pythong and etc.)',
  Cloud = 'Cloud',
  Docker = 'Docker',
  Kubernetes = 'Kubernetes',
}

//* параметры для фунций
//* api - запрос настроен дефолтными входными данными
export type ReqParams = {
  difficulty?: Difficulty
  category?: Category
  count?: string
}
