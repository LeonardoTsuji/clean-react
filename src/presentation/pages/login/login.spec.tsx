import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'
import { cleanup, fireEvent, Matcher, MatcherOptions, render, RenderResult, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'
import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
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
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login validation={validationStub} authentication={authenticationSpy}/>
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}

const populateEmailField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, email = faker.internet.email()): void => {
  const emailInput = getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, password = faker.internet.password()): void => {
  const passwordInput = getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(getByTestId, email)
  populatePasswordField(getByTestId, password)

  const submitButton = getByTestId('submit')
  fireEvent.click(submitButton)
}

const simulateStatusForField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, validationError?: string): void => {
  const emailStatus = getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const { getByTestId } = sut

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateStatusForField(getByTestId, 'email', validationError)
    simulateStatusForField(getByTestId, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    populateEmailField(getByTestId)
    simulateStatusForField(getByTestId, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    populatePasswordField(getByTestId)
    simulateStatusForField(getByTestId, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    populateEmailField(getByTestId)
    simulateStatusForField(getByTestId, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    populatePasswordField(getByTestId)
    simulateStatusForField(getByTestId, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    populateEmailField(getByTestId)
    populatePasswordField(getByTestId)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    simulateValidSubmit(getByTestId)

    const spinner = getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const { getByTestId } = sut

    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(getByTestId, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    const { getByTestId } = sut

    simulateValidSubmit(getByTestId)
    simulateValidSubmit(getByTestId)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    const { getByTestId } = sut

    populateEmailField(getByTestId)
    fireEvent.submit(getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    const { getByTestId } = sut

    simulateValidSubmit(getByTestId)

    await waitFor(async () => {
      const mainError = await sut.getByTestId('main-error')
      expect(mainError.textContent).toBe(error.message)
    })

    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { getByTestId } = sut

    simulateValidSubmit(getByTestId)

    await waitFor(() => getByTestId('form'))

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)

    expect(history.index).toBe(0)
    expect(history.location.pathname).toBe('/')
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
