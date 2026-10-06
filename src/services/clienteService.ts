import { api } from './api'
import type { Cliente, ClienteRequest } from '../types/cliente'

export const clienteService = {
  listar: () => api<Cliente[]>('/api/clientes'),
  crear: (data: ClienteRequest) =>
    api<Cliente>('/api/clientes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}