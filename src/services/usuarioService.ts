import { api } from './api'
import type { UsuarioAdminRequest, UsuarioResponse } from '../types/usuario'

export const usuarioService = {
  listar: () => api<UsuarioResponse[]>('/api/usuarios'),
  crear: (data: UsuarioAdminRequest) =>
    api<UsuarioResponse>('/api/usuarios', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}