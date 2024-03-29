import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.headerWrap}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
