import { Matcher, MatcherOptions } from '@testing-library/react'

export const testChildCount = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, count: number): void => {
  const el = getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, isDisabled: boolean): void => {
  const button = getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (getByTestId: (id: Matcher, options?: MatcherOptions) => HTMLElement, fieldName: string, validationError?: string): void => {
  const fieldNameStatus = getByTestId(`${fieldName}-status`)
  expect(fieldNameStatus.title).toBe(validationError || 'Tudo certo')
  expect(fieldNameStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}
