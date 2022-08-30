import { faker } from '@faker-js/faker'
import { fireEvent, Matcher, MatcherOptions } from '@testing-library/react'

export const testChildCount = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, count: number): void => {
  const el = getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, isDisabled: boolean): void => {
  const button = getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, validationError: string = ''): void => {
  const wrap = getByTestId(`${fieldName}-wrap`)
  const field = getByTestId(fieldName)
  const label = getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const populateField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, value = faker.datatype.string()): void => {
  const input = getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string): void => {
  const el = getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, text: string): void => {
  const el = getByTestId(fieldName)
  expect(el).toBeTruthy()
  expect(el.textContent).toBe(text)
}
