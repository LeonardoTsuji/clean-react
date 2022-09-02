import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { SurveyList } from '@/presentation/pages'

type Factory = {
  MakeLogin: React.FC
  MakeSignUp: React.FC
}

const Router: React.FC<Factory> = (Factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Factory.MakeLogin />}/>
        <Route path='/signup' element={<Factory.MakeSignUp />}/>
        <Route path='/' element={<SurveyList />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
