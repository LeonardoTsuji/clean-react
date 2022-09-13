import React from 'react'
import { Icon } from '@/presentation/components'
import styles from './survey-item-styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={styles.surveyItemWrap}>
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
  )
}

export default SurveyItem
