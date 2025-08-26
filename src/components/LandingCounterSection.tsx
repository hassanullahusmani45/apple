import { HiOutlineAcademicCap, HiOutlineClipboardDocumentList, HiOutlineUsers } from 'react-icons/hi2';
import LandingCounter from './LandingCounter';
import type { LandingCounterSectionProps } from '../types/type';



export default function LandingCounterSection({ teamMembers, articles, subscribers }: LandingCounterSectionProps) {
    return (
        <>
            <div className='col-span-1 flex flex-col justify-center items-center'>
                <HiOutlineUsers className='size-12 mb-3' />
                <LandingCounter count={teamMembers} />
                <div className='text-base font-semibold'>Team Mammbers</div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
                <HiOutlineClipboardDocumentList className='size-12 mb-3' />
                <LandingCounter count={articles} />
                <div className='text-base font-semibold'>Total Articles</div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
                <HiOutlineAcademicCap className='size-12 mb-3' />
                <LandingCounter count={subscribers} />
                <div className='text-base font-semibold'>Users</div>
            </div>
        </>
    )
}
