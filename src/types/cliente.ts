export interface Cliente {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string | null
  activo: boolean
}

export interface ClienteRequest {
  nombre: string
  apellido: string
  email: string
  telefono?: string
}