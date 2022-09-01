import { HttpResponse } from '.'

export type HttpPostParams = {
  url: string
  body?: any
}
export interface HttpPostClient<ResponseType = any> {
  post (params: HttpPostParams): Promise<HttpResponse<ResponseType>>
}
