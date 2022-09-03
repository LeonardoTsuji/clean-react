import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contexts'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import styles from './signup-styles.scss'
import { ApiContext } from '@/presentation/contexts'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
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
    main: '',
    isFormInvalid: true
  })

  useEffect(() => {
    const formData = {
      name: state.name, email: state.email, password: state.password, passwordConfirmation: state.passwordConfirmation
    }
    const name = validation.validate('name', formData)
    const email = validation.validate('email', formData)
    const password = validation.validate('password', formData)
    const passwordConfirmation = validation.validate('passwordConfirmation', formData)

    setErrorState({
      ...errorState,
      name,
      email,
      password,
      passwordConfirmation,
      isFormInvalid: !!name || !!email || !!password || !!passwordConfirmation
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.loading || errorState.isFormInvalid) return
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
      setCurrentAccount(account)
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
    <div className={styles.signupWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState, errorState, setErrorState }}>
        <form data-testid='form' className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome'/>
          <Input type='email' name='email' placeholder='Digite seu e-mail'/>
          <Input type='password' name='password' placeholder='Digite sua senha'/>
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha'/>
          <SubmitButton text='Cadastrar' />
          <Link data-testid='login-link' to='/login' className={styles.link}>Voltar para Login</Link>

          <FormStatus />
        </form>
      </Context.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
