import axios from 'axios'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockGetRequest, mockPostRequest } from '@/data/test'
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
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const { url, body } = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post({
        url,
        body
      })
      expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
    })

    test('Should return correct response on axios.post', () => {
      const { url, body } = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      const httpResponse = sut.post({
        url,
        body
      })
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('Should return correct error on axios.post', () => {
      const { url, body } = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const httpResponse = sut.post({
        url,
        body
      })
      expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
  describe('get', () => {
    test('Should call axios.get with correct values', async () => {
      const { url } = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get({ url })
      expect(mockedAxios.get).toHaveBeenCalledWith(url)
    })
  })
})
