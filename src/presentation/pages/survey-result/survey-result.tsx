import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { Calendar, Error, Footer, Header, Loading } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    loading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then()
      .catch()
  }, [])

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div data-testid='survey-result' className={styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
            <Calendar date={new Date()} className={styles.calendarWrap}/>
            <h2>Qual é seu framework web favorito?</h2>
            </hgroup>
            <FlipMove className={styles.answersList}>
              <li className={styles.active}>
                <img src="" alt="" />
                <span className={styles.answer}>ReactJS</span>
                <span className={styles.percent}>50%</span>
              </li>
              <li>
                <img src="" alt="" />
                <span className={styles.answer}>ReactJS</span>
                <span className={styles.percent}>50%</span>
              </li>
              <li>
                <img src="" alt="" />
                <span className={styles.answer}>ReactJS</span>
                <span className={styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}

        {state.loading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
