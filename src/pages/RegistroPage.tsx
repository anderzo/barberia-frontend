import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { authService } from '../services/authService'
import '../styles/login.css'

export default function RegistroPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', telefono: '', password: '',
  })
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      await authService.registro({ ...form, telefono: form.telefono || undefined })
      await login({ email: form.email, password: form.password })
      navigate('/perfil')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={onSubmit}>
        <div className="login-brand">
          <span className="login-icon">✂</span>
          <h1>Crear cuenta</h1>
          <p>Regístrate para reservar tu cita</p>
        </div>

        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" value={form.nombre} onChange={onChange} required />

        <label htmlFor="apellido">Apellido</label>
        <input id="apellido" name="apellido" value={form.apellido} onChange={onChange} required />

        <label htmlFor="email">Correo</label>
        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />

        <label htmlFor="telefono">Teléfono (opcional)</label>
        <input id="telefono" name="telefono" value={form.telefono} onChange={onChange} />

        <label htmlFor="password">Contraseña (mínimo 8)</label>
        <input id="password" name="password" type="password" minLength={8}
               value={form.password} onChange={onChange} required />

        {error && <div className="login-error" role="alert">{error}</div>}

        <button className="login-btn" type="submit" disabled={cargando}>
          {cargando ? 'Creando...' : 'Crear cuenta'}
        </button>

        <p className="login-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  )
}