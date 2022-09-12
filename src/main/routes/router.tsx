import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignUp as MakeSignUp } from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<MakeLogin />}/>
          <Route path='/signup' element={<MakeSignUp />}/>
          <Route path='/' element={<PrivateRoute><SurveyList /></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
