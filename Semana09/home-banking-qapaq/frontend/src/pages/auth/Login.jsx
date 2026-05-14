import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiCreditCard,
  FiFileText,
  FiLock,
  FiShield,
  FiUser,
} from 'react-icons/fi'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import bankingBanner from '../../assets/images/Portada_Login.png'
import { authService } from '../../services/authService.js'

const documentTypes = [
  { value: 'dni', label: 'DNI' },
  { value: 'ce', label: 'Carnet de extranjeria' },
  { value: 'ruc', label: 'RUC' },
]

const initialLoginData = {
  documentType: 'dni',
  documentNumber: '',
  password: '',
  rememberSession: true,
}

const InputGroup = ({ icon: Icon, label, children }) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <div className="group flex items-center rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition duration-200 focus-within:border-[#d71920] focus-within:ring-4 focus-within:ring-[#d71920]/10">
        <Icon className="mr-3 shrink-0 text-lg text-slate-400 transition duration-200 group-focus-within:text-[#d71920]" />
        {children}
      </div>
    </label>
  )
}

const TrustItem = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white/70 p-3 ring-1 ring-white/70 backdrop-blur">
      <div className="mt-0.5 rounded-lg bg-[#d71920] p-2 text-white shadow-sm">
        <Icon />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <p className="text-xs leading-5 text-slate-700">{description}</p>
      </div>
    </div>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialLoginData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value

    setFormData((currentData) => ({
      ...currentData,
      [target.name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const response = await authService.login(formData)
      localStorage.setItem('qapaq_user', JSON.stringify(response.user))
      localStorage.setItem('qapaq_token', response.access_token)
      localStorage.setItem('qapaq_supabase_token', response.supabase_access_token)
      setSuccessMessage(response.message)
      const roleName = response.user?.rol?.nombre?.toLowerCase()
      navigate(roleName === 'admin' ? '/admin/dashboard' : '/cliente/dashboard')
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-7 animate-[fadeIn_0.45s_ease-out]">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#fff8a3] px-4 py-2 text-sm font-bold text-[#9b111e] ring-1 ring-[#ffea00]/70">
              <FiShield />
              Acceso seguro Home Banking
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Ingresa a tu banca electrónica
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Consulta tus productos, realiza operaciones y gestiona tus pagos
              desde un entorno confiable.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.13)] ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.17)] sm:p-8"
          >
            <div className="mb-7 flex items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-sm font-semibold text-[#d71920]">
                  QAPAQ en línea
                </p>
                <h2 className="text-2xl font-black text-slate-950">
                  Iniciar sesión
                </h2>
              </div>
              <div className="rounded-xl bg-[#ffea00]/25 p-3 text-[#d71920]">
                <FiLock className="text-2xl" />
              </div>
            </div>

            <div className="space-y-5">
              <InputGroup icon={FiFileText} label="Tipo de documento">
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="h-13 w-full bg-transparent py-3 text-slate-800 outline-none"
                >
                  {documentTypes.map((documentType) => (
                    <option key={documentType.value} value={documentType.value}>
                      {documentType.label}
                    </option>
                  ))}
                </select>
              </InputGroup>

              <InputGroup icon={FiUser} label="Numero de documento">
                <input
                  name="documentNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="username"
                  placeholder="Ingresa tu número"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  className="h-13 w-full bg-transparent py-3 text-slate-800 outline-none placeholder:text-slate-400"
                />
              </InputGroup>

              <InputGroup icon={FiLock} label="Contraseña">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Ingresa tu contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-13 w-full bg-transparent py-3 text-slate-800 outline-none placeholder:text-slate-400"
                />
              </InputGroup>
            </div>

            <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3 font-medium text-slate-700">
                <input
                  name="rememberSession"
                  type="checkbox"
                  checked={formData.rememberSession}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 accent-[#d71920]"
                />
                Recordar sesión
              </label>

              <Link
                to="/recuperar-contrasena"
                className="font-bold text-[#d71920] transition hover:text-[#9b111e] hover:underline"
              >
                Olvidaste tu contraseña?
              </Link>
            </div>

            {errorMessage && (
              <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-[#9b111e] ring-1 ring-red-100">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="mt-5 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-100">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#d71920] px-5 py-4 text-base font-black text-white shadow-[0_14px_30px_rgba(215,25,32,0.32)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#b9141b] hover:shadow-[0_18px_36px_rgba(215,25,32,0.42)] focus:outline-none focus:ring-4 focus:ring-[#d71920]/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiLock />
              {isSubmitting ? 'Validando...' : 'Ingresar'}
              <FiArrowRight />
            </button>

            <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 text-sm text-slate-600 sm:grid-cols-2">
              <Link
                to="/registro"
                className="rounded-xl bg-slate-50 px-4 py-3 font-semibold transition hover:bg-[#fff8a3]"
              >
                Registrarme
              </Link>
              <Link
                to="/ayuda"
                className="rounded-xl bg-slate-50 px-4 py-3 font-semibold transition hover:bg-[#fff8a3]"
              >
                Necesito ayuda
              </Link>
            </div>
          </form>
        </div>

        <aside className="hidden min-h-[610px] overflow-hidden rounded-3xl bg-[#ffea00] shadow-[0_24px_80px_rgba(124,45,18,0.22)] ring-1 ring-[#dcc900] lg:block">
          <div className="relative flex h-full flex-col justify-between p-10">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/30" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#d71920]/10" />

            <div className="relative z-10 max-w-xl">
              <p className="mb-4 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#9b111e]">
                Home Banking
              </p>
              <h2 className="text-5xl font-black leading-tight text-slate-950">
                Bienvenido a la banca electronica
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-800">
                Opera de manera simple y segura con tus cuentas, creditos y
                pagos desde un solo lugar.
              </p>
            </div>

            <div className="relative z-10 my-8">
              <img
                src={bankingBanner}
                alt="Ilustracion bancaria de operaciones digitales"
                className="mx-auto w-full max-w-xl drop-shadow-2xl"
              />
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3">
              <TrustItem
                icon={FiCreditCard}
                title="Tu credito al toque"
                description="Soluciones pensadas para avanzar con confianza."
              />
              <TrustItem
                icon={FiBriefcase}
                title="Pagos y cuentas"
                description="Gestion diaria clara, ordenada y disponible."
              />
              <TrustItem
                icon={FiCheckCircle}
                title="Operacion segura"
                description="Acceso protegido para cuidar tu informacion."
              />
            </div>
          </div>
        </aside>
      </section>
    </AuthLayout>
  )
}

export default Login
