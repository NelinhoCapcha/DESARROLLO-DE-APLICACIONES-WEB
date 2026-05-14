import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import { authService } from '../../services/authService.js'

const CLIENT_ROLE_ID = '05645341-0a78-4119-952a-e5d9c175c1eb'

const documentTypes = [
  { value: 'dni', label: 'DNI', maxLength: 8 },
  { value: 'ce', label: 'Carnet de extranjería', maxLength: 12 },
  { value: 'ruc', label: 'RUC', maxLength: 11 },
]

const initialRegisterData = {
  nombres: '',
  apellidos: '',
  documentType: 'dni',
  documentNumber: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

const FieldRow = ({ label, hint, children }) => (
  <>
    <label className="pt-2 text-left text-sm font-bold leading-5 text-slate-950 sm:text-right">
      {label}
      {hint && <span className="block font-bold">{hint}</span>}
    </label>
    <div>{children}</div>
  </>
)

const inputClass =
  'h-9 w-full rounded border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-inner outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialRegisterData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [showTerms, setShowTerms] = useState(false)

  const selectedDocument = useMemo(
    () =>
      documentTypes.find((document) => document.value === formData.documentType) ??
      documentTypes[0],
    [formData.documentType],
  )

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value

    setFormData((currentData) => {
      if (target.name === 'documentType') {
        return {
          ...currentData,
          documentType: value,
          documentNumber: '',
        }
      }

      if (target.name === 'documentNumber') {
        return {
          ...currentData,
          documentNumber: value.replace(/\D/g, '').slice(0, selectedDocument.maxLength),
        }
      }

      if (target.name === 'phone') {
        return {
          ...currentData,
          phone: value.replace(/\D/g, '').slice(0, 9),
        }
      }

      return {
        ...currentData,
        [target.name]: value,
      }
    })
  }

  const validateForm = () => {
    if (!formData.nombres.trim() || !formData.apellidos.trim()) {
      return 'Ingresa nombres y apellidos.'
    }

    if (formData.documentNumber.length !== selectedDocument.maxLength) {
      return `El ${selectedDocument.label} debe tener ${selectedDocument.maxLength} dígitos.`
    }

    if (!formData.email.trim()) {
      return 'Ingresa un correo electrónico.'
    }

    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.'
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Las contraseñas no coinciden.'
    }

    if (!formData.acceptedTerms) {
      return 'Debes aceptar los términos y condiciones.'
    }

    return ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const validationMessage = validateForm()
    if (validationMessage) {
      setErrorMessage(validationMessage)
      return
    }

    setIsSubmitting(true)
    try {
      await authService.register({
        ...formData,
        rolId: CLIENT_ROLE_ID,
      })
      setSuccessMessage('Registro creado correctamente. Ya puedes iniciar sesión.')
      window.setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setErrorMessage(error.message || 'No se pudo completar el registro.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <section className="mx-auto min-h-[calc(100vh-6rem)] max-w-3xl px-5 py-8 sm:px-8">
        <div className="border-b border-slate-200 pb-1">
          <h1 className="text-xl font-normal text-[#e30613]">
            QAPAQ en Línea - Creación de credenciales
          </h1>
        </div>

        <h2 className="mt-2 text-lg font-normal text-[#e30613]">
          Ingresa tus datos
        </h2>

        <form onSubmit={handleSubmit} className="mt-3 max-w-[560px]">
          <div className="grid grid-cols-1 items-start gap-x-8 gap-y-4 sm:grid-cols-[170px_minmax(0,280px)]">
            <FieldRow label="Nombres">
              <input
                name="nombres"
                type="text"
                value={formData.nombres}
                onChange={handleChange}
                className={inputClass}
              />
            </FieldRow>

            <FieldRow label="Apellidos">
              <input
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                className={inputClass}
              />
            </FieldRow>

            <FieldRow label="Tipo de documento">
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className={inputClass}
              >
                {documentTypes.map((documentType) => (
                  <option key={documentType.value} value={documentType.value}>
                    {documentType.label}
                  </option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Número">
              <input
                name="documentNumber"
                type="text"
                inputMode="numeric"
                value={formData.documentNumber}
                onChange={handleChange}
                className={inputClass}
                autoFocus
              />
              <p className="mt-1 text-sm text-slate-950">
                {formData.documentNumber.length}/{selectedDocument.maxLength}
              </p>
            </FieldRow>

            <FieldRow label="Número celular">
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </FieldRow>

            <FieldRow label="Correo electrónico">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </FieldRow>

            <FieldRow label="Contraseña">
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
              />
            </FieldRow>

            <FieldRow label="Confirmar contraseña">
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={inputClass}
              />
            </FieldRow>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1 text-sm font-bold text-slate-950">
            <input
              id="acceptedTerms"
              name="acceptedTerms"
              type="checkbox"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              className="mr-1 h-3.5 w-3.5 rounded border-slate-400"
            />
            <label htmlFor="acceptedTerms">Acepto términos y condiciones</label>
            <span>(</span>
            <button
              type="button"
              onClick={() => setShowTerms((currentValue) => !currentValue)}
              className="rounded bg-[#337ab7] px-4 py-2 font-normal text-white transition hover:bg-[#286090]"
            >
              ver condiciones
            </button>
            <span>)</span>
          </div>

          {showTerms && (
            <div className="mx-auto mt-3 max-w-[430px] rounded border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-700">
              Autorizo el uso de mis datos para crear mis credenciales de Home
              Banking y acepto las condiciones de seguridad de QAPAQ.
            </div>
          )}

          {errorMessage && (
            <p className="mx-auto mt-4 max-w-[430px] rounded border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-[#9b111e]">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="mx-auto mt-4 max-w-[430px] rounded border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {successMessage}
            </p>
          )}

          <div className="mt-4 flex justify-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-[#337ab7] px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-[#286090] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Afiliando...' : 'Afiliar'}
            </button>
            <Link
              to="/login"
              className="rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Volver
            </Link>
          </div>
        </form>
      </section>
    </AuthLayout>
  )
}

export default Register
