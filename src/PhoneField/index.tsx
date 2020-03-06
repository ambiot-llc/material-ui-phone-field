import React, { useState, ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import CountrySelect from './CountrySelect';
import { isoCountryCodes } from './countries';
import PhoneNumberField from './PhoneNumberField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignContent: 'center',
      // alignItems: 'baseline',
      '& > *:first-child': {
        marginRight: theme.spacing(2)
      }
    },
    fullWidth: {
      width: '100%'
    },
    field: {
      flex: 1
    }
  }),
);

interface PhoneFieldProps {
  value: string,
  onChange: (value: string) => void,
  defaultCountry?: string,
  fullWidth?: boolean
}

const PhoneField = ({ value, onChange, defaultCountry = 'RU', fullWidth }: PhoneFieldProps) => {
  const classes = useStyles()
  const [country, setCountry] = useState(defaultCountry)

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string)
  }

  return (
    <div className={clsx(classes.root, fullWidth && classes.fullWidth)}>
      <CountrySelect value={country || ''} onChange={handleChange} displayCountries={isoCountryCodes} />
      <PhoneNumberField value={value} onChange={onChange} country={country} className={classes.field} />
    </div>
  );
};

export default PhoneField
