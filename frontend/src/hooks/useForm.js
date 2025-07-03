"use client"

import { useState } from "react"

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))

    // Valider le champ si des règles sont définies
    if (validationRules[name]) {
      validateField(name, value)
    }
  }

  const setFieldTouched = (name, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }))
  }

  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return true

    let error = null

    // Validation required
    if (rules.required && (!value || value.toString().trim() === "")) {
      error = rules.message || `${name} est requis`
    }

    // Validation minLength
    if (!error && rules.minLength && value && value.length < rules.minLength) {
      error = rules.message || `${name} doit contenir au moins ${rules.minLength} caractères`
    }

    // Validation pattern
    if (!error && rules.pattern && value && !rules.pattern.test(value)) {
      error = rules.message || `${name} n'est pas valide`
    }

    // Validation custom
    if (!error && rules.validate && value) {
      const customError = rules.validate(value, values)
      if (customError) error = customError
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
    return !error
  }

  const validateAll = () => {
    let isValid = true
    const newErrors = {}

    Object.keys(validationRules).forEach((fieldName) => {
      const fieldValue = values[fieldName]
      if (!validateField(fieldName, fieldValue)) {
        isValid = false
      }
    })

    return isValid
  }

  const reset = (newValues = initialValues) => {
    setValues(newValues)
    setErrors({})
    setTouched({})
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === "checkbox" ? checked : value
    setValue(name, fieldValue)
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setFieldTouched(name, true)
  }

  return {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    validateField,
    validateAll,
    reset,
    handleChange,
    handleBlur,
    isValid: Object.keys(errors).length === 0 && Object.keys(touched).length > 0,
  }
}
