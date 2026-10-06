import { api } from './api'
import type { Barbero, Servicio } from '../types/cita'

export const catalogoService = {
  servicios: () => api<Servicio[]>('/api/servicios'),
  barberos: () => api<Barbero[]>('/api/barberos'),
}