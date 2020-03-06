import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { getCallingCode } from './countries';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AsYouType, CountryCode, parseDigits } from 'libphonenumber-js';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      lineHeight: '1.5',
      height: 'auto'
    }
  }),
);

interface PhoneNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
  className?: string
}

function PhoneNumberField ({
  value,
  onChange,
  country,
  className
}: PhoneNumberFieldProps) {
  const getInitialParsedValue = () => parseValue(value, country)

  const plusCallingCode = `+${getCallingCode(country)}`
  const classes = useStyles()
  const [parsedValue, setParsedValue] = useState(value)

  const handleChange = useCallback((e: ChangeEvent<{ value: unknown }>) => {
    setParsedValue(e.target.value as string)
  }, [])

  // useEffect(() => {
  //   setParsedValue(getInitialParsedValue())
  // }, [country])

  // useEffect(() => {
  //   if (value !== parsedValue) {
  //     setParsedValue(getInitialParsedValue())
  //   }
  // }, [value])

  // useEffect(() => {
  //   setParsedValue(new AsYouType(country as CountryCode).input(`${plusCallingCode}${parsedValue}`))
  // }, [parsedValue, country, plusCallingCode])

  // useEffect(() => {
  //   if (value !== parsedValue) {
  //     onChange(parsedValue)
  //   }
  // }, [parsedValue])

  return (
    <TextField 
      value={parsedValue} 
      onChange={handleChange}
      className={className}
      size='medium'
      InputProps={{ 
        startAdornment: <InputAdornment position='start'>{plusCallingCode}</InputAdornment>,
        classes: { input: classes.input }
      }}
    />
  );
}

export default PhoneNumberField;

function parseValue(
  value: string,
  country: string
) {
	if (!value) {
		return ''
  }
  
	if (!country) {
		return value
  }
  
	const asYouType = new AsYouType(undefined)
  asYouType.input(value)
  
  const phoneNumber = asYouType.getNumber()
  
	if (phoneNumber) {
		if (country) {
			return parseDigits(phoneNumber.formatNational())
    }
    
    return value
  }

  return ''
}
