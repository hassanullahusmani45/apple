import { Link } from 'react-router-dom'
import LogoLight from "../assets/Apple_Logo_light.png";
import LogoDark from "../assets/Apple_Logo_dark.png";
import { useTheme } from '../services/provider/ThemeContextProvider';

interface AuthLayoutProps {
    children: React.ReactNode;
    page: string;
    information: string;
}

export default function AuthLayout({ page, information, children }: AuthLayoutProps) {

    const { theme } = useTheme();

    return (
        <div className='flex justify-center items-center w-full h-screen bg-inherit text-inherit'>
            <section className='flex flex-col justify-center w-full sm:w-3/4 md:w-2/3 lg:w-[600px] h-fit bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-md shadow-slate-400 dark:shadow-slate-950 p-8 mx-4 '>
                <div className=' text-center text-green-500 text-xl font-bold mb-5'>Welcome To The {page} Page.</div>

                <Link to={"/"} className='flex justify-center items-center'>
                    <img src={theme === 'dark' ? LogoLight : LogoDark} className="w-16 h-19 rounded-full" alt="logo" />
                </Link>

                {children}

                <div className='flex mt-8 gap-2'>
                    <span className='text-green-500 text-sm font-medium'>{information}</span>
                    <Link to={page === "Register" ? "/login" : "/register"} className='text-sm font-medium text-orange-500'>
                        {page === "Register" ? "Login" : "Register"}
                    </Link>
                </div>
            </section>
        </div>
    )
}
