import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider, CssBaseline, Paper, Typography } from '@material-ui/core'
import PhoneField from '../.';

// registerLocale('en')

function makeTheme (isDark) {
  const orange = {
    light: '#f8c24b',
    main: '#f8bc3a',
    dark: '#e2ab35'
  }

  const theme = createMuiTheme({
    palette: {
      type: isDark ? 'dark' : 'light',
      primary: orange,
      secondary: orange
    },
    typography: {
      fontFamily: '"Montserrat", sans-serif',
      button: {
        fontFamily: '"Montserrat", sans-serif'
      }
    },
    overrides: {
      MuiButton: {
        root: {
          textTransform: 'none',
          boxShadow: 'none'
        }
      },
      MuiFab: {
        root: {
          boxShadow: 'none'
        }
      }
    }
  })

  return theme
}

const theme = makeTheme(true)

const App = () => {
  const [value, setValue] = React.useState('')
  const onChange = React.useCallback((value: string) => {
    console.log('onChange', value)
    setValue(value)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ margin: 16, padding: 16, maxWidth: 500 }}>
        <PhoneField value={value} onChange={onChange} fullWidth language='ru' />
        <Typography>{value}</Typography>
      </Paper>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
