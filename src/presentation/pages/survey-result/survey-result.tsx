import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import styles from './survey-result-styles.scss'
import { useErrorHandler } from '@/presentation/hooks'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    loading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, surveyResult: null, error: error.message }))
  })

  const reload = (): void => {
    setState(old => ({
      surveyResult: null,
      error: '',
      reload: !old.reload,
      loading: false
    }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => setState(old => ({ ...old, surveyResult })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
            <Calendar date={state.surveyResult.date} className={styles.calendarWrap}/>
            <h2 data-testid='question'>{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid='answers' className={styles.answersList}>
              {state.surveyResult.answers.map((answer) => (
              <li data-testid='answer-wrap' key={answer.answer} className={answer.isCurrentAccountAnswer ? styles.active : ''}>
                {answer.image && <img data-testid='image' src={answer.image} alt={answer.answer} />}
                <span data-testid='answer' className={styles.answer}>{answer.answer}</span>
                <span data-testid='percent' className={styles.percent}>{answer.percent}%</span>
              </li>
              ))}
            </FlipMove>
            <button>Voltar</button>
          </>
        )}

        {state.loading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
