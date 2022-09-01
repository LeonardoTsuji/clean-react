import axios, { AxiosResponse } from 'axios'
import { HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient {
  async post ({ url, body }: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.post(url, body)
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get ({ url }: HttpGetParams): Promise<void> {
    await axios.get(url)
  }
}
