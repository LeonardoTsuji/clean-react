import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login validation={}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
