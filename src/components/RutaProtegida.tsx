import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function RutaProtegida() {
  const { sesion } = useAuth()
  return sesion ? <Outlet /> : <Navigate to="/login" replace />
}