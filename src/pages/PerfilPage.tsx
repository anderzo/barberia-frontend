import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../context/useAuth'

interface Perfil {
  email: string
  roles: string
}

export default function PerfilPage() {
  const { logout } = useAuth()
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api<Perfil>('/api/perfil')
      .then(setPerfil)
      .catch((e: Error) => setError(e.message))
  }, [])

  return (
    <div>
      <h2>Mi perfil</h2>
      {perfil && <p>{perfil.email} — {perfil.roles}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  )
}