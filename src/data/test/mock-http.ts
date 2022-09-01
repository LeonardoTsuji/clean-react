import { faker } from '@faker-js/faker'
import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.company.name()
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
