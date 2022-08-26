import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contexts'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    loading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errorState, setErrorState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    main: ''
  })

  useEffect(() => {
    setErrorState({
      ...errorState,
      name: validation.validate('name', state.name),
      email: validation.validate('email', state.email),
      password: validation.validate('password', state.password),
      passwordConfirmation: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.loading || errorState.name || errorState.email || errorState.password || errorState.passwordConfirmation) return
      setState({
        ...state,
        loading: true
      })
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
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
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState, errorState, setErrorState }}>
        <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome'/>
          <Input type='email' name='email' placeholder='Digite seu e-mail'/>
          <Input type='password' name='password' placeholder='Digite sua senha'/>
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha'/>
          <button data-testid='submit' disabled={!!errorState.name || !!errorState.email || !!errorState.password || !!errorState.passwordConfirmation} className={styles.submit} type='submit'>Entrar</button>
          <span className={styles.link}>Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
