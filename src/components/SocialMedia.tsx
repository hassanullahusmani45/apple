import { FaInstagram } from "react-icons/fa";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
export default function SocialMedia() {
    return (
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
                rel="noopener noreferrer" className="rounded-full p-2 w-12 h-12 text-white bg-conic from-rose-600 via-amber-600 to-rose-600  cursor-pointer flex items-center justify-center hover:scale-90 duration-300 transition-all">
                <FaInstagram className="size-6" />
            </a>
        </div>
    )
}
