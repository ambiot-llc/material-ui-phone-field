import React, { useCallback } from 'react'
import MuiPhoneField from '../.'
import { useTranslation } from 'react-i18next'

function FormPhoneField ({ field: { name, value }, form: { setFieldValue } }) {
  const { i18n } = useTranslation()
  const language = i18n.language

  const handleChange = useCallback(
    value => {
      setFieldValue(name, value)
    },
    [setFieldValue, name]
  )

  return (
    <MuiPhoneField
      value={value}
      onChange={handleChange}
      fullWidth
      language={language}
    />
  )
}

FormPhoneField.propTypes = {}

export default FormPhoneField
