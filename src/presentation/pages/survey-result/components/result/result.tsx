import React from 'react'
import { useNavigate } from 'react-router-dom'
import FlipMove from 'react-flip-move'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'
import styles from './result-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={styles.calendarWrap} />
        <h2 data-testid='question'>{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid='answers' className={styles.answersList}>
        <>
          {surveyResult.answers.map((answer) => <SurveyResultAnswer answer={answer} key={answer.answer} />)}
        </>
      </FlipMove>
      <button className={styles.button} data-testid='back-button' onClick={() => navigate(-1)}>Voltar</button>
    </>
  )
}

export default Result
