import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaPrivadaAdmin({ children }) {
  const { user, loadingUser } = useAuth()

  if (loadingUser) return null

  if (!user) return <Navigate to='/login' replace />
  if (user.email !== 'admin@admin') return <Navigate to='/' replace />

  return children
}

export default RutaPrivadaAdmin
