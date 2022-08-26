import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contexts'
import styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    email: '',
    password: ''

  })
  const [errorState, setErrorState] = useState({
    email: '',
    password: 'Campo obrigatório',
    main: ''
  })

  useEffect(() => {
    setErrorState({
      ...errorState,
      email: validation.validate('email', state.email),
      password: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.loading || errorState.email || errorState.password) return
      setState({
        ...state,
        loading: true
      })
      const account = await authentication.auth({ email: state.email, password: state.password })
      await saveAccessToken.save(account.accessToken)
      navigate('/', {
        replace: true
      })
    } catch (error) {
      setState({
        ...state,
        loading: false
      })
      setErrorState({ ...errorState, main: error.message })
    }
  }

  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState, setState, setErrorState }}>
        <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail'/>
          <Input type='password' name='password' placeholder='Digite sua senha'/>
          <button data-testid='submit' disabled={!!errorState.email || !!errorState.password} className={styles.submit} type='submit'>Entrar</button>
          <Link data-testid='signup' to='/signup' className={styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default Login
