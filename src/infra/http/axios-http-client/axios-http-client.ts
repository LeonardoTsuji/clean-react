import axios, { AxiosResponse } from 'axios'
import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient {
  async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(url, body)
    } catch (error) {
      httpResponse = error.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
