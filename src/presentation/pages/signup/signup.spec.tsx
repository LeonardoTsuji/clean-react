import { Matcher, MatcherOptions, render, RenderResult } from '@testing-library/react'
import React from 'react'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
      <SignUp />
  )
  return {
    sut
  }
}

const testChildCount = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, count: number): void => {
  const el = getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, isDisabled: boolean): void => {
  const button = getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, validationError?: string): void => {
  const fieldNameStatus = getByTestId(`${fieldName}-status`)
  expect(fieldNameStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldNameStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    const { getByTestId } = sut

    testChildCount(getByTestId, 'error-wrap', 0)
    testButtonIsDisabled(getByTestId, 'submit', true)

    testStatusForField(getByTestId, 'name', validationError)
    testStatusForField(getByTestId, 'email', validationError)
    testStatusForField(getByTestId, 'password', validationError)
    testStatusForField(getByTestId, 'passwordConfirmation', validationError)
  })
})
