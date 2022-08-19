import axios from 'axios'
import { mockAxios } from '@/infra/test'
import { mockPostRequest } from '@/data/test'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { url, body } = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post({
      url,
      body
    })
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })
  test('Should return the correct statusCode and body', () => {
    const { url, body } = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    const httpResponse = sut.post({
      url,
      body
    })
    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
