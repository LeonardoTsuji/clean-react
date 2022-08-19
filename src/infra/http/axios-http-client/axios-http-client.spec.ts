import axios from 'axios'
import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResponse = {
  data: faker.company.name(),
  status: faker.random.numeric()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResponse)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.company.name()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { url, body } = mockPostRequest()
    const sut = makeSut()
    await sut.post({
      url,
      body
    })
    expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
  })
  test('Should return the correct statusCode and body', async () => {
    const { url, body } = mockPostRequest()
    const sut = makeSut()
    const httpResponse = await sut.post({
      url,
      body
    })
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })
})
