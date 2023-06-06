
export type HttpRequest = {
  url: string
  method: HttpMethod
  headers?: any
  body?: any
}

export interface HttpClient<ResponseType = any> {
  request (data: HttpRequest): Promise<HttpResponse<ResponseType>>
}

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  unauthorized = 401,
  forbidden = 403,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
