import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect, useRef } from "react";
import { fetchHomeData } from "./redux/slices/homeSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchStats } from "./redux/slices/statsSlice";
import { initAuthListener } from "./redux/slices/auth/authListener";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";


function App() {
  const dispatch = useAppDispatch();
  const { fetched } = useAppSelector(state => state.stats)
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
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

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  useEffect(() => {
    ScrollSmoother.get()?.kill();

    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current!,
      content: content.current!,
      smooth: 2.2,
      effects: true,
      smoothTouch: 0.1,
    });

    const timeout = setTimeout(() => {
      smoother.scrollTo(0, true);
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      smoother.kill();
    };
  }, [location.pathname]);


  return (
    <div id="smooth-wrapper" ref={wrapper} className="fixed inset-0 overflow-hidden">
      <div id="smooth-content" ref={content}>

        <div className="container mx-auto overflow-x-hidden">
          <Header />
          <div className='w-full px-2 sm:px-6 pt-22 md:pt-28'>
            <Outlet />
          </div>
          <div className="mx-2 sm:mx-6 my-5">
            <Footer />
          </div>
        </div>

      </div>
    </div >
  )
}

export default App
