import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockHttpRequest } from '@/data/test'
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
    const { url, body, method, headers } = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.request({
      url,
      body,
      method,
      headers
    })
    expect(mockedAxios.request).toHaveBeenCalledWith({ url, data: body, method, headers })
  })

  test('Should return correct response on axios', async () => {
    const { url, body, method } = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request({
      url,
      body,
      method
    })
    const axiosResponse = await mockedAxios.request.mock.results[0].value
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('Should return correct error on axios', () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const httpResponse = sut.request(mockHttpRequest())
    expect(httpResponse).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
