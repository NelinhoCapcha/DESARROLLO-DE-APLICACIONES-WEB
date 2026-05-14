import { useState } from 'react'

export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = ({ target }) => {
    setValues((currentValues) => ({
      ...currentValues,
      [target.name]: target.value,
    }))
  }

  const reset = () => setValues(initialValues)

  return { values, setValues, handleChange, reset }
}
