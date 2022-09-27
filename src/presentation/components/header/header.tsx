import React, { memo, useContext } from 'react'
import { ApiContext } from '@/presentation/contexts'
import { Logo } from '@/presentation/components'
import { useLogout } from '@/presentation/hooks'
import styles from './header-styles.scss'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const lougout = useLogout()

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    lougout()
  }

  return (
    <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrap}>
            <span data-testid='username'>{getCurrentAccount().name}</span>
            <a data-testid='logout' href="#" onClick={buttonClick}>Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
