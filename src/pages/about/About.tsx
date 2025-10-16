import { Link } from 'react-router-dom'
import aboutImage from '../../assets/about.png'
import { useAppSelector } from '../../hooks/reduxHooks'
import LandingCounterSection from '../../components/LandingCounterSection'
import TeamMemmberCard from '../../components/TeamMemmberCard';
import AboutSkeleton from '../../components/skeleton/AboutSkeleton';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';


export default function About() {
    const { t } = useTranslation('main')
    const { teamMembers, loading } = useAppSelector((state) => state.home);
    const { teamMembers: countTeamMembers, articles, subscribers, loading: countLoading } = useAppSelector(state => state.stats)

    useLayoutEffect(() => {


        gsap.set(".teamMember-item", { opacity: 0, y: 100 });
        ScrollTrigger.batch(".teamMember-item", {
            interval: 0.3,
            batchMax: 7,
            onEnter: batch => gsap.to(batch, {
                opacity: 1,
                scale: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'back'
            }),
            onLeaveBack: batch => gsap.to(batch, {
                scale: 0.5,
                y: 100,
                opacity: 0,
                duration: 0.8
            }),
            start: "top 75%",
        });

    }, [loading, teamMembers]);

    return (
        <>

            <div className='overflow-x-hidden'>
                <div className='grid grid-cols-2 gap-2 lg:gap-x-10'>
                    <div className='col-span-2 md:col-span-1 flex justify-center items-center'>
                        <img src={aboutImage} alt='abute' className='bg-cover w-[80%] sm:w[60%] md:w-full xl:w-[90%]' />
                    </div>
                    <div className='col-span-2 md:col-span-1 mt-10 lg:mt-32 px-3 sm:p-0'>
                        <div className='text-2xl font-semibold leading-10'>{t("Apple Tecnology The Best")}<br /> {t("Place For learning Articles")}</div>
                        <div className='mt-5 mb-5 lg:mb-16 pl-6 text-slate-900 dark:text-slate-200 leading-7'>
                            {t("apple_info")}
                        </div>
                        <Link to='/contact-us' className='button-style'>{t("Contact Us")}</Link>
                    </div>
                </div>

                {loading || countLoading ? (<AboutSkeleton />) :
                    <>
                        <div className='mt-15 md:mt-20 lg:mt-40 text-center font-semibold text-xl'>{t("Our Experienced Team")}</div>
                        <div className='w-[15rem] rtl:w-[8rem] mx-auto mt-1 border-t-2 border-dotted border-teal-300 ' ></div>

                        <div className='grid grid-cols-12 sm:gap-6 xl:gap-x-3 2xl:gap-x-12 my-8 xl:my-16'>

                            {teamMembers.map(({ id, profile, emaillink, linkedinlink, weblink, first_name, last_name, position, info }) => (
                                <div key={id} className='teamMember-item col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mx-10 sm:m-0'>
                                    <TeamMemmberCard
                                        id={id}
                                        profile={profile}
                                        emaillink={emaillink}
                                        linkedinlink={linkedinlink}
                                        weblink={weblink}
                                        name={`${first_name}  ${last_name}`}
                                        positionTitle={position || ''}
                                        quickInfo={info}
                                    />
                                </div>
                            ))}

                        </div>


                        <div className='mt-15 xl:mt-20 text-center font-semibold text-xl text-nowrap'>{t("Surprise Information About Our Web Site")}</div>
                        <div className='w-[25rem] rtl:w-[20rem] mx-auto mt-1 border-t-2 border-dotted border-teal-300 ' ></div>

                        <div className='flex justify-around items-center lg:w-1/2 my-12 lg:mx-auto'>
                            <LandingCounterSection
                                teamMembers={countTeamMembers}
                                articles={articles}
                                subscribers={subscribers}
                            />
                        </div>
                    </>
                }

            </div>
        </>
    )
}
