import { HiOutlineAcademicCap, HiOutlineClipboardDocumentList, HiOutlineUsers } from 'react-icons/hi2';
import LandingCounter from './LandingCounter';
import type { LandingCounterSectionProps } from '../types/type';
import { useTranslation } from 'react-i18next';



export default function LandingCounterSection({ teamMembers, articles, subscribers }: LandingCounterSectionProps) {
    const { t } = useTranslation("main")
    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <HiOutlineUsers className='size-9 md:size-12 mb-1 md:mb-3' />
                <LandingCounter count={teamMembers} />
                <div className='text-sm md:text-base font-semibold'>{t("Team Members")}</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <HiOutlineClipboardDocumentList className='size-9 md:size-12 mb-1 md:mb-3' />
                <LandingCounter count={articles} />
                <div className='text-sm md:text-base font-semibold'>{t("Total Articles")}</div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <HiOutlineAcademicCap className='size-9 md:size-12 mb-1 md:mb-3' />
                <LandingCounter count={subscribers} />
                <div className='text-sm md:text-base font-semibold'>{t("Users")}</div>
            </div>
        </>
    )
}
