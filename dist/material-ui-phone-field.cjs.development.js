'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var styles = require('@material-ui/core/styles');
var clsx = _interopDefault(require('clsx'));
var PropTypes = _interopDefault(require('prop-types'));
var MenuItem = _interopDefault(require('@material-ui/core/MenuItem'));
var FormControl = _interopDefault(require('@material-ui/core/FormControl'));
var Select = _interopDefault(require('@material-ui/core/Select'));
var isoCountries = _interopDefault(require('i18n-iso-countries'));
var core = require('@material-ui/core');
var libphonenumberJs = require('libphonenumber-js');

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var getCallingCode = function getCallingCode(iso) {
  try {
    return libphonenumberJs.getCountryCallingCode(iso);
  } catch (err) {
    return undefined;
  }
};
isoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
isoCountries.registerLocale(require('i18n-iso-countries/langs/ru.json'));

function makeCountriesObject() {
  var codes = Object.keys(isoCountries.getAlpha2Codes());
  var countriesObject = {};

  for (var _i = 0, _codes = codes; _i < _codes.length; _i++) {
    var code = _codes[_i];

    if (libphonenumberJs.isSupportedCountry(code)) {
      var callingCode = getCallingCode(code);

      if (callingCode) {
        countriesObject[code] = callingCode;
      }
    }
  }

  return countriesObject;
}

var countries = /*#__PURE__*/makeCountriesObject();
var isoCountryCodes = /*#__PURE__*/Object.keys(countries);

function CountrySelect(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      _ref$displayCountries = _ref.displayCountries,
      displayCountries = _ref$displayCountries === void 0 ? [] : _ref$displayCountries,
      _ref$language = _ref.language,
      language = _ref$language === void 0 ? 'en' : _ref$language;
  var theme = core.useTheme();
  var names = React.useMemo(function () {
    return isoCountries.getNames(language);
  }, [language]); // if (!names.length) {
  //   console.error('Country names list is empty. You\'ve probably haven\'t registered the language in which the country list is displayed. Use registerLocale function to register the language.')
  // }

  var isoCodes = React.useMemo(function () {
    return displayCountries != null && displayCountries.length ? displayCountries : Object.keys(names);
  }, [displayCountries, names]);
  var countryName = React.useMemo(function () {
    return function (code) {
      return names[code] || code;
    };
  }, [names]);
  var countriesAndCodes = React.useMemo(function () {
    var result = [];

    for (var _iterator = _createForOfIteratorHelperLoose(isoCodes), _step; !(_step = _iterator()).done;) {
      var isoCode = _step.value;
      var callingCode = getCallingCode(isoCode);
      if (!callingCode) continue;
      result.push([isoCode.toUpperCase(), countryName(isoCode), "+" + callingCode]);
    }

    return result;
  }, [isoCodes, countryName]);
  return React__default.createElement(FormControl, null, React__default.createElement(Select, {
    value: value,
    onChange: onChange,
    displayEmpty: true,
    renderValue: function renderValue(value) {
      var code = value;

      if (!code.length) {
        return React__default.createElement(core.Typography, null, "\u2014");
      }

      return React__default.createElement(core.Typography, null, "+" + getCallingCode(code));
    }
  }, countriesAndCodes.map(function (_ref2) {
    var isoCode = _ref2[0],
        country = _ref2[1],
        callingCode = _ref2[2];
    return React__default.createElement(MenuItem, {
      key: isoCode,
      value: isoCode,
      style: {
        whiteSpace: 'normal'
      }
    }, React__default.createElement(core.Grid, {
      container: true,
      spacing: 1
    }, React__default.createElement(core.Grid, {
      item: true,
      xs: 9
    }, React__default.createElement(core.Typography, {
      variant: "body2",
      color: "textSecondary"
    }, country)), React__default.createElement(core.Grid, {
      item: true
    }, React__default.createElement(core.Typography, {
      variant: "body2",
      style: {
        fontWeight: theme.typography.fontWeightMedium
      }
    }, callingCode))));
  })));
}

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string
};

