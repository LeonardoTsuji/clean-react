import React, { useEffect, useState } from 'react'
import { Footer, Header, Error } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyListItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const handleError = useErrorHandler((error: Error) => {
    setState(old => ({ ...old, error: error.message }))
  })

  const reload = (): void => {
    setState(old => ({
      surveys: [],
      error: '',
      reload: !old.reload
    }))
  }

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState(old => ({
        ...old, surveys
      })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
          {state.error ? <Error error={state.error} reload={reload}/> : <SurveyListItem surveys={state.surveys}/>}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
