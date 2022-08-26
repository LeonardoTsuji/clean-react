import React from 'react'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Helper, ValidationStub } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const sut = render(
      <SignUp
        validation={validationStub}
      />
  )
  return {
    sut
  }
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
    Helper.testStatusForField(getByTestId, 'password', 'Campo obrigatório')
    Helper.testStatusForField(getByTestId, 'passwordConfirmation', 'Campo obrigatório')
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
})
