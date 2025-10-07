import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect } from "react";
import { fetchHomeData } from "./redux/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchStats } from "./redux/slices/statsSlice";
import { initAuthListener } from "./redux/slices/auth/authListener";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";


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

  const location = useLocation();
  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    document.documentElement.scrollTo({top:0});
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2000);
  }, [location.pathname]);


  return (
    <div className="container mx-auto overflow-x-hidden overflow-y-auto">
      <Header />
      <div className='w-full px-2 sm:px-6 pt-22 md:pt-28'>
        <Outlet />
      </div>
      <div className="mx-2 sm:mx-6 my-5">
        <Footer />
      </div>

    </div>
  )
}

export default App
