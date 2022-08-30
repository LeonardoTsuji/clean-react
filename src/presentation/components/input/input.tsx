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
    <div
      data-testid={`${props.name}-wrap`}
      className={styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        id={props.name}
        title={error}
        data-testid={props.name}
        type={props.type}
        name={props.name}
        placeholder=" "
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        htmlFor={props.name}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
