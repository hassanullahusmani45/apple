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
    <header className=" container fixed top-0 h-20 rounded-full shadow-md z-50  m-5 bg-slate-200 text-slate-950 shadow-slate-400 dark:bg-slate-800 dark:text-white dark:shadow-slate-950">
      <div className="flex justify-between items-center h-20 px-8 py-4">
        <Link to={"/"}>
          <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-10 h-12 rounded-full" alt="logo" />
        </Link>

        <div className="flex justify-center items-center gap-x-5 font-semibold">
          <Link to={"/"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-300 hover:border-b dark:hover:border-orange-400 hover:text-sky-500 hover:border-sky-700 px-2">HOME</Link>
          <Link to={"/posts"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-300 hover:border-b dark:hover:border-orange-400 hover:text-sky-500 hover:border-sky-700 px-2">ARTICLES</Link>
          <Link to={"/abute"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-300 hover:border-b dark:hover:border-orange-400 hover:text-sky-500 hover:border-sky-700 px-2">ABOUT</Link>
          <Link to={"/contact-as"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-300 hover:border-b dark:hover:border-orange-400 hover:text-sky-500 hover:border-sky-700 px-2">CONTACT AS</Link>
        </div>
        <div className="flex justify-center items-center gap-2">

          {
            // <>
            //   <div className="relative group">
            //     <ChevronDownIcon className="size-5 cursor-pointer hover:text-orange-300 transition-all" />
            //     <div className="absolute invisible group-hover:visible transition-all right-0 bg-gray-900 border-x rounded-lg px-6 py-4 space-y-3">
            //       <Link to={"/profile"} className="flex justify-start items-center gap-x-2 hover:text-orange-300 text-sm">
            //         <UserIcon className="size-5 text-white" />Profile
            //       </Link>
            //       <div onClick={()=>{}} className="flex justify-start items-center gap-x-2 hover:text-orange-300 text-sm hover:cursor-pointer">
            //         <ArrowLeftStartOnRectangleIcon className="size-5 text-white" />Logout
            //       </div>
            //       {/* {
            //         authContext.userInformation.role === "ADMIN" && <Link to={"/admin"} className="flex justify-start items-center gap-x-2 hover:text-orange-300 text-sm hover:cursor-pointer text-nowrap">
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
              <Link to={"/user/register"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-300 hover:text-sky-500">
                <HiOutlineSquaresPlus className="size-5" />Register
              </Link>
              <Link to={"/user/login"} className="flex justify-around items-center gap-x-1 dark:hover:text-orange-300 hover:text-sky-500">
                <BiLogIn className="size-5" />Login
              </Link>
            </>
          }
        </div>
      </div>
    </header>
  );
}
