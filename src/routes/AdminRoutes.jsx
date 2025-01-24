import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import LoginAdmin from '../pages/admin/LoginAdmin'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<LoginAdmin />} />
    </Routes>
  )
}

export default AdminRoutes
