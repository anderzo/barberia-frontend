import type { Rol } from './auth'

export interface UsuarioResponse {
  id: number
  email: string
  rol: Rol
}

export interface RegistroRequest {
  nombre: string
  apellido: string
  email: string
  telefono?: string
  password: string
}

export interface UsuarioAdminRequest extends RegistroRequest {
  rol: Rol
}