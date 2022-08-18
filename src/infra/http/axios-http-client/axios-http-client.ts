import axios from 'axios'
import { HttpPostParams } from '@/data/protocols/http'

export class AxiosHttpClient {
  async post ({ url, body }: HttpPostParams<any>): Promise<void> {
    await axios(url)
  }
}
