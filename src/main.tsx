import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { theme } from './theme/themeGlobal';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={ theme }>

    </ThemeProvider>
  </StrictMode>,
)
