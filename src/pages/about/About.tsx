import { Link } from 'react-router-dom'
import aboutImage from '../../assets/about.png'
import { useAppSelector } from '../../hooks/reduxHooks'
import LandingCounterSection from '../../components/LandingCounterSection'
import TeamMemmberCard from '../../components/TeamMemmberCard';


export default function About() {

    const { teamMembers, loading } = useAppSelector((state) => state.home);
    const { teamMembers: countTeamMembers, articles, subscribers, loading: countLoading } = useAppSelector(state => state.stats)

    return (
        <>
            {countLoading || loading ?
                (<div className='w-full h-[40vh] flex justify-center items-center text-4xl font-extrabold'>
                    loading ...
                </div>) :
                (<div className='overflow-hidden'>
                    <div className='grid grid-cols-2 gap-20'>
                        <div className='col-span-1'>
                            <img src={aboutImage} alt='abute' className=' bg-cover w-full' />
                        </div>
                        <div className='col-span-1 mt-32'>
                            <div className='text-2xl font-semibold leading-10'>Apple The Best<br /> Place For learning Articles</div>
                            <div className='mt-5 mb-16 pl-6 text-slate-900 dark:text-slate-200 leading-7'>
                                Apple is the best place for learning articles, offering insightful and high-quality content to help you stay ahead in technology and beyond. Whether you are a beginner or an expert, our articles are designed to inspire and educate, empowering you to expand your knowledge and skills.
                            </div>
                            <Link to='/contact-us' className='button-style w-fit'>Contact Us</Link>
                        </div>
                    </div>

                    <div className='mt-40 text-center font-semibold text-xl'>Our Experienced Team</div>
                    <div className='w-1/4 mx-auto mt-4 border-t-2 border-dotted border-teal-300 ' ></div>

                    <div className='grid grid-cols-4 gap-6 mt-16 pb-16'>

                        {teamMembers.map(({ id, profile, emaillink, linkedinlink, weblink, first_name, last_name, position, info }) => (
                            <div key={id} className='col-span-1'>
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




                    <div className='mt-20 text-center font-semibold text-xl'>Surprise Information About Our Web Site</div>
                    <div className='w-1/3 mx-auto mt-4 border-t-2 border-dotted border-teal-300 ' ></div>

                    <div className=' grid grid-cols-3 pb-12 mt-12 '>
                        <LandingCounterSection
                            teamMembers={countTeamMembers}
                            articles={articles}
                            subscribers={subscribers}
                        />
                    </div>

                </div>)
            }
        </>
    )
}
