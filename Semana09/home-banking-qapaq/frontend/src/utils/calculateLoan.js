export const calculateLoan = ({ amount = 0, annualRate = 0, months = 1 }) => {
  const monthlyRate = annualRate / 12 / 100

  if (!monthlyRate) {
    return amount / months
  }

  return (amount * monthlyRate) / (1 - (1 + monthlyRate) ** -months)
}
