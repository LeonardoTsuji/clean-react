import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import styles from './header-styles.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrap}>
            <span>Leonardo</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
  )
}

export default memo(Header)
