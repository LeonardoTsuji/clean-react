import axios, { AxiosResponse } from 'axios'
import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(url, body)
    } catch (error) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  async get ({ url }: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.get(url)
    } catch (error) {
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }

  private adapt (axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
