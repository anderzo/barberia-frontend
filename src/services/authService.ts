import { api } from './api'
import type { LoginRequest, LoginResponse } from '../types/auth'

export const authService = {
  login: (data: LoginRequest) =>
    api<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}