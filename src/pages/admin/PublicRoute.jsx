import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const location = useLocation();
  return (
    isAuthenticated ? <Navigate to={location.state?.from || "/dashboard"} replace /> : <Outlet />
  )
}

export default PublicRoute
