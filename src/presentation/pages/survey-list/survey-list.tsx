import React from 'react'
import { Footer, Header, Icon } from '@/presentation/components'
import styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveyContent}>
              <Icon iconName='thumbUp' className={styles.iconWrap}/>
              <time>
                <span className={styles.day}>01</span>
                <span className={styles.month}>09</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Footer />

    </div>
  )
}

export default SurveyList
