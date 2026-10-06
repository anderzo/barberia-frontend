import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { clienteService } from '../services/clienteService'
import type { Cliente } from '../types/cliente'
import '../styles/clientes.css'

const vacio = { nombre: '', apellido: '', email: '', telefono: '' }

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [form, setForm] = useState(vacio)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    clienteService
      .listar()
      .then(setClientes)
      .catch((e: Error) => setError(e.message))
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setExito('')
    setGuardando(true)
    try {
      const nuevo = await clienteService.crear({
        ...form,
        telefono: form.telefono || undefined,
      })
      setClientes((prev) => [nuevo, ...prev])
      setForm(vacio)
      setExito('Cliente creado correctamente')
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
          <h1>Clientes</h1>
          <Link className="clientes-link" to="/perfil">← Mi perfil</Link>
        </header>

        <section className="clientes-card">
          <h2>Nuevo cliente</h2>
          <form className="clientes-form" onSubmit={onSubmit}>
            <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
            <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={onChange} required />
            <input name="email" type="email" placeholder="Correo" value={form.email} onChange={onChange} required />
            <input name="telefono" placeholder="Teléfono (opcional)" value={form.telefono} onChange={onChange} />

            {error && <div className="clientes-error full" role="alert">{error}</div>}
            {exito && <div className="clientes-exito full">{exito}</div>}

            <button className="clientes-btn full" type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Agregar cliente'}
            </button>
          </form>
        </section>

        <section className="clientes-card">
          <h2>Lista ({clientes.length})</h2>
          <div className="clientes-tabla-wrap">
            <table className="clientes-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td>{c.nombre} {c.apellido}</td>
                    <td>{c.email}</td>
                    <td>{c.telefono ?? '—'}</td>
                  </tr>
                ))}
                {clientes.length === 0 && (
                  <tr><td colSpan={3} className="clientes-vacio">Sin clientes todavía</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}