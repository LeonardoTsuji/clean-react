import axios from 'axios'
import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.company.name()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct url and method', async () => {
    const { url, body } = mockPostRequest()
    const sut = makeSut()
    await sut.post({
      url,
      body
    })
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })
})
