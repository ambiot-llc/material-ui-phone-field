import React, { useState, useCallback, ChangeEvent, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import CountrySelect from './CountrySelect'
import { isoCountryCodes, getCallingCode } from './countries'
import PhoneNumberField from './PhoneNumberField'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignContent: 'center',
      // alignItems: 'baseline',
      '& > *:first-child': {
        marginRight: theme.spacing(2),
      },
    },
    fullWidth: {
      width: '100%',
    },
    field: {
      flex: 1,
    },
  })
)

interface PhoneFieldProps {
  value: string
  onChange: (value: string) => void
  defaultCountry?: string
  fullWidth?: boolean
  language?: string
}

function returnValue(country: string, phoneValue: string) {
  if (!phoneValue.length) return ''
  if (!country.length) return phoneValue

  const callingCode = getCallingCode(country)
  if (!callingCode) return phoneValue

  return `+${callingCode}${phoneValue}`
}

function getValueCountry(value: string) {
  if (!value) return ''

  const phoneNumber = parsePhoneNumberFromString(value)
  if (!phoneNumber) return ''

  return phoneNumber.country || ''
}

const PhoneField = ({
  value,
  onChange,
  defaultCountry,
  fullWidth,
  language,
}: PhoneFieldProps) => {
  const classes = useStyles()
  const [country, setCountry] = useState(
    getValueCountry(value) || defaultCountry || ''
  )
  const [phoneValue, setPhoneValue] = useState('')

  const change = useCallback(
    (country: string, phoneValue: string) => {
      onChange(returnValue(country, phoneValue))
    },
    [onChange]
  )

  const handleCountryChange = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      const newCountry = event.target.value as string
      setCountry(newCountry)
      change(newCountry, phoneValue)
    },
    [setCountry, change, phoneValue]
  )

  const handleTextChange = useCallback(
    (value: string) => {
      setPhoneValue(value)
      change(country, value)
    },
    [setPhoneValue, change, country]
  )

  useEffect(() => {
    const newCountry = getValueCountry(value)
    if (newCountry) {
      setCountry(newCountry)
    }
  }, [value])

  return (
    <div className={clsx(classes.root, fullWidth && classes.fullWidth)}>
      <CountrySelect
        value={country || ''}
        onChange={handleCountryChange}
        displayCountries={isoCountryCodes}
        language={language}
      />
      <PhoneNumberField
        value={value}
        onChange={handleTextChange}
        country={country}
        className={classes.field}
      />
    </div>
  )
}

export default PhoneField
