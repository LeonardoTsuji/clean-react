import React from 'react'
import { cleanup, fireEvent, Matcher, MatcherOptions, render, RenderResult, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy

}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()

  const sut = render(
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
      />
  )
  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, name = faker.name.firstName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(getByTestId, 'name', name)
  Helper.populateField(getByTestId, 'email', email)
  Helper.populateField(getByTestId, 'password', password)
  Helper.populateField(getByTestId, 'passwordConfirmation', password)

  const form = getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut({ validationError })
    const { getByTestId } = sut

    Helper.testChildCount(getByTestId, 'error-wrap', 0)
    Helper.testButtonIsDisabled(getByTestId, 'submit', true)

    Helper.testStatusForField(getByTestId, 'name', validationError)
    Helper.testStatusForField(getByTestId, 'email', validationError)
    Helper.testStatusForField(getByTestId, 'password', validationError)
    Helper.testStatusForField(getByTestId, 'passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'name')
    Helper.testStatusForField(getByTestId, 'name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'email')
    Helper.testStatusForField(getByTestId, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'password')
    Helper.testStatusForField(getByTestId, 'password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'passwordConfirmation')
    Helper.testStatusForField(getByTestId, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'name')
    Helper.testStatusForField(getByTestId, 'name')
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

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'passwordConfirmation')
    Helper.testStatusForField(getByTestId, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    Helper.populateField(getByTestId, 'name')
    Helper.populateField(getByTestId, 'email')
    Helper.populateField(getByTestId, 'password')
    Helper.populateField(getByTestId, 'passwordConfirmation')

    Helper.testButtonIsDisabled(getByTestId, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)
    Helper.testElementExists(getByTestId, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const { getByTestId } = sut

    const name = faker.name.firstName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(getByTestId, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    const { getByTestId } = sut

    await simulateValidSubmit(getByTestId)
    await simulateValidSubmit(getByTestId)

    expect(addAccountSpy.callsCount).toBe(1)
  })
})
