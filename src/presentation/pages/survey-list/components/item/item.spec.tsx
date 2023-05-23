import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'
import { IconName } from '@/presentation/components/icon/icon'
import { mockSurveyModel } from '@/domain/test'
import SurveyItem from './item'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: ['/']
  })

  render(
    <ApiContext.Provider value={{ }}>
      <Router location={history.location} navigator={history}>
      <SurveyItem survey={survey}/>
      </Router>
    </ApiContext.Provider>

  )
  return {
    history
  }
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2022-09-19T00:00:00')
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('19')
    expect(screen.getByTestId('month')).toHaveTextContent('set')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = false
    survey.date = new Date('2022-07-01T00:00:00')
    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('01')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = false
    survey.date = new Date('2022-07-01T00:00:00')
    const { history } = makeSut(survey)
    fireEvent.click(screen.getByTestId('link'))

    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
