import { HiOutlineAcademicCap, HiOutlineClipboardDocumentList, HiOutlineUsers } from 'react-icons/hi2';
import LandingCounter from './LandingCounter';
import type { LandingCounterSectionProps } from '../types/type';
import { useTranslation } from 'react-i18next';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';


export default function LandingCounterSection({ teamMembers, articles, subscribers }: LandingCounterSectionProps) {
    const { t } = useTranslation("main");


    useGSAP(() => {
        gsap.set(".landing-count", { opacity: 0, scale: 0, y: -100 });
        ScrollTrigger.batch(".landing-count", {
            interval: 0.3,
            batchMax: 7,
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'back'
            }),
            onLeaveBack: batch => gsap.to(batch, {
                scale: 0,
                y: -100,
                opacity: 0,
                duration: 0.8
            }),
            start: "buttom 100%",
        });
    }, []);

    return (
        <>
            <div className='landing-count flex flex-col justify-center items-center'>
                <HiOutlineUsers className='size-9 md:size-12 mb-1 md:mb-3' />
                <LandingCounter count={teamMembers} />
                <div className='text-sm md:text-base font-semibold'>{t("Team Members")}</div>
            </div>
            <div className='landing-count flex flex-col justify-center items-center'>
                <HiOutlineClipboardDocumentList className='size-9 md:size-12 mb-1 md:mb-3' />
                <LandingCounter count={articles} />
                <div className='text-sm md:text-base font-semibold'>{t("Total Articles")}</div>
            </div>
            <div className='landing-count flex flex-col justify-center items-center'>
                <HiOutlineAcademicCap className='size-9 md:size-12 mb-1 md:mb-3' />
                <LandingCounter count={subscribers} />
                <div className='text-sm md:text-base font-semibold'>{t("Users")}</div>
            </div>
        </>
    )
}
