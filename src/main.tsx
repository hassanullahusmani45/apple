// import "./utils/ThemeFlicler"

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router'
import { ThemeContextProvider } from './services/provider/ThemeContextProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ThemeContextProvider>
  </StrictMode>,
)
