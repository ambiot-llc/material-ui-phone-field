import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Paper,
  Typography,
  Button,
} from '@material-ui/core'
import { Formik, FastField } from 'formik'
import FormPhoneField from './FormPhoneField'
import PhoneField from '../.'
// registerLocale('en')

function makeTheme(isDark) {
  const orange = {
    light: '#f8c24b',
    main: '#f8bc3a',
    dark: '#e2ab35',
  }

  const theme = createMuiTheme({
    palette: {
      type: isDark ? 'dark' : 'light',
      primary: orange,
      secondary: orange,
    },
    typography: {
      fontFamily: '"Montserrat", sans-serif',
      button: {
        fontFamily: '"Montserrat", sans-serif',
      },
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
      MuiFab: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  })

  return theme
}

const theme = makeTheme(true)

const App = () => {
  const [value, setValue] = React.useState('+15417543010')
  const onChange = React.useCallback((value: string) => {
    setValue(value)
  }, [])

  const initialValues = {
    phone: '',
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ margin: 16, padding: 16, maxWidth: 500 }}>
        <Button color="primary" onClick={() => setValue('+79151234567')}>
          Change from outside
        </Button>
        <PhoneField value={value} onChange={onChange} fullWidth language="ru" />
        <Typography gutterBottom>Output: {value}</Typography>
        <Typography variant="subtitle2">
          Formik Initial Value Example
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={() => Promise.resolve()}
        >
          {() => (
            <div>
              <FastField name="phone" component={FormPhoneField} />
            </div>
          )}
        </Formik>
      </Paper>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
