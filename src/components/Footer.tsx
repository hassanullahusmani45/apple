import { Link } from "react-router-dom";

import LogoLight from "../../public/assets/Apple_Logo_light.png";
import LogoDark from "../../public/assets/Apple_Logo_dark.png";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BiMessageError } from "react-icons/bi";
import { MdConnectWithoutContact, MdMarkEmailUnread } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { useTheme } from "../services/provider/ThemeContextProvider";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const { t } = useTranslation("header_and_footer");


  return (
    <footer>

      <div className="grid grid-cols-8 gap-3  md:gap-y-4 xl:gap-y-8 rounded-xl shadow-md p-3 md:p-4 lg:p-6 bg-slate-200 text-slate-950 shadow-slate-400 dark:bg-slate-800 dark:text-white dark:shadow-slate-950">
        {/* Logo and Description part*/}
        <div className="col-span-8 md:col-span-3 lg:col-span-4 text-start">
          <Link to={"/"}>
            <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-10 h-12 rounded-full hover:opacity-80 dark:hover:opacity-70" alt="logo" />
          </Link>
          <div className="mt-6">{t("footer_apple_info")}</div>
        </div>

        {/*PAGES Links part */}
        <div className="col-span-8 md:col-span-2 lg:col-span-2 text-start">
          <div className="flex items-center gap-1 my-5 font-semibold">{t("PAGES")}</div>
          <div className="flex justify-evenly items-center md:block text-sm leading-[2rem] dark:text-slate-300 text-slate-800">
            <Link to={"/articles"} className="flex items-center gap-x-1 hover:text-green-500 dark:hover:text-orange-400"><HiOutlineClipboardDocumentList className="size-5 dark:text-white text-slate-950" />{t("Articles")}</Link>
            <Link to={"/about"} className="flex items-center gap-x-1 hover:text-green-500 dark:hover:text-orange-400"><BiMessageError className="size-5 dark:text-white text-slate-950" />{t("About")}</Link>
            <Link to={"/contact-us"} className="flex items-center gap-x-1 hover:text-green-500 dark:hover:text-orange-400"><MdConnectWithoutContact className="size-5 dark:text-white text-slate-950" />{t("Contact Us")}</Link>
          </div>
        </div>

        {/* Suport part */}
        <div className="col-span-8 md:col-span-3 lg:col-span-2 text-start">
          <div className="flex gap-1 my-5 font-semibold">{t("SUPPORT")}</div>
          <div className="text-sm leading-[2rem] dark:text-slate-300 text-slate-800">

            <div className="flex items-center gap-1"><MdMarkEmailUnread className="size-5 dark:text-white text-slate-950" />
              <span dir="ltr">hassanullahusmani45@gmail.com</span>
            </div>
            <div className="flex items-center gap-1"><IoPhonePortraitOutline className="size-5 dark:text-white text-slate-950" />
              <span dir="ltr"> {t("+93 772 181 609")} </span>
            </div>
            <div className="flex items-center gap-1"><FaWhatsapp className="size-5 dark:text-white text-slate-950" />
              <span dir="ltr"> {t("076 723 3172")} </span>
            </div>
          </div>

        </div>

        <div className="col-span-8 text-center mt-6">
          <div className="text-md font-semibold text-green-500 dark:text-orange-500 my-2">{t("follow")}</div>
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
        <div className="col-span-8 text-center border-t border-slate-600 py-4 font-semibold">
          Copyright &copy; {currentYear} Hassanullah Usmani
        </div>
      </div>


    </footer>
  );
}
