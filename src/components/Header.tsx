import LogoLight from "../assets/Apple_Logo_light.png";
import LogoDark from "../assets/Apple_Logo_dark.png";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggleButton from '../components/ThemeToggleButton';
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { useTheme } from "../services/provider/ThemeContextProvider";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logoutUser, resetStatus } from "../redux/slices/auth/authSlice";
import { FaPowerOff, FaRegUser } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import HeaderDropdownMenu from "./HeaderDropdownMenu";
import { toastError } from "../utils/toastError";
import { toastSuccess } from "../utils/toastSuccess";
import { useEffect } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";


export default function Header() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const isOnline = useOnlineStatus();

  const { user, success, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (success) {
      toastSuccess("You have successfully logged out.");
      navigate("/login");
      dispatch(resetStatus());
    }

    if (error) {

      if (isOnline) {
        toastError("Something went wrong. Please try again later!");
      } else {
        toastError("Logout failed. Please check your internet and try again.");
      }
      dispatch(resetStatus());

    }
  }, [success, error, isOnline, navigate, dispatch]);

  const logout = async () => {
    try {
      if (!isOnline) {
        toastError("No internet connection. Please try again.");
        return;
      }
      await dispatch(logoutUser()).unwrap();
    } catch (error: any) {
      toastError(error?.message || "Logout failed.");
    }
  };


  return (
    <header className="fixed inset-0 h-16 rounded-full shadow-md z-50  m-5 bg-slate-200 text-slate-950 shadow-slate-400 dark:bg-slate-800 dark:text-white dark:shadow-slate-950">
      <div className="flex justify-between items-center h-16 px-8 py-4">
        <Link to={"/"}>
          <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-10 h-12 rounded-full hover:opacity-80 dark:hover:opacity-70" alt="logo" />
        </Link>

        <div className="flex justify-center items-center gap-x-5">
          <Link to={"/"} className="linkClass">HOME</Link>
          <Link to={"/articles"} className="linkClass">ARTICLES</Link>
          <Link to={"/about"} className="linkClass">ABOUT</Link>
          <Link to={"/contact-us"} className="linkClass">CONTACT US</Link>
        </div>
        <div className="flex justify-center items-center gap-2">

          {
            <>
              <ThemeToggleButton />
              {user!! ?
                (
                  <HeaderDropdownMenu>
                    <Link to={"/profile"} className="auth-link-style">
                      <FaRegUser className="size-4" />Profile
                    </Link>
                    <div className="auth-link-style" onClick={logout}>
                      <FaPowerOff className="size-4" />Logout
                    </div>
                  </HeaderDropdownMenu>
                ) : (
                  <HeaderDropdownMenu>
                    <Link to={"/register"} className="auth-link-style">
                      <HiOutlineSquaresPlus className="size-5" />Register
                    </Link>
                    <Link to={"/login"} className="auth-link-style">
                      <IoMdLogIn className="size-5" />Login
                    </Link>
                  </HeaderDropdownMenu>
                )}
            </>
          }
        </div>
      </div>
    </header>
  );
}
