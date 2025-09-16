import { Link } from 'react-router-dom'
import LogoLight from "../../public/assets/Apple_Logo_light.png";
import LogoDark from "../../public/assets/Apple_Logo_dark.png";
import { useTheme } from '../services/provider/ThemeContextProvider';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
    children: React.ReactNode;
    page: string;
    information: string;
}

export default function AuthLayout({ page, information, children }: AuthLayoutProps) {

    const { theme } = useTheme();
    const { t } = useTranslation("authantication")

    return (
        <div className='flex justify-center items-center w-full h-screen bg-inherit text-inherit overflow-x-hidden'>
            <section className='flex flex-col justify-center w-full sm:w-3/4 md:w-2/3 lg:w-[400px] xl:w-[500px] h-fit bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-md shadow-slate-400 dark:shadow-slate-950 p-8 xl:px-8 xl:py-6 mx-4 '>
                <div className=' text-center text-green-500 text-xl font-bold mb-4'>{t("Welcome To The")} {t(page)} {t("Page")}</div>

                <Link to={"/"} className='flex justify-center items-center'>
                    <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-16 h-19 rounded-full" alt="logo" />
                </Link>

                {children}

                <div className='flex mt-8 gap-2'>
                    <span className='text-green-500 text-sm font-semibold'>{information}</span>
                    <Link to={page === "Register" ? "/login" : "/register"} className='text-sm font-bold text-orange-500 '>
                        {t(page === "Register" ? "Login" : "Register")}
                    </Link>
                </div>
            </section>
        </div>
    )
}
