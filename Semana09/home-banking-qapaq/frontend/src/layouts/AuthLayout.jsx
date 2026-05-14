import { FiShield } from 'react-icons/fi'
import logoQapaq from '../assets/images/logo_qapaq_nav.png'

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f4f4f2] text-slate-900">
      <header className="sticky top-0 z-20 h-24 bg-[#ffea00] shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <img
            src={logoQapaq}
            alt="QAPAQ"
            className="h-16 w-auto object-contain"
          />
          
          <div className="hidden items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-white/60 sm:flex">
            <FiShield className="text-[#d71920]" />
            Conexion segura
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
