import api from './api'

export const authService = {
  async login({ documentType, documentNumber, password }) {
    try {
      return await api.post('/api/auth/login', {
        document_type: documentType,
        document_number: documentNumber.trim(),
        password,
      })
    } catch {
      throw new Error('Verificar DNI o contraseña')
    }
  },

  register({
    nombres,
    apellidos,
    documentType,
    documentNumber,
    phone,
    email,
    password,
  }) {
    return api.post('/api/usuarios', {
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      correo: email.trim().toLowerCase(),
      telefono: phone.trim() || null,
      document_type: documentType,
      document_number: documentNumber.trim(),
      password,
      estado: 'activo',
    })
  },
}
