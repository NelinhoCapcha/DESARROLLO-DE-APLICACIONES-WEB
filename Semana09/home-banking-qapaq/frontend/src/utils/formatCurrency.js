export const formatCurrency = (value, currency = 'PEN') => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency,
  }).format(value)
}
