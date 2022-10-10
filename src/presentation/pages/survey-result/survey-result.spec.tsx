
import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { SurveyResult } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountModel } from '@/domain/test'

describe('SurveyResult Component', () => {
  test('Should present correct initial state', () => {
    const history = createMemoryHistory({
      initialEntries: ['/']
    })
    const setCurrentAccountMock = jest.fn()
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
        <Router location={history.location} navigator={history}>
          <SurveyResult />
        </Router>
    </ApiContext.Provider>
    )
    const surveyList = screen.getByTestId('survey-result')
    expect(surveyList.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
