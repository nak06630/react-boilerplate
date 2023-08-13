import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import ja from 'date-fns/locale/ja'
import theme from './theme'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>
)
