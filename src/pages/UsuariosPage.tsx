import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { usuarioService } from '../services/usuarioService'
import type { UsuarioResponse } from '../types/usuario'
import type { Rol } from '../types/auth'
import '../styles/clientes.css'

const vacio = {
  nombre: '', apellido: '', email: '', telefono: '', password: '',
  rol: 'CLIENTE' as Rol,
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([])
  const [form, setForm] = useState(vacio)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    usuarioService.listar().then(setUsuarios).catch((e: Error) => setError(e.message))
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setExito('')
    setGuardando(true)
    try {
      const nuevo = await usuarioService.crear({
        ...form,
        telefono: form.telefono || undefined,
      })
      setUsuarios((prev) => [nuevo, ...prev])
      setForm(vacio)
      setExito('Usuario creado correctamente')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <main className="clientes-page">
      <div className="clientes-container">
        <header className="clientes-header">
          <h1>Usuarios</h1>
          <Link className="clientes-link" to="/perfil">← Mi perfil</Link>
        </header>

        <section className="clientes-card">
          <h2>Nuevo usuario</h2>
          <form className="clientes-form" onSubmit={onSubmit}>
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
            <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={onChange} required />
            <input name="email" type="email" placeholder="Correo" value={form.email} onChange={onChange} required />
            <input name="telefono" placeholder="Teléfono (opcional)" value={form.telefono} onChange={onChange} />
            <input name="password" type="password" placeholder="Contraseña (mínimo 8)" minLength={8}
                   value={form.password} onChange={onChange} required />
            <select name="rol" value={form.rol} onChange={onChange}>
              <option value="CLIENTE">Cliente</option>
              <option value="BARBERO">Barbero</option>
              <option value="ADMIN">Administrador</option>
            </select>

            {error && <div className="clientes-error full" role="alert">{error}</div>}
            {exito && <div className="clientes-exito full">{exito}</div>}

            <button className="clientes-btn full" type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Crear usuario'}
            </button>
          </form>
        </section>

        <section className="clientes-card">
          <h2>Lista ({usuarios.length})</h2>
          <div className="clientes-tabla-wrap">
            <table className="clientes-tabla">
              <thead>
                <tr><th>Correo</th><th>Rol</th></tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}><td>{u.email}</td><td>{u.rol}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}