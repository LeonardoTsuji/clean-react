import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-contexts'
import Spinner from '@/presentation/components/spinner/spinner'
import styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)
  const { loading } = state
  const { main } = errorState
  return (
    <div data-testid='error-wrap' className={styles.errorWrap}>
      {loading && <Spinner className={styles.spinner}/>}
      {main && <span data-testid='main-error' className={styles.error}>{main}</span>}
    </div>
  )
}

export default FormStatus
