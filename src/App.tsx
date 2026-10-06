import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './components/RutaProtegida'
import LoginPage from './pages/LoginPage'
import PerfilPage from './pages/PerfilPage'
import ClientesPage from './pages/ClientesPage'
import RegistroPage from './pages/RegistroPage'
import UsuariosPage from './pages/UsuariosPage'
import MainLayout from './layouts/MainLayout'
import CitasPage from './pages/CitasPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
                <Route element={<RutaProtegida />}>
                  <Route element={<MainLayout />}>
                    <Route path="/perfil" element={<PerfilPage />} />
                    <Route path="/citas" element={<CitasPage />} />

                    <Route element={<RutaProtegida roles={['ADMIN', 'BARBERO']} />}>
                      <Route path="/clientes" element={<ClientesPage />} />
                    </Route>

                  <Route element={<RutaProtegida roles={['ADMIN']} />}>
                      <Route path="/usuarios" element={<UsuariosPage />} />
                  </Route>
                </Route>
              </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}