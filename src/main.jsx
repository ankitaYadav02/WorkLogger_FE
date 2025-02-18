import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider, useSnackbar } from 'notistack';

createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3}>
    <StrictMode>
      <App />
    </StrictMode>,
  </SnackbarProvider>
)


