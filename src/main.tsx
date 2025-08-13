// import "./utils/ThemeFlicler"

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router'
import { ThemeContextProvider } from './services/provider/ThemeContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  </StrictMode>,
)
