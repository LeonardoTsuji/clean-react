import React, { useEffect, useState } from 'react'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contexts'
import styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    loading: false,
    email: '',
    password: ''

  })
  const [errorState, setErrorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  useEffect(() => {
    validation.validate({ email: state.email }
    )
  }, [state.email])

  useEffect(() => {
    validation.validate({ password: state.password }
    )
  }, [state.password])

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState, setState, setErrorState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail'/>
          <Input type='password' name='password' placeholder='Digite sua senha'/>
          <button data-testid='submit' disabled className={styles.submit} type='submit'>Entrar</button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
