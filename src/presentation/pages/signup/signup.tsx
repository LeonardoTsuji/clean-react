import React, { useEffect, useState } from 'react'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contexts'
import styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    loading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errorState, setErrorState] = useState({
    name: '',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    passwordConfirmation: 'Campo obrigatório',
    main: ''
  })

  useEffect(() => {
    setErrorState({
      ...errorState,
      name: validation.validate('name', state.name)
    })
  }, [state.name])

  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState, errorState, setErrorState }}>
        <form className={styles.form}>
          <h2>Criar Conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome'/>
          <Input type='email' name='email' placeholder='Digite seu e-mail'/>
          <Input type='password' name='password' placeholder='Digite sua senha'/>
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha'/>
          <button data-testid='submit' disabled className={styles.submit} type='submit'>Entrar</button>
          <span className={styles.link}>Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp