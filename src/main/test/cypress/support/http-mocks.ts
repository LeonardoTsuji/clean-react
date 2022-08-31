import { faker } from '@faker-js/faker'
import { Method } from 'axios'

export const mockInvalidCredentialsError = (path: RegExp): void => {
  cy.intercept('POST', path, {
    statusCode: 401,
    body: { error: faker.random.word() }
  }).as('request')
}

export const mockEmailInUseError = (path: RegExp): void => {
  cy.intercept('POST', path, {
    statusCode: 403,
    body: { error: faker.random.word() }
  }).as('request')
}

export const mockUnexpectedError = (path: RegExp, method: Method): void => {
  cy.intercept(method, path, {
    statusCode: faker.internet.httpStatusCode({ types: ['serverError'] }),
    body: { error: faker.random.word() }
  }).as('request')
}

export const mockOk = (path: RegExp, method: Method, body: any): void => {
  cy.intercept(method, path, {
    statusCode: 200,
    body
  }).as('request')
}
