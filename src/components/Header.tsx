import LogoLight from "../assets/Apple_Logo_light.png";
import LogoDark from "../assets/Apple_Logo_dark.png";
import { Link } from "react-router-dom";
import ThemeToggleButton from '../components/ThemeToggleButton';
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { BiLogIn } from "react-icons/bi";
import { useTheme } from "../services/provider/ThemeContextProvider";
export default function Header() {

  const { theme } = useTheme();

  return (
    <header className="fixed inset-0 h-16 rounded-full shadow-md z-50  m-5 bg-slate-200 text-slate-950 shadow-slate-400 dark:bg-slate-800 dark:text-white dark:shadow-slate-950">
      <div className="flex justify-between items-center h-16 px-8 py-4">
        <Link to={"/"}>
          <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-10 h-12 rounded-full hover:opacity-80 dark:hover:opacity-70" alt="logo" />
        </Link>

        <div className="flex justify-center items-center gap-x-5">
          <Link to={"/"} className="linkClass">HOME</Link>
          <Link to={"/articles"} className="linkClass">ARTICLES</Link>
          <Link to={"/abute"} className="linkClass">ABOUT</Link>
          <Link to={"/contact-us"} className="linkClass">CONTACT US</Link>
        </div>
        <div className="flex justify-center items-center gap-2">

          {
            // <>
            //   <div className="relative group">
            //     <ChevronDownIcon className="size-5 cursor-pointer hover:text-orange-400 transition-all" />
            //     <div className="absolute invisible group-hover:visible transition-all right-0 bg-gray-900 border-x rounded-lg px-6 py-4 space-y-3">
            //       <Link to={"/profile"} className="flex justify-start items-center gap-x-2 hover:text-orange-400 text-sm">
            //         <UserIcon className="size-5 text-white" />Profile
            //       </Link>
            //       <div onClick={()=>{}} className="flex justify-start items-center gap-x-2 hover:text-orange-400 text-sm hover:cursor-pointer">
            //         <ArrowLeftStartOnRectangleIcon className="size-5 text-white" />Logout
            //       </div>
            //       {/* {
            //         authContext.userInformation.role === "ADMIN" && <Link to={"/admin"} className="flex justify-start items-center gap-x-2 hover:text-orange-400 text-sm hover:cursor-pointer text-nowrap">
            //           <CubeIcon className="size-5 text-white" />Admin Dashbord
            //         </Link>
            //       } */}
            //     </div>
            //   </div>

            //   <Link to={"/profile"}>
            //     <img
            //       src={Profile}
            //       className="w-12 h-12 border rounded-full"
            //       alt="user-profile"
            //     />
            //   </Link>
            // </>
            <>

              <ThemeToggleButton />
              <Link to={"/user/register"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-400 hover:text-green-500">
                <HiOutlineSquaresPlus className="size-5" />Register
              </Link>
              <Link to={"/user/login"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-400 hover:text-green-500">
                <BiLogIn className="size-5" />Login
              </Link>
            </>
          }
        </div>
      </div>
    </header>
  );
}
