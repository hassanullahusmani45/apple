import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineGlobeEuropeAfrica } from "react-icons/hi2";
import { FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TeamMemmberCard(props:any) {
    return (
            <div className='transition-all'>
                <div className='flex justify-center items-center bg-slate-200 shadow-sm dark:bg-slate-800/90 pt-6 px-4 rounded-2xl shadow-3xl'>
                    <div className='text-center'>

                        <Link to={`/team-memmber-profile/${props.name}`} className='inline-block'>
                            <img src={props.profile} alt='abute' className='w-40 h-40 rounded-full border-2 border-green-500 p-1.5 mx-auto' />
                        </Link>
                        <div className='flex justify-center items-center gap-4 mt-4 text-green-500'>
                            <Link to={props.emaillink} className="hover:translate-y-[-5px] hover:text-green-700 dark:hover:hover:text-orange-400 transition-transform duration-500">
                                <HiOutlineMail className="size-6" />
                            </Link>
                            <Link to={props.linkedinlink} className="hover:translate-y-[-5px] hover:text-green-700 dark:hover:hover:text-orange-400 transition-transform duration-500">
                                <FiLinkedin className="size-6" />
                            </Link>
                            <Link to={props.weblink} className="hover:translate-y-[-5px] hover:text-green-700 dark:hover:hover:text-orange-400 transition-transform duration-500">
                                <HiOutlineGlobeEuropeAfrica className="size-6" />
                            </Link>
                        </div>
                        
                        {/* Name and Position */}
                        <Link to={`/team-memmber-profile/${props.name}`} className='block bg-gray-500 dark:bg-slate-700 text-base px-4 py-2 mt-4 space-y-4 rounded-full hover:rounded-xl transition-all ease-in-out duration-200'>
                            <div className='text-white font-medium text-base'>{props.name}</div>
                            <div className='text-slate-200 text-sm'>{props.positionTitle}</div>
                        </Link>

                        {/* Quick Info */}
                        <div className='dark:text-slate-200 justify-center text-sm leading-6 h-40 mt-6 line-clamp-6'>{(props.quickInfo).slice(0,250)} ...</div>

                    </div>
                </div>
            </div>
    )
}

