import axios, { AxiosResponse } from 'axios'
import { HttpGetClient, HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
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

  async get ({ url }: HttpGetParams): Promise<HttpResponse> {
    const axiosResponse = await axios.get(url)
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
