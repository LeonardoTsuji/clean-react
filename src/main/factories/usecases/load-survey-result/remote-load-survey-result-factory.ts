import { makeApiUrl } from '@/main/factories/http'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { LoadSurveyResult } from '@/domain/usecases'
import { RemoteLoadSurveyResult } from '@/data/usecases'

export const makeRemoteLoadSurveyResult = (id: number): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
