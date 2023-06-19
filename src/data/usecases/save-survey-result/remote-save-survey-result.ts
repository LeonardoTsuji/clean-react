import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient } from '@/data/protocols/http'
import { SaveSurveyResult } from '@/domain/usecases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>
  ) {}

  async save (body: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    await this.httpClient.request({ url: this.url, method: 'PUT', body })
    return null
  }
}
export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}