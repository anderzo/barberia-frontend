import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAuth } from '../context/useAuth'
import { citaService } from '../services/citaService'
import { catalogoService } from '../services/catalogoService'
import { clienteService } from '../services/clienteService'
import type { Barbero, Cita, Servicio } from '../types/cita'
import type { Cliente } from '../types/cliente'
import '../styles/clientes.css'

const vacio = { clienteId: '', servicioId: '', barberoId: '', inicio: '', notas: '' }

const formatear = (iso: string) =>
  new Date(iso).toLocaleString('es-HN', { dateStyle: 'medium', timeStyle: 'short' })

export default function CitasPage() {
  const { sesion } = useAuth()
  const esStaff = sesion?.rol === 'ADMIN' || sesion?.rol === 'BARBERO'

  const [citas, setCitas] = useState<Cita[]>([])
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [barberos, setBarberos] = useState<Barbero[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [form, setForm] = useState(vacio)
  const [error, setError] = useState('')
  const [exito, setExito] = useState('')
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    Promise.all([
      citaService.listar(),
      catalogoService.servicios(),
      catalogoService.barberos(),
      esStaff ? clienteService.listar() : Promise.resolve([] as Cliente[]),
    ])
      .then(([c, s, b, cl]) => {
        setCitas(c)
        setServicios(s)
        setBarberos(b)
        setClientes(cl)
      })
      .catch((e: Error) => setError(e.message))
  }, [esStaff])

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f) => ({
      ...f,
      [name]: value,
      ...(name === 'servicioId' ? { barberoId: '' } : {}),
    }))
  }

  const barberosDisponibles = barberos.filter(
    (b) => !form.servicioId || b.servicioIds.includes(Number(form.servicioId)),
  )

  const minFecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setExito('')
    setGuardando(true)
    try {
      await citaService.crear({
        clienteId: esStaff ? Number(form.clienteId) : undefined,
        barberoId: Number(form.barberoId),
        servicioId: Number(form.servicioId),
        inicio: new Date(form.inicio).toISOString(),
        notas: form.notas || undefined,
      })
      setCitas(await citaService.listar())
      setForm(vacio)
      setExito('Cita creada correctamente')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="clientes-page">
      <div className="clientes-container">
        <header className="clientes-header">
          <h1>Citas</h1>
        </header>

        <div className="clientes-card">
          <h2>Nueva cita</h2>
          <form className="clientes-form" onSubmit={onSubmit}>
            {esStaff && (
              <select name="clienteId" value={form.clienteId} onChange={onChange} required>
                <option value="">Selecciona un cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} {c.apellido} — {c.email}
                  </option>
                ))}
              </select>
            )}

            <select name="servicioId" value={form.servicioId} onChange={onChange} required>
              <option value="">Selecciona un servicio</option>
              {servicios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nombre} · {s.duracionMin} min · L {s.precio}
                </option>
              ))}
            </select>

            <select name="barberoId" value={form.barberoId} onChange={onChange} required>
              <option value="">Selecciona un barbero</option>
              {barberosDisponibles.map((b) => (
                <option key={b.id} value={b.id}>{b.nombre} {b.apellido}</option>
              ))}
            </select>

            <input
              name="inicio"
              type="datetime-local"
              min={minFecha}
              value={form.inicio}
              onChange={onChange}
              required
            />

            <input
              className="full"
              name="notas"
              placeholder="Notas (opcional)"
              maxLength={255}
              value={form.notas}
              onChange={onChange}
            />

            {error && <div className="clientes-error full" role="alert">{error}</div>}
            {exito && <div className="clientes-exito full">{exito}</div>}

            <button className="clientes-btn full" type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Reservar cita'}
            </button>
          </form>
        </div>

        <div className="clientes-card">
          <h2>{sesion?.rol === 'CLIENTE' ? 'Mis citas' : 'Citas'} ({citas.length})</h2>
          <div className="clientes-tabla-wrap">
            <table className="clientes-tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Barbero</th>
                  <th>Servicio</th>
                  <th>Precio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((c) => (
                  <tr key={c.id}>
                    <td>{formatear(c.inicio)}</td>
                    <td>{c.cliente}</td>
                    <td>{c.barbero}</td>
                    <td>{c.servicio}</td>
                    <td>L {c.precio}</td>
                    <td><span className="cita-estado">{c.estado}</span></td>
                  </tr>
                ))}
                {citas.length === 0 && (
                  <tr><td colSpan={6} className="clientes-vacio">Sin citas todavía</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}