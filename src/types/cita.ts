export type EstadoCita =
  | 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA' | 'NO_ASISTIO'

export interface Servicio {
  id: number
  nombre: string
  descripcion: string | null
  duracionMin: number
  precio: number
}

export interface Barbero {
  id: number
  nombre: string
  apellido: string
  servicioIds: number[]
}

export interface Cita {
  id: number
  cliente: string
  barbero: string
  servicio: string
  inicio: string
  fin: string
  estado: EstadoCita
  precio: number
  notas: string | null
}

export interface CitaRequest {
  clienteId?: number
  barberoId: number
  servicioId: number
  inicio: string
  notas?: string
}