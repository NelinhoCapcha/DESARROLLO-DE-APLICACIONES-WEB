import { useMemo, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  FiBarChart2,
  FiBell,
  FiCreditCard,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSend,
  FiUser,
  FiX,
} from 'react-icons/fi'
import logoQapaq from '../assets/images/logo_qapaq_nav.png'

const navItems = [
  { to: '/cliente/dashboard', label: 'Inicio', icon: FiGrid },
  { to: '/cliente/ahorros', label: 'Ahorros', icon: FiCreditCard },
  { to: '/cliente/estado-cuenta', label: 'Estado de cuenta', icon: FiFileText },
  { to: '/cliente/transferencias', label: 'Transferencias', icon: FiSend },
  { to: '/cliente/creditos/simular', label: 'Créditos', icon: FiBarChart2 },
  { to: '/cliente/perfil', label: 'Perfil', icon: FiUser },
]

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('qapaq_user') ?? '{}')
  } catch {
    return {}
  }
}

const ClientLayout = ({ children }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useMemo(getStoredUser, [])
  const fullName = [user.nombres, user.apellidos].filter(Boolean).join(' ') || 'Cliente QAPAQ'
  const documentLabel = user.numero_documento ? `${user.tipo_documento ?? 'DNI'} ${user.numero_documento}` : 'Home Banking'

  const handleLogout = () => {
    localStorage.removeItem('qapaq_user')
    localStorage.removeItem('qapaq_token')
    localStorage.removeItem('qapaq_supabase_token')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-[#e4d200] bg-[#ffea00] shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate('/cliente/dashboard')}
            className="flex items-center"
            aria-label="Ir al inicio"
          >
            <img src={logoQapaq} alt="QAPAQ" className="h-14 w-auto object-contain" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex h-11 items-center gap-2 rounded px-3 text-sm font-bold transition ${
                    isActive
                      ? 'bg-[#d71920] text-white shadow-sm'
                      : 'text-slate-900 hover:bg-white/70 hover:text-[#b9141b]'
                  }`
                }
              >
                <Icon className="text-base" />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-800 ring-1 ring-white/80 transition hover:bg-white"
              aria-label="Notificaciones"
            >
              <FiBell />
            </button>
            <div className="max-w-48 text-right">
              <p className="truncate text-sm font-black text-slate-950">{fullName}</p>
              <p className="truncate text-xs font-semibold text-slate-700">{documentLabel}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 items-center gap-2 rounded bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-[#d71920]"
            >
              <FiLogOut />
              Salir
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
            className="flex h-11 w-11 items-center justify-center rounded bg-white/70 text-xl text-slate-900 ring-1 ring-white/80 lg:hidden"
            aria-label="Abrir navegación"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-[#e4d200] bg-[#ffea00] px-4 py-3 lg:hidden">
            <div className="mb-3 rounded bg-white/70 px-3 py-2">
              <p className="text-sm font-black">{fullName}</p>
              <p className="text-xs font-semibold text-slate-700">{documentLabel}</p>
            </div>
            <nav className="grid gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex h-11 items-center gap-3 rounded px-3 text-sm font-bold ${
                      isActive ? 'bg-[#d71920] text-white' : 'bg-white/60 text-slate-900'
                    }`
                  }
                >
                  <Icon />
                  {label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-11 items-center gap-3 rounded bg-slate-950 px-3 text-sm font-bold text-white"
              >
                <FiLogOut />
                Cerrar sesión
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
    </div>
  )
}

export default ClientLayout
