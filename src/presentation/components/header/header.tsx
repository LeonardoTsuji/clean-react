import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'
import { Logo } from '@/presentation/components'
import styles from './header-styles.scss'

const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    navigate('/login', {
      replace: true
    })
  }

  return (
    <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrap}>
            <span>Leonardo</span>
            <a data-testid='logout' href="#" onClick={logout}>Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
