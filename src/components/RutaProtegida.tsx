import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import type { Rol } from '../types/auth'

export default function RutaProtegida({ roles }: { roles?: Rol[] }) {
  const { sesion } = useAuth()
  if (!sesion) return <Navigate to="/login" replace />
  if (roles && !roles.includes(sesion.rol)) return <Navigate to="/perfil" replace />
  return <Outlet />
}