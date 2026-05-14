import { FiArrowRight, FiClock } from 'react-icons/fi'

const ClientePlaceholder = ({ title, description, action = 'Próximamente' }) => {
  return (
    <section className="rounded bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#d71920]">
            Home Banking QAPAQ
          </p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded bg-[#ffea00] text-xl text-slate-950">
          <FiClock />
        </div>
      </div>

      <div className="mt-6 rounded border border-slate-200 bg-slate-50 px-4 py-4">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800">
          {action}
          <FiArrowRight className="text-[#d71920]" />
        </p>
      </div>
    </section>
  )
}

export default ClientePlaceholder
