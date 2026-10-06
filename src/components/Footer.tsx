export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} BarberOsw. Todos los derechos reservados.</span>
        <span className="footer-tag">Tu barbería, con cita previa</span>
      </div>
    </footer>
  )
}