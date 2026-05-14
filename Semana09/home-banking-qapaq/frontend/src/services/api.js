const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

const getErrorMessage = (data, fallback) => {
  const detail = data?.detail ?? data?.message

  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item?.msg || item?.message)
      .filter(Boolean)
      .join('. ')
  }

  return fallback
}

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = getErrorMessage(data, 'No se pudo completar la solicitud')
    throw new Error(message)
  }

  return data
}

const api = {
  get: (path, options) => request(path, { method: 'GET', ...options }),
  post: (path, body, options) =>
    request(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),
  put: (path, body, options) =>
    request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    }),
  delete: (path, options) => request(path, { method: 'DELETE', ...options }),
}

export default api
