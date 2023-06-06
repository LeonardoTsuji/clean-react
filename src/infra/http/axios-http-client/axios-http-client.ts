import axios, { AxiosResponse } from 'axios'
import { HttpRequest, HttpResponse, HttpClient } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpClient {
  async request ({ url, body, method, headers }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({ url, data: body, headers, method })
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
