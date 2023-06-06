import { faker } from '@faker-js/faker'
import { HttpClient, HttpRequest, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: faker.company.name(),
  headers: faker.company.name(),
  method: faker.helpers.arrayElement(['POST', 'GET', 'PUT', 'DELETE'])
})

export class HttpClientSpy<ResponseType = any> implements HttpClient<ResponseType> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async request ({ url, body, method, headers }: HttpRequest): Promise<HttpResponse<ResponseType>> {
    this.url = url
    this.method = method
    this.body = body
    this.headers = headers
    return this.response
  }
}
