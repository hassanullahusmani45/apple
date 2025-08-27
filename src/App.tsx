import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect } from "react";
import { fetchHomeData } from "./redux/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchStats } from "./redux/slices/statsSlice";
import { Toaster } from 'sonner';
import { useTheme } from "./services/provider/ThemeContextProvider";
function App() {
  const dispatch = useAppDispatch();
  const { fetched } = useAppSelector(state => state.stats)
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchStats());
    }
  }, [fetched, dispatch]);

  return (
    <div className="container mx-auto overflow-x-hidden overflow-y-auto">
      <Header />
      <div className='w-full px-6 pt-32'>
        <Outlet />
      </div>
      <div className="mx-6 my-5">
        <Footer />
      </div>

      {/* Toaster is a provider for toast messages */}
      <Toaster
        theme={theme === "dark" ? "dark" : 'light'}
        position='top-left'
        richColors
        duration={28500}
        containerAriaLabel="Notifications"
        toastOptions={{
          classNames: {
            toast: "lg:min-w-[450px] lg:min-h-[120px]",
            description: "font-semibold text-green-500",
            title: "text-xl",
          }
        }}
        visibleToasts={5}
      />

    </div>
  )
}

export default App
