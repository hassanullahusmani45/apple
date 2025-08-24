import { Link } from 'react-router-dom'
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TfiEmail } from "react-icons/tfi";
import { LuBicepsFlexed, LuMapPinHouse } from "react-icons/lu";
import { FaHeartPulse } from "react-icons/fa6";
import type { TeamMember } from '../types/type';
import { useAutoAnimate } from '@formkit/auto-animate/react';


type TeamMemberSidebarProps = {
    author: TeamMember;
};

export default function TeamMemberSidebar({ author }: TeamMemberSidebarProps) {
    const [teamMemberSection] = useAutoAnimate<HTMLDivElement>();

    return (
        <div ref={teamMemberSection} className='col-span-2 p-8 rounded-xl bg-slate-200 dark:bg-slate-800 h-fit'>

            <span className='flex justify-center'>
                <span className='relative'>
                    <Link to={`/author-profile/${author?.first_name} ${author?.last_name}`}>
                        <img className=" w-56 h-56 rounded-full p-1.5 border-2 border-green-500 dark:border-orange-300 border-dotted" src={author?.profile} />
                    </Link>
                    <div className='absolute -right-1 bottom-7 p-1.5 bg-white dark:bg-slate-900 rounded-full border border-green-500 dark:border-orange-300'>🎯</div>
                </span>
            </span>
            <div className='space-y-2 text-slate-700 dark:text-slate-300'>
                <div className='text-lg font-semibold my-6 text-slate-800 dark:text-white'>{author?.first_name} {author?.last_name}</div>
                <div className='flex justify-start items-center gap-2 text-slate-600 dark:text-slate-200 font-semibold'>{author?.position} <FaHeartPulse className='size-5 text-red-600' /></div>
                <div className='text-sm'>{author?.biography}</div>
                <div className='flex items-center gap-2 text-sm'><HiOutlineBuildingOffice2 className='size-5 text-black dark:text-white' />{author?.jobplace}</div>
                <div className='flex items-center gap-2 text-sm'><TfiEmail className='size-5 text-black dark:text-white' />{author?.email}</div>
                <div className='flex items-center gap-2 text-sm'><LuMapPinHouse className='size-5 text-black dark:text-white' />{author?.address}</div>
            </div>

            <div className='flex justify-start items-center gap-2 text-lg font-medium mt-6 mb-2 text-slate-900 dark:text-white'>My Skills <LuBicepsFlexed className='size-6 text-green-500 dark:text-orange-400' /> </div>
            <div className='text-sm font-serif text-slate-700 dark:text-slate-300'>{author?.skills}</div>

        </div>
    )
}
