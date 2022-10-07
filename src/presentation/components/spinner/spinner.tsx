import React from 'react'
import styles from './spinner-styles.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? styles.negative : ''
  return (
    <div data-testid='spinner' {...props} className={[styles.spinner, negativeClass, props.className].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
