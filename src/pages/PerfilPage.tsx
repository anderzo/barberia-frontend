import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { useAuth } from '../context/useAuth'
import '../styles/perfil.css'

interface Perfil {
  email: string
  roles: string
}

export default function PerfilPage() {
  const { sesion } = useAuth()
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api<Perfil>('/api/perfil')
      .then(setPerfil)
      .catch((e: Error) => setError(e.message))
  }, [])

  const email = perfil?.email ?? sesion?.email ?? ''

  return (
    <section className="perfil-page">
      <div className="perfil-card">
        <div className="perfil-avatar">{email.charAt(0).toUpperCase()}</div>
        <h2>Mi perfil</h2>
        <p className="perfil-email">{email}</p>
        <span className="perfil-rol">{sesion?.rol}</span>

        <div className="perfil-estado">
          {error ? (
            <span className="perfil-estado-error">{error}</span>
          ) : perfil ? (
            <span className="perfil-estado-ok">● Sesión verificada</span>
          ) : (
            <span className="perfil-estado-carga">Verificando...</span>
          )}
        </div>
      </div>
    </section>
  )
}