var useStyles = /*#__PURE__*/styles.makeStyles(function () {
  return styles.createStyles({
    input: {
      lineHeight: '1.5',
      height: 'auto'
    }
  });
});

function PhoneNumberField(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      country = _ref.country,
      className = _ref.className;
  // const getInitialParsedValue = () => formattedToPlain(value, country)
  // const plusCallingCode = `+${getCallingCode(country)}`
  var classes = useStyles();
  var parsedValue = plainToFormatted(value, country);
  var handleChange = React.useCallback(function (e) {
    // setParsedValue(e.target.value as string)
    onChange(formattedToPlain(e.target.value, country));
  }, [onChange, country]); // useEffect(() => {
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

  return React__default.createElement(core.TextField, {
    value: parsedValue,
    onChange: handleChange,
    className: className,
    size: "medium",
    InputProps: {
      // startAdornment: <InputAdornment position='start'>{plusCallingCode}</InputAdornment>,
      classes: {
        input: classes.input
      }
    }
  });
}

function formattedToPlain(value, country) {
  if (!value) {
    return '';
  }

  if (!country) {
    return value;
  }

  var asYouType = new libphonenumberJs.AsYouType(country);
  asYouType.input(value);
  var phoneNumber = asYouType.getNumber();

  if (phoneNumber) {
    if (country) {
      return libphonenumberJs.parseDigits(phoneNumber.format('NATIONAL', {
        nationalPrefix: false
      }));
    }

    return value;
  }

  return '';
}

function plainToFormatted(value, country) {
  if (!value) {
    return '';
  }

  if (!country) {
    return value;
  }

  var asYouType = new libphonenumberJs.AsYouType(country);
  asYouType.input(value);
  var phoneNumber = asYouType.getNumber();

  if (phoneNumber) {
    if (country) {
      return phoneNumber.format('NATIONAL', {
        nationalPrefix: false
      });
    }

    return value;
  }

  return '';
}

var useStyles$1 = /*#__PURE__*/styles.makeStyles(function (theme) {
  return styles.createStyles({
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
  });
});

function returnValue(country, phoneValue) {
  if (!phoneValue.length) return '';
  if (!country.length) return phoneValue;
  var callingCode = getCallingCode(country);
  if (!callingCode) return phoneValue;
  return "+" + callingCode + phoneValue;
}

function getValueCountry(value) {
  if (!value) return '';
  var phoneNumber = libphonenumberJs.parsePhoneNumberFromString(value);
  if (!phoneNumber) return '';
  return phoneNumber.country || '';
}

var PhoneField = function PhoneField(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      defaultCountry = _ref.defaultCountry,
      fullWidth = _ref.fullWidth,
      language = _ref.language;
  var classes = useStyles$1();

  var _useState = React.useState(getValueCountry(value) || defaultCountry || ''),
      country = _useState[0],
      setCountry = _useState[1];

  var _useState2 = React.useState(''),
      phoneValue = _useState2[0],
      setPhoneValue = _useState2[1];

  var change = React.useCallback(function (country, phoneValue) {
    onChange(returnValue(country, phoneValue));
  }, [onChange]);
  var handleCountryChange = React.useCallback(function (event) {
    var newCountry = event.target.value;
    setCountry(newCountry);
    change(newCountry, phoneValue);
  }, [setCountry, change, phoneValue]);
  var handleTextChange = React.useCallback(function (value) {
    setPhoneValue(value);
    change(country, value);
  }, [setPhoneValue, change, country]);
  React.useEffect(function () {
    var newCountry = getValueCountry(value);

    if (newCountry) {
      setCountry(newCountry);
    }
  }, [value]);
  return React__default.createElement("div", {
    className: clsx(classes.root, fullWidth && classes.fullWidth)
  }, React__default.createElement(CountrySelect, {
    value: country || '',
    onChange: handleCountryChange,
    displayCountries: isoCountryCodes,
    language: language
  }), React__default.createElement(PhoneNumberField, {
    value: value,
    onChange: handleTextChange,
    country: country,
    className: classes.field
  }));
};

exports.default = PhoneField;
//# sourceMappingURL=material-ui-phone-field.cjs.development.js.map
