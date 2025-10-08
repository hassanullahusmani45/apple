import { FaBrain } from 'react-icons/fa'
import { HiOutlineCircleStack, HiOutlineShieldCheck } from 'react-icons/hi2'
import { RiComputerLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchCategoryCount } from '../redux/slices/articleCategoryCount'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { localizedNumber } from '../utils/localizedNumber';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';

export default function CategoryCount() {
    const { t } = useTranslation('main')
    const dispatch = useAppDispatch();
    const { security, frontend, backend, artificialIntelligence, fetched } = useAppSelector((state) => state.categoryCount);


    useEffect(() => {
        if (!fetched) {
            dispatch(fetchCategoryCount());
        }
    }, [dispatch, fetched]);

    useGSAP(() => {
        gsap.set(".article-category", { opacity: 0,scale:0 });
        ScrollTrigger.batch(".article-category", {
            interval: 0.3,
            batchMax: 7,
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                scale:1,
                stagger: 0.2,
                duration: 1,
                ease: 'back'
            }),
            onLeaveBack: batch => gsap.to(batch, {
                scale:0,
                opacity: 0,
                duration: 0.8
            }),
            start: "buttom 100%",
        });
    }, []);
    
    return (


        <div className='grid grid-cols-4 gap-6 lg:gap-2 xl:gap-6 px-8 sm:px-0 py-8 text-white'>

            <Link to={"/articles"} className='article-category col-span-4 sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#3564ff] to-[#62f229] overflow-hidden rounded-xl shadow-md shadow-slate-400'>
                <HiOutlineShieldCheck className='size-12 mb-3' />
                <div className=' font-bold text-lg md:text-xl'>{localizedNumber(security)}</div>
                <div className='text-base font-semibold'>{t("Security")}</div>
            </Link>
            <Link to={"/articles"} className='article-category col-span-4 sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#f1ce59] to-[#f04d75] overflow-hidden rounded-xl  shadow-md shadow-slate-400'>
                <FaBrain className='size-12 mb-3' />
                <div className='font-bold text-lg md:text-xl'>{localizedNumber(artificialIntelligence)}</div>
                <div className='text-base font-semibold'>{t("Artificial intelligence")}</div>
            </Link>
            <Link to={"/articles"} className='article-category col-span-4 sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#5bf0ca] to-[#0b75ee] overflow-hidden rounded-xl shadow-md shadow-slate-400'>
                <RiComputerLine className='size-12 mb-3' />
                <div className=' font-bold text-lg md:text-xl'>{localizedNumber(frontend)}</div>
                <div className='text-base font-semibold'>{t("Frontend")}</div>
            </Link>

            <Link to={"/articles"} className='article-category col-span-4 sm:col-span-2 lg:col-span-1 flex flex-col justify-center items-center py-5 bg-gradient-to-r from-[#9e4bc5] to-[#60d6f3] overflow-hidden rounded-xl shadow-md shadow-slate-400'>
                <HiOutlineCircleStack className='size-12 mb-3' />
                <div className=' font-bold text-lg md:text-xl'>{localizedNumber(backend)}</div>
                <div className='text-base font-semibold'>{t("Backend")}</div>
            </Link>

        </div>
    )
}
