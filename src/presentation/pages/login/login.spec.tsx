import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, Matcher, MatcherOptions, render, RenderResult, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock, Helper } from '@/presentation/test'
import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({
  initialEntries: ['/login']
})
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(getByTestId, 'email', email)
  Helper.populateField(getByTestId, 'password', password)

  const form = getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

const testElementExists = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string): void => {
  const el = getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testElementText = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, text: string): void => {
  const el = getByTestId(fieldName)
  expect(el).toBeTruthy()
  expect(el.textContent).toBe(text)
}

describe('Login Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const { getByTestId } = sut

    Helper.testChildCount(getByTestId, 'error-wrap', 0)
    Helper.testButtonIsDisabled(getByTestId, 'submit', true)

    Helper.testStatusForField(getByTestId, 'email', validationError)
    Helper.testStatusForField(getByTestId, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'password')
    Helper.testStatusForField(getByTestId, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'password')
    Helper.testStatusForField(getByTestId, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'email')

    Helper.testStatusForField(getByTestId, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'password')
    Helper.testStatusForField(getByTestId, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'email')
    Helper.populateField(getByTestId, 'password')

    Helper.testButtonIsDisabled(getByTestId, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)
    testElementExists(getByTestId, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { getByTestId } = sut

    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(getByTestId, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)

    await waitFor(async () => {
      testElementText(getByTestId, 'main-error', error.message)
    })
    Helper.testChildCount(getByTestId, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)

    getByTestId('form')
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut()

    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)
    await waitFor(() => {
      testElementText(getByTestId, 'main-error', error.message)
    })
    Helper.testChildCount(getByTestId, 'error-wrap', 1)
  })

  test('Should go to SignUp page', async () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    const register = getByTestId('signup')
    fireEvent.click(register)
    expect(history.index).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
