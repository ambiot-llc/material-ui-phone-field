import React, { ChangeEvent, useMemo } from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import countries from 'i18n-iso-countries'
import { Typography, useTheme, Grid } from '@material-ui/core';
import { getCallingCode } from './countries';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     listItem: {
//       whiteSpace: 'normal'
//     },
//     callingCode: {
//       fontWeight: theme.typography.fontWeightMedium
//     },
//   }),
// );

interface CountryProps {
  value: string,
  onChange: (e: ChangeEvent<{ value: unknown }>) => void,
  displayCountries?: string[],
  language?: string
}

function CountrySelect ({ value, onChange, displayCountries = [], language = 'en' }: CountryProps) {
  const theme = useTheme()
  const names = useMemo(() => countries.getNames(language), [language])

  // if (!names.length) {
  //   console.error('Country names list is empty. You\'ve probably haven\'t registered the language in which the country list is displayed. Use registerLocale function to register the language.')
  // }

  const isoCodes = useMemo(() => displayCountries != null && displayCountries.length ? displayCountries : Object.keys(names), [displayCountries, names])

  const countryName: (code: string) => string = useMemo(() => code => names[code] || code, [names])

  const countriesAndCodes = useMemo(() => {
    let result = []

    for (const isoCode of isoCodes) {
      const callingCode = getCallingCode(isoCode)
      if (!callingCode) continue
      result.push([isoCode.toUpperCase(), countryName(isoCode), `+${callingCode}`])
    }

    return result
  }, [isoCodes, countryName])

  return (
    <FormControl>
      <Select value={value} onChange={onChange} displayEmpty renderValue={value => {
        const code = value as string
        if (!code.length) {
          return <Typography>—</Typography>
        }

        return <Typography>{`+${getCallingCode(code)}`}</Typography>
      }}>
        {countriesAndCodes.map(([isoCode, country, callingCode]: string[]) => {
          return (
            <MenuItem key={isoCode} value={isoCode} style={{ whiteSpace: 'normal' }}>
              <Grid container spacing={1}>
                <Grid item xs={9}>
                  <Typography variant='body2' color='textSecondary'>
                    {country}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2' style={{ fontWeight: theme.typography.fontWeightMedium }}>
                    {callingCode}
                  </Typography>
                </Grid>
              </Grid>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string
}

export default CountrySelect

