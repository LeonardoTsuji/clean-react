export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Model>
}

type LoadSurveyAnswer = {
  image?: string
  answer: string
  count: number
  percent: number
}

export namespace LoadSurveyResult {
  export type Model = {
    question: string
    date: Date
    answers: LoadSurveyAnswer[]
  }
}
