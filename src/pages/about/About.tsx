import { Link } from 'react-router-dom'
import aboutImage from '../../../public/assets/about.png'
import { useAppSelector } from '../../hooks/reduxHooks'
import LandingCounterSection from '../../components/LandingCounterSection'
import TeamMemmberCard from '../../components/TeamMemmberCard';
import AboutSkeleton from '../../components/skeleton/AboutSkeleton';


export default function About() {

    const { teamMembers, loading } = useAppSelector((state) => state.home);
    const { teamMembers: countTeamMembers, articles, subscribers, loading: countLoading } = useAppSelector(state => state.stats)

    return (
        <>

            <div className='overflow-x-hidden'>
                <div className='grid grid-cols-2 gap-2 lg:gap-x-10'>
                    <div className='col-span-2 md:col-span-1 flex justify-center items-center'>
                        <img src={aboutImage} alt='abute' className='bg-cover w-[80%] sm:w[60%] md:w-full xl:w-[90%]' />
                    </div>
                    <div className='col-span-2 md:col-span-1 mt-10 lg:mt-32 px-3 sm:p-0'>
                        <div className='text-2xl font-semibold leading-10'>Apple The Best<br /> Place For learning Articles</div>
                        <div className='mt-5 mb-5 lg:mb-16 pl-6 text-slate-900 dark:text-slate-200 leading-7'>
                            Apple is the best place for learning articles, offering insightful and high-quality content to help you stay ahead in technology and beyond. Whether you are a beginner or an expert, our articles are designed to inspire and educate, empowering you to expand your knowledge and skills.
                        </div>
                        <Link to='/contact-us' className='button-style'>Contact Us</Link>
                    </div>
                </div>

                {loading || countLoading ? (<AboutSkeleton />) :
                    <>
                        <div className='mt-15 md:mt-20 lg:mt-40 text-center font-semibold text-xl'>Our Experienced Team</div>
                        <div className='w-2/3 sm:w-1/2 md:w-1/3  xl:w-1/5 mx-auto mt-1 border-t-2 border-dotted border-teal-300 ' ></div>

                        <div className='grid grid-cols-12 sm:gap-6 xl:gap-x-3 2xl:gap-x-12 my-8 xl:my-16'>

                            {teamMembers.map(({ id, profile, emaillink, linkedinlink, weblink, first_name, last_name, position, info }) => (
                                <div key={id} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mx-10 sm:m-0'>
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


                        <div className='mt-15 xl:mt-20 text-center font-semibold text-xl text-nowrap'>Surprise Information About Our Web Site</div>
                        <div className='w-10/11 md:w-4/6 lg:w-1/2 xl:w-1/3 mx-auto mt-1 border-t-2 border-dotted border-teal-300 ' ></div>

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
