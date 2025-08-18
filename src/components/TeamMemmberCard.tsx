import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineGlobeEuropeAfrica } from "react-icons/hi2";
import { FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TeamMemmberCard(props:any) {
    return (
            <div className='transition-all'>
                <div className='flex justify-center items-center bg-slate-800/90 pt-6 px-4 rounded-2xl shadow-3xl'>
                    <div className='text-center'>

                        <Link to={`/team-memmber-profile/${props.name}`} className='inline-block'>
                            <img src={props.profile} alt='abute' className='w-40 h-40 rounded-full border p-1.5 mx-auto' />
                        </Link>
                        <div className='flex justify-center items-center gap-4 mt-4'>
                            <Link to={props.emaillink} className="hover:translate-y-[-5px] hover:text-green-500 transition-transform duration-500">
                                <HiOutlineMail className="size-5" />
                            </Link>
                            <Link to={props.linkedinlink} className="hover:translate-y-[-5px] hover:text-green-500 transition-transform duration-500">
                                <FiLinkedin className="size-5" />
                            </Link>
                            <Link to={props.weblink} className="hover:translate-y-[-5px] hover:text-green-500 transition-transform duration-500">
                                <HiOutlineGlobeEuropeAfrica className="size-6" />
                            </Link>
                        </div>

                        <div className='bg-slate-700 text-base px-4 py-2 mt-4 rounded-full space-y-4 hover:rounded-xl transition-all'>
                            <Link to={`/team-memmber-profile/${props.name}`} className='text-white font-medium text-base'>{props.name}</Link>
                            <div className='text-slate-200 text-sm'>{props.positionTitle}</div>
                        </div>

                        <div className='text-slate-200 justify-center text-sm leading-6 h-40 mt-6 line-clamp-6'>{(props.quickInfo).slice(0,250)} ...</div>

                    </div>
                </div>
            </div>
    )
}

