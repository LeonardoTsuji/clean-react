import { SurveyResultModel } from '@/domain/models'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Model) => Promise<SaveSurveyResult.Model>
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: string
  }

  export type Model = SurveyResultModel
}
