import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function Header() {
  const { sesion, logout } = useAuth()
  const esAdmin = sesion?.rol === 'ADMIN'
  const esStaff = esAdmin || sesion?.rol === 'BARBERO'

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/perfil" className="header-brand">
          <span className="header-logo">✂</span>
          BarberOsw
        </Link>

        <NavLink to="/perfil">Perfil</NavLink>
        <NavLink to="/citas">Citas</NavLink>

        <nav className="header-nav">
          <NavLink to="/perfil">Perfil</NavLink>
          {esStaff && <NavLink to="/clientes">Clientes</NavLink>}
          {esAdmin && <NavLink to="/usuarios">Usuarios</NavLink>}
        </nav>

        <div className="header-user">
          <span className="header-email">{sesion?.email}</span>
          <button className="header-logout" onClick={logout}>Salir</button>
        </div>
      </div>
    </header>
  )
}