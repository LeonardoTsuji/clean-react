import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default PrivateRoute
