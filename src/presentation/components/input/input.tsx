import React, { useContext } from 'react'
import styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-contexts'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

const Input: React.FC<Props> = (props: Props) => {
  const { errorState, state, setState } = useContext(Context)
  const error = errorState[props.name]

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        id={props.name}
        data-testid={props.name}
        type={props.type}
        name={props.name}
        placeholder=" "
        onChange={handleChange}
      />
      <label htmlFor={props.name}>{props.placeholder}</label>
      <span
        data-testid={`${props.name}-status`}
        title={error || 'Tudo certo'}
        className={styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}

export default Input
