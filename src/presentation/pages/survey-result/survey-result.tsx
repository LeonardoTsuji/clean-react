import React from 'react'
import FlipMove from 'react-flip-move'
import { Footer, Header, Spinner } from '@/presentation/components'
import styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
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
        <div className={styles.loadingWrap}>
          <div className={styles.loading}>
            <span >Aguarde...</span>
            <Spinner isNegative/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
