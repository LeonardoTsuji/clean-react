
import React, { useContext } from 'react'
import { SurveyContext } from '..'
import styles from './error-styles.scss'

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <div className={styles.errorWrap}>
      <span data-testid='error'>{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
