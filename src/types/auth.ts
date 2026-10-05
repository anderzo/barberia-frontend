export type Rol = 'ADMIN' | 'BARBERO' | 'CLIENTE'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  email: string
  rol: Rol
}