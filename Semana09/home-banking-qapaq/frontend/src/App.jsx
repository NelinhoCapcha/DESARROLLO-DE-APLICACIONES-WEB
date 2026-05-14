import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ClientLayout from './layouts/ClientLayout.jsx'
import Dashboard from './pages/cliente/dashboard/Dashboard.jsx'
import Ahorros from './pages/cliente/ahorros/Ahorros.jsx'
import EstadoCuenta from './pages/cliente/ahorros/EstadoCuenta.jsx'
import Depositos from './pages/cliente/ahorros/Depositos.jsx'
import TransferenciasAhorros from './pages/cliente/ahorros/Transferencias.jsx'
import SimuladorCredito from './pages/cliente/creditos/SimuladorCredito.jsx'
import SolicitudCredito from './pages/cliente/creditos/SolicitudCredito.jsx'
import PrestamosActivos from './pages/cliente/creditos/PrestamosActivos.jsx'
import CronogramaPagos from './pages/cliente/creditos/CronogramaPagos.jsx'
import PagoServicios from './pages/cliente/pagos/PagoServicios.jsx'
import PerfilUsuario from './pages/cliente/perfil/PerfilUsuario.jsx'
import DashboardAdmin from './pages/admin/dashboard/DashboardAdmin.jsx'

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('qapaq_token')
  return token ? children : <Navigate to="/login" replace />
}

const ClientPage = ({ children }) => (
  <RequireAuth>
    <ClientLayout>{children}</ClientLayout>
  </RequireAuth>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
          path="/cliente/dashboard"
          element={
            <ClientPage>
              <Dashboard />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/ahorros"
          element={
            <ClientPage>
              <Ahorros />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/estado-cuenta"
          element={
            <ClientPage>
              <EstadoCuenta />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/depositos"
          element={
            <ClientPage>
              <Depositos />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/transferencias"
          element={
            <ClientPage>
              <TransferenciasAhorros />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/creditos/simular"
          element={
            <ClientPage>
              <SimuladorCredito />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/creditos/solicitud"
          element={
            <ClientPage>
              <SolicitudCredito />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/creditos/activos"
          element={
            <ClientPage>
              <PrestamosActivos />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/creditos/cronograma"
          element={
            <ClientPage>
              <CronogramaPagos />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/pagos/servicios"
          element={
            <ClientPage>
              <PagoServicios />
            </ClientPage>
          }
        />
        <Route
          path="/cliente/perfil"
          element={
            <ClientPage>
              <PerfilUsuario />
            </ClientPage>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <RequireAuth>
              <DashboardAdmin />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
