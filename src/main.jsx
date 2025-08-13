import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ActionsProvider } from './context/ActionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ActionsProvider>
      <App />
    </ActionsProvider>
  </StrictMode>
)
