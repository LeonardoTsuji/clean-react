import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { makeLogin as MakeLogin, makeSignUp as MakeSignUp, makeSurveyList as MakeSurveyList, makeSurveyResult as MakeSurveyResult } from '@/main/factories/pages'
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
          <Route path='/' element={<PrivateRoute><MakeSurveyList /></PrivateRoute>}/>
          <Route path='/surveys/:id' element={<PrivateRoute><MakeSurveyResult /></PrivateRoute>}/>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
