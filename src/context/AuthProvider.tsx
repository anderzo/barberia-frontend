import { useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'
import { authService } from '../services/authService'
import { sesionStorage } from '../services/api'
import type { LoginRequest, LoginResponse } from '../types/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sesion, setSesion] = useState<LoginResponse | null>(() => sesionStorage.get())

  const login = async (data: LoginRequest) => {
    const s = await authService.login(data)
    sesionStorage.set(s)
    setSesion(s)
  }

  const logout = () => {
    sesionStorage.clear()
    setSesion(null)
  }

  return (
    <AuthContext.Provider value={{ sesion, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}