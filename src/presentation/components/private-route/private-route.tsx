import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ApiContext } from '@/presentation/contexts'

const PrivateRoute: React.FC = ({ children }: any) => {
  const { getCurrentAccount } = useContext(ApiContext)

  const token = getCurrentAccount()?.accessToken

  return token ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
