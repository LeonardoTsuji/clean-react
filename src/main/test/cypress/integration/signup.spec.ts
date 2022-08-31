
import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/signup-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').type(faker.name.fullName())
  cy.getByTestId('email').type(faker.internet.email())
  const password = faker.datatype.string(5)
  cy.getByTestId('password').type(password)
  cy.getByTestId('passwordConfirmation').type(password)
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    FormHelper.testInputStatus('name', 'Campo obrigatório')
    FormHelper.testInputStatus('email', 'Campo obrigatório')
    FormHelper.testInputStatus('password', 'Campo obrigatório')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.datatype.string(3))
    FormHelper.testInputStatus('name', 'Campo inválido')
    cy.getByTestId('email').type(faker.random.word())
    FormHelper.testInputStatus('email', 'Campo inválido')
    cy.getByTestId('password').type(faker.datatype.string(3))
    FormHelper.testInputStatus('password', 'Campo inválido')
    cy.getByTestId('passwordConfirmation').type(faker.datatype.string(2))
    FormHelper.testInputStatus('passwordConfirmation', 'Campo inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.fullName())
    FormHelper.testInputStatus('name')
    cy.getByTestId('email').type(faker.internet.email())
    FormHelper.testInputStatus('email')
    const password = faker.datatype.string(5)
    cy.getByTestId('password').type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('passwordConfirmation').type(password)
    FormHelper.testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()
    simulateValidSubmit()
    FormHelper.testMainError('Esse e-mail já está em uso')
    FormHelper.testUrl('/signup')
  })
})
