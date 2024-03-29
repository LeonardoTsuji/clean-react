import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Icon } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases'
import styles from './item-styles.scss'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? 'thumbUp' : 'thumbDown'
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} className={styles.iconWrap}/>
        <Calendar date={survey.date} className={styles.calendarWrap}/>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer><Link data-testid='link' to={`/surveys/${survey.id}`}>Ver resultado</Link></footer>
    </li>
  )
}

export default SurveyItem
