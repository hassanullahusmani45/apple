import { Link } from "react-router-dom";

import LogoLight from "../assets/Apple_Logo_light.png";
import LogoDark from "../assets/Apple_Logo_dark.png";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiMessageError } from "react-icons/bi";
import { MdConnectWithoutContact, MdMarkEmailUnread } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { useTheme } from "../services/provider/ThemeContextProvider";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme(); 
  return (
    <footer>

      <div className="grid grid-cols-4 gap-8 rounded-xl shadow-md p-5 bg-slate-200 text-slate-950 shadow-slate-400 dark:bg-slate-800 dark:text-white dark:shadow-slate-950">
        {/* Logo and Description part*/}
        <div className="col-span-2 text-left">
          <Link to={"/"}>
            <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-10 h-12 rounded-full" alt="logo" />
          </Link>
          <div className="mt-6">
            Apple is the best place for learning articles, offering insightful and high-quality content to help you stay ahead in technology and beyond. Whether you are a beginner or an expert, our articles are designed to inspire and educate, empowering you to expand your knowledge and skills.
          </div>
        </div>

        {/* Links part */}
        <div className="col-span-1 text-left">
          <div className="flex items-center gap-1 my-5 font-semibold">Pages</div>
          <div className="text-sm leading-[2rem] dark:text-slate-300 text-slate-800">
            <Link to={"/posts"} className="flex items-center gap-x-1 "><HiOutlineClipboardDocumentList className="size-5 dark:text-white text-slate-950"/>Article</Link>
            <Link to={"/abute"} className="flex items-center gap-x-1 "><BiMessageError className="size-5 dark:text-white text-slate-950"/>Abute As</Link>
            <Link to={"/contact-as"} className="flex items-center gap-x-1 "><MdConnectWithoutContact className="size-5 dark:text-white text-slate-950"/>Contact As</Link>
          </div>
        </div>

        {/* Suport part */}
        <div className="col-span-1 text-left">
          <div className="flex gap-1 my-5 font-semibold">Support</div>
          <div className="text-sm leading-[2rem] dark:text-slate-300 text-slate-800">
            <div className="flex items-center gap-1"><MdMarkEmailUnread className="size-5 dark:text-white text-slate-950"/> hassanullahusmani45@gmail.com</div>
            <div className="flex items-center gap-1"><IoPhonePortraitOutline className="size-5 dark:text-white text-slate-950"/> +93 772 181 609</div>
            <div className="flex items-center gap-1"><FaWhatsapp className="size-5 dark:text-white text-slate-950"/> 076 723 3172</div>
          </div>
        </div>

        <div className="col-span-4 text-center border-t border-slate-600 py-4 mt-6 font-semibold">
          Copyright &copy; {currentYear} Hassanullah Usmani
        </div>
      </div>


    </footer>
  );
}
