import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    email: '',
    password: ''

  })
  const [errorState, setErrorState] = useState({
    email: '',
    password: '',
    main: '',
    isFormInvalid: true
  })

  useEffect(() => {
    const formData = {
      email: state.email, password: state.password
    }
    const email = validation.validate('email', formData)
    const password = validation.validate('password', formData)
    setErrorState(old => ({
      ...old,
      email,
      password,
      isFormInvalid: !!email || !!password
    }))
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      setState(old => ({
        ...old,
        loading: true
      }))
      if (state.loading || errorState.isFormInvalid) return
      const account = await authentication.auth({ email: state.email, password: state.password })
      setCurrentAccount(account)
      navigate('/', {
        replace: true
      })
    } catch (error) {
      setErrorState(old => ({ ...old, main: error.message }))
    } finally {
      setState(old => ({
        ...old,
        loading: false
      }))
    }
  }

  return (
    <div className={styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, errorState, setState, setErrorState }}>
        <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <SubmitButton text='Entrar' />
          <Link data-testid='signup-link' to='/signup' className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
