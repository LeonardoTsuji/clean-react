import { faker } from '@faker-js/faker'
import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.company.name()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url()
})

export class HttpPostClientSpy<ResponseType> implements HttpPostClient<ResponseType> {
  url?: string
  body?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostParams): Promise<HttpResponse<ResponseType>> {
    this.url = url
    this.body = body
    return this.response
  }
}

export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
  url: string
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    return this.response
  }
}
