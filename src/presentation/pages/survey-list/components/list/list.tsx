
import React, { useContext } from 'react'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext, SurveyItem, SurveyItemEmpty } from '..'
import styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={styles.listWrap} data-testid='survey-list'>
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey}/>)
        : <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List
