import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect } from "react";
import { fetchHomeData } from "./redux/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchStats } from "./redux/slices/statsSlice";
import { initAuthListener } from "./redux/slices/auth/authListener";
// import { Toaster } from 'sonner';
// import { useTheme } from "./services/provider/ThemeContextProvider";
function App() {
  const dispatch = useAppDispatch();
  const { fetched } = useAppSelector(state => state.stats)

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchStats());
    }
  }, [fetched, dispatch]);

  useEffect(() => {
    initAuthListener();
  }, []);
  

  return (
    <div className="container mx-auto overflow-x-hidden overflow-y-auto">
      <Header />
      <div className='w-full px-6 pt-32'>
        <Outlet />
      </div>
      <div className="mx-6 my-5">
        <Footer />
      </div>

    </div>
  )
}

export default App
