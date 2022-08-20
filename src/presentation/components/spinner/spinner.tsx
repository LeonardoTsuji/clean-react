import React from 'react'
import styles from './spinner-styles.scss'

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={[styles.spinner, props.className].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
