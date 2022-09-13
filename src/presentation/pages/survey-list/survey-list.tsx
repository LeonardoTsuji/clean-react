import React from 'react'
import { Footer, Header } from '@/presentation/components'
import styles from './survey-list-styles.scss'
import { SurveyItemEmpty } from './components'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer />

    </div>
  )
}

export default SurveyList
