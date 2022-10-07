import React from 'react'
import { render, screen } from '@testing-library/react'
import { Calendar } from '@/presentation/components'

const makeSut = (date: Date): void => {
  render(<Calendar date={date}/>)
}

describe('Calendar Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2022-09-19T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('19')
    expect(screen.getByTestId('month')).toHaveTextContent('set')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2022-07-01T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('01')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2022')
  })
})
