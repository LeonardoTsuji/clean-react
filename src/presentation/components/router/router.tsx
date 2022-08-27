import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

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
      </Routes>
    </BrowserRouter>
  )
}

export default Router
