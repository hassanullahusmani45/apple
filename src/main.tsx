// import "./utils/ThemeFlicler"

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router'
import { ThemeContextProvider } from './services/provider/ThemeContextProvider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from 'sonner';
import { useTheme } from "./services/provider/ThemeContextProvider";







function Root() {
  const { theme } = useTheme();

  return (
    <>
      <Router />
      <Toaster
        theme={theme === "dark" ? "dark" : "light"}
        position="top-left"
        richColors
        duration={2500}
        containerAriaLabel="Notifications"
        toastOptions={{
          classNames: {
            toast: "lg:min-w-[450px] lg:min-h-[120px]",
          }
        }}
        visibleToasts={5}
      />
    </>
  );
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </ThemeContextProvider>
  </StrictMode>,
)
