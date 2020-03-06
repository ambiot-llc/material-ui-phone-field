import {
  getCountryCallingCode,
  isSupportedCountry,
  CountryCode,
} from 'libphonenumber-js';
import isoCountries from 'i18n-iso-countries';

export const getCallingCode: (iso: string) => string = function (iso) {
  return getCountryCallingCode(iso as CountryCode) as string;
};

interface StringMap {
  [key: string]: string;
}

isoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function makeCountriesObject () {
  const codes = Object.keys(isoCountries.getAlpha2Codes());

  const countriesObject: StringMap = {};

  for (const code of codes) {
    if (isSupportedCountry(code)) {
      const callingCode = getCallingCode(code);
      countriesObject[code] = callingCode;
    }
  }

  return countriesObject;
}

export const countries: StringMap = makeCountriesObject();
export const isoCountryCodes = Object.keys(countries);
