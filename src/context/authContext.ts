import { createContext } from 'react'
import type { LoginRequest, LoginResponse } from '../types/auth'

export interface AuthContextType {
  sesion: LoginResponse | null
  login: (data: LoginRequest) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)