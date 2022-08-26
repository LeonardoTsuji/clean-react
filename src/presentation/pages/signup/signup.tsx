import React, { useState } from 'react'
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-contexts'
import styles from './signup-styles.scss'

const SignUp: React.FC = () => {
  const [state] = useState({
    loading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''

  })
  const [errorState] = useState({
    name: 'Campo obrigatório',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    passwordConfirmation: 'Campo obrigatório',
    main: ''
  })
  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
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
