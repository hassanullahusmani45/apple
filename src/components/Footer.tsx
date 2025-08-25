import { Link } from "react-router-dom";

import LogoLight from "../assets/Apple_Logo_light.png";
import LogoDark from "../assets/Apple_Logo_dark.png";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiMessageError } from "react-icons/bi";
import { MdConnectWithoutContact, MdMarkEmailUnread } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
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
            <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-10 h-12 rounded-full hover:opacity-80 dark:hover:opacity-70" alt="logo" />
          </Link>
          <div className="mt-6">
            Apple is the best place for learning articles, offering insightful and high-quality content to help you stay ahead in technology and beyond. Whether you are a beginner or an expert, our articles are designed to inspire and educate, empowering you to expand your knowledge and skills.
          </div>
        </div>

        {/* Links part */}
        <div className="col-span-1 text-left">
          <div className="flex items-center gap-1 my-5 font-semibold">PAGES</div>
          <div className="text-sm leading-[2rem] dark:text-slate-300 text-slate-800">
            <Link to={"/articles"} className="flex items-center gap-x-1 hover:text-green-500 dark:hover:text-orange-400"><HiOutlineClipboardDocumentList className="size-5 dark:text-white text-slate-950" />Article</Link>
            <Link to={"/abute"} className="flex items-center gap-x-1 hover:text-green-500 dark:hover:text-orange-400"><BiMessageError className="size-5 dark:text-white text-slate-950" />Abute</Link>
            <Link to={"/contact-us"} className="flex items-center gap-x-1 hover:text-green-500 dark:hover:text-orange-400"><MdConnectWithoutContact className="size-5 dark:text-white text-slate-950" />Contact Us</Link>
          </div>
        </div>

        {/* Suport part */}
        <div className="col-span-1 text-left">
          <div className="flex gap-1 my-5 font-semibold">SUPPORT</div>
          <div className="text-sm leading-[2rem] dark:text-slate-300 text-slate-800">
            <div className="flex items-center gap-1"><MdMarkEmailUnread className="size-5 dark:text-white text-slate-950" /> hassanullahusmani45@gmail.com</div>
            <div className="flex items-center gap-1"><IoPhonePortraitOutline className="size-5 dark:text-white text-slate-950" /> +93 772 181 609</div>
            <div className="flex items-center gap-1"><FaWhatsapp className="size-5 dark:text-white text-slate-950" /> 076 723 3172</div>
          </div>
        </div>

        <div className="col-span-4 text-center mt-6">
          <div className="text-md font-semibold text-green-500 dark:text-orange-500 my-2">Follow Me on Social Media</div>
          <div className="flex justify-center items-center gap-4 md:gap-6">
            <a
              href="https://www.linkedin.com/in/hassanullahusmani" target="_blank"
              rel="noopener noreferrer" className="rounded-full p-2 w-12 h-12 bg-sky-800 cursor-pointer flex items-center justify-center text-white hover:scale-90 duration-300 transition-all">
              <LuLinkedin className="size-6" />
            </a>
            <a
              href="https://github.com/hassanullahusmani45" target="_blank"
              rel="noopener noreferrer" className="rounded-full p-2 w-12 h-12 bg-black cursor-pointer flex items-center justify-center text-white hover:scale-90 duration-300 transition-all">
              <FiGithub className="size-6" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61579164404688" target="_blank"
              rel="noopener noreferrer" className="rounded-full p-2 w-12 h-12 bg-blue-600 cursor-pointer flex items-center justify-center text-white hover:scale-90 duration-300 transition-all">
              <FiFacebook className="size-6" />
            </a>
            <a
              href="https://www.instagram.com/hassanullahusmani45" target="_blank"
              rel="noopener noreferrer" className="rounded-full p-2 w-12 h-12 bg-conic from-rose-600 via-amber-600 to-rose-600  cursor-pointer flex items-center justify-center hover:scale-90 duration-300 transition-all">
              <FaInstagram className="size-6" />
            </a>
          </div>
        </div>
        <div className="col-span-4 text-center border-t border-slate-600 py-4 font-semibold">
          Copyright &copy; {currentYear} Hassanullah Usmani
        </div>
      </div>


    </footer>
  );
}
