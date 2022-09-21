import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should localStorage.setItem with correct values', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { value: faker.random.word() }
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should localStorage.getItem with correct value', () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = { value: faker.random.word() }
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
