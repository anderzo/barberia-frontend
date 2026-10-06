import { api } from './api'
import type { Cita, CitaRequest } from '../types/cita'

export const citaService = {
  listar: () => api<Cita[]>('/api/citas'),
  crear: (data: CitaRequest) =>
    api<Cita>('/api/citas', { method: 'POST', body: JSON.stringify(data) }),
}