import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
  FiPieChart,
  FiPlusCircle,
  FiSend,
  FiShield,
  FiTrendingUp,
} from 'react-icons/fi'

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(Number(value ?? 0))

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('qapaq_user') ?? '{}')
  } catch {
    return {}
  }
}

const quickActions = [
  {
    to: '/cliente/transferencias',
    label: 'Transferir',
    icon: FiSend,
  },
  {
    to: '/cliente/creditos/simular',
    label: 'Simular crédito',
    icon: FiTrendingUp,
  },
  {
    to: '/cliente/depositos',
    label: 'Depositar',
    icon: FiPlusCircle,
  },
  {
    to: '/cliente/estado-cuenta',
    label: 'Ver estado',
    icon: FiFileText,
  },
]

const products = [
  {
    title: 'Cuenta de ahorros',
    detail: 'Saldo disponible para operaciones diarias.',
    icon: FiCreditCard,
    to: '/cliente/ahorros',
  },
  {
    title: 'Créditos QAPAQ',
    detail: 'Evalúa una solicitud y revisa tus cuotas.',
    icon: FiPieChart,
    to: '/cliente/creditos/simular',
  },
  {
    title: 'Pagos y servicios',
    detail: 'Organiza pagos pendientes desde tu banca.',
    icon: FiDollarSign,
    to: '/cliente/pagos/servicios',
  },
]

const Dashboard = () => {
  const user = getStoredUser()
  const firstName = user.nombres || 'Cliente'
  const balance = user.saldo ?? 0
  const status = user.estado || 'activo'

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#d71920]">
                Home Banking QAPAQ
              </p>
              <h1 className="mt-2 text-3xl font-black text-slate-950">
                Hola, {firstName}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Consulta tus cuentas, revisa movimientos y opera de manera segura
                desde tu banca en línea.
              </p>
            </div>
            <div className="rounded bg-[#fff8a3] px-4 py-3 ring-1 ring-[#ffea00]">
              <p className="text-xs font-black uppercase text-[#9b111e]">Estado</p>
              <p className="mt-1 text-lg font-black capitalize text-slate-950">{status}</p>
            </div>
          </div>
        </div>

        <div className="rounded bg-slate-950 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-[#ffea00]">Saldo disponible</p>
              <p className="mt-3 text-3xl font-black">{formatCurrency(balance)}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded bg-[#ffea00] text-2xl text-slate-950">
              <FiCreditCard />
            </div>
          </div>
          <Link
            to="/cliente/estado-cuenta"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ffea00] transition hover:text-white"
          >
            Ver movimientos
            <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex h-24 items-center gap-4 rounded bg-white px-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-[#d71920]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded bg-[#ffea00] text-xl text-slate-950">
              <Icon />
            </span>
            <span className="text-sm font-black text-slate-950">{label}</span>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-950">Tus productos</h2>
              <p className="mt-1 text-sm text-slate-600">Accesos principales para cliente.</p>
            </div>
            <FiShield className="text-2xl text-[#d71920]" />
          </div>

          <div className="mt-5 grid gap-3">
            {products.map(({ title, detail, icon: Icon, to }) => (
              <Link
                key={title}
                to={to}
                className="flex items-center justify-between gap-4 rounded border border-slate-200 px-4 py-4 transition hover:border-[#d71920] hover:bg-red-50/40"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded bg-slate-100 text-lg text-[#d71920]">
                    <Icon />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-slate-950">{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-600">{detail}</span>
                  </span>
                </div>
                <FiArrowRight className="text-slate-400" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black text-slate-950">Resumen rápido</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded border border-slate-200 px-4 py-3">
              <p className="text-xs font-bold uppercase text-slate-500">Documento</p>
              <p className="mt-1 text-sm font-black text-slate-950">
                {user.tipo_documento ?? 'DNI'} {user.numero_documento ?? '-'}
              </p>
            </div>
            <div className="rounded border border-slate-200 px-4 py-3">
              <p className="text-xs font-bold uppercase text-slate-500">Correo</p>
              <p className="mt-1 break-all text-sm font-black text-slate-950">
                {user.correo ?? '-'}
              </p>
            </div>
            <div className="rounded border border-[#ffea00] bg-[#fffde6] px-4 py-3">
              <p className="text-xs font-bold uppercase text-[#9b111e]">Seguridad</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                Mantén tus credenciales protegidas y cierra sesión al terminar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
