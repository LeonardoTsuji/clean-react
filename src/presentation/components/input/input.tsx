import React from 'react'
import styles from './input-styles.scss'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.inputWrap}>
      <input type={props.type} name={props.name} placeholder={props.placeholder}/>
      <span className={styles.status}>🔴</span>
    </div>
  )
}

export default Input
