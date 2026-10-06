import { api } from './api'
import type { LoginRequest, LoginResponse } from '../types/auth'
import type { RegistroRequest, UsuarioResponse } from '../types/usuario'

export const authService = {
  login: (data: LoginRequest) =>
    api<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  registro: (data: RegistroRequest) =>
    api<UsuarioResponse>('/api/auth/registro', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}