import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from "swiper/types";

import { MdOutlineWhatshot } from 'react-icons/md';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { HiInboxStack, HiMiniSquare3Stack3D, HiSparkles } from 'react-icons/hi2';
import { useAppSelector } from '../../hooks/reduxHooks';
import TeamMemmberCard from '../../components/TeamMemmberCard';
import hassanProfile from '../../../public/assets/hassan.jpeg';
import articleImage from '../../../public/assets/post1.webp';
import ArticleCard from '../../components/ArticleCard';
import SearchBar from '../../components/SearchBar';
import CategoryCount from '../../components/CategoryCount';
import LandingCounterSection from '../../components/LandingCounterSection';
import LandingCounterSkeleton from '../../components/skeleton/LandingCounterSkeleton';
import CategoryCountSkeleton from '../../components/skeleton/CategoryCountSkeleton';
import TeamMembersSkeleton from '../../components/skeleton/homepage/TeamMembersSkeleton';
import AllArticlesSkeleton from '../../components/skeleton/homepage/AllArticlesSkeleton';
import NewArticlesSkeleton from '../../components/skeleton/homepage/NewArticlesSkeleton';


export default function Home() {
  const { teamMembers, articles, newArticles, loading } = useAppSelector((state) => state.home);

  const { teamMembers: countTeamMembers, articles: countArticles, subscribers: countSubscribers, loading: countLoading } = useAppSelector(state => state.stats)

  const { loading: categoryLoading } = useAppSelector(state => state.categoryCount);

  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  return (
    <div>
      {/*start heading part  */}
      <div className='flex flex-col justify-center items-center pt-10 md:pt-16 lg:pt-20'>

        <div className='text-2xl md:text-3xl font-bold font-serif text-center bg-gradient-to-r from-green-600 dark:from-orange-500 to-orange-500 dark:to-green-500 bg-clip-text text-transparent'>
          <div className=" mb-2 md:mb-4"> Apple Tecnology</div>
          <div className="">The Best Place For Lernig Articles</div>
        </div>
        <SearchBar articles={articles} />

        <div className='grid grid-cols-3 gap-x-6 lg:w-1/2'>
          {countLoading ?
            (
              Array.from({ length: 3 }).map((_, index) => (
                <LandingCounterSkeleton key={index} />
              ))
            )
            :
            <LandingCounterSection
              teamMembers={countTeamMembers}
              articles={countArticles}
              subscribers={countSubscribers}
            />
          }
        </div>


      </div>
      {/* end heading part  */}

      <main className=''>

        {/* start team members part  */}


        {loading ? <TeamMembersSkeleton /> : (
          <>
            <div className='mt-20 md:mt-28 text-start font-semibold text-base md:text-xl text-teal-500'><HiSparkles className='inline size-6 md:size-8 text-green-500' /> Our Experienced Team</div>
            <div className='w-[300px] mt-1 border-t-2 border-dotted border-teal-300'></div>
            <div className='w-[85%] sm:w-full mx-auto py-8'>
              <Swiper
                modules={[Autoplay]}
                loop={teamMembers.length >= 4}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 2, spaceBetween: 40 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                  1280: { slidesPerView: 4, spaceBetween: 20 },
                  1536: { slidesPerView: 4, spaceBetween: 40 },
                }}
              >
                {teamMembers.map(({ id, profile, emaillink, linkedinlink, weblink, first_name, last_name, position, info }) => (
                  <SwiperSlide key={id}>
                    <TeamMemmberCard
                      id={id}
                      profile={profile || hassanProfile}
                      emaillink={emaillink}
                      linkedinlink={linkedinlink}
                      weblink={weblink}
                      name={`${first_name}  ${last_name}`}
                      positionTitle={position || ''}
                      quickInfo={info}
                    />
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>
          </>
        )}
        {/* end team members part  */}





        {/* start all articles */}
        {loading ? <AllArticlesSkeleton /> : (
          <>
            <div className='mt-10 md:mt-20 text-start font-semibold text-base md:text-xl text-fuchsia-500'><HiInboxStack className='inline size-6 md:size-8 text-violet-500' />All Articles</div>
            <div className='w-[150px] mt-1 border-t-2 border-dotted border-fuchsia-300 '></div>

            <div className='w-[85%] sm:w-full mx-auto grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 2xl:gap-8 my-10'>

              {articles.map(({ id, cover_image, team_members, created_at, title, summary, view_count }) => (
                <div key={id} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 my-3 sm:my-0'>
                  <ArticleCard
                    src={cover_image || articleImage}
                    author={`${team_members.first_name} ${team_members.last_name}`}
                    authorID={team_members.id}
                    date={created_at.slice(0, 10)}
                    link={`/article/${encodeURIComponent(title)}`}
                    title={title}
                    desc={summary || ''}
                    viewCount={view_count}
                    className="bg-slate-200 dark:bg-slate-800"
                  />
                </div>
              ))}

            </div>
          </>
        )}
        {/* end all articles */}





        {/* start category part  */}
        {categoryLoading ? <CategoryCountSkeleton /> : (
          <>
            <div className='mt-16 md:mt-28 text-start font-semibold text-base md:text-xl text-sky-500'><HiMiniSquare3Stack3D className='inline size-6 md:size-8 text-blue-500' />Numbers of the categories articles</div>
            <div className='w-[350px] mt-1 border-t-2 border-dotted border-sky-300'></div>
            <CategoryCount />
          </>
        )}
        {/* end category part  */}





        {/* start new articles part  */}
        {loading ? <NewArticlesSkeleton /> : (
          <>
            <div className='mt-10 md:mt-20 flex justify-between items-center'>
              <div className='w-full'>
                <div className='text-start font-semibold text-base md:text-xl text-emerald-500'><MdOutlineWhatshot className='inline size-6 md:size-8 text-green-500' />New Articles</div>
                <div className='w-[170px] mt-1 border-t-2 border-dotted border-emerald-300 '></div>
              </div>

              <div className='flex justify-center items-center gap-2'>
                <span className='p-1 md:p-2 bg-green-500 rounded-full hover:bg-green-700 transition-colors cursor-pointer' onClick={handlePrev}><FiChevronLeft className='size-6 md:size-7 text-white' /></span>
                <span className='p-1 md:p-2 bg-green-500 rounded-full hover:bg-green-700 transition-colors cursor-pointer' onClick={handleNext}><FiChevronRight className='size-6 md:size-7 text-white' /></span>
              </div>
            </div>

            <div className='w-[85%] sm:w-full mx-auto py-8'>
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                loop={newArticles.length >= 4}
                className="mySwiper"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 2, spaceBetween: 40 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                  1280: { slidesPerView: 4, spaceBetween: 20 },
                  1536: { slidesPerView: 4, spaceBetween: 40 },
                }}
              >
                {newArticles.map(({ id, cover_image, team_members, created_at, title, summary, view_count }) => (
                  <SwiperSlide key={id}>
                    <ArticleCard
                      src={cover_image || articleImage}
                      author={`${team_members.first_name} ${team_members.last_name}`}
                      authorID={team_members.id}
                      date={created_at.slice(0, 10)}
                      link={`/article/${encodeURIComponent(title)}`}
                      title={title}
                      desc={summary || ''}
                      viewCount={view_count}
                      className="bg-slate-200 dark:bg-slate-800 shadow-md shadow-slate-300 dark:shadow-slate-950 my-4"
                    />
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>
          </>
        )}
        {/* end new articles part  */}




        {/* start Discription abute site articles */}

        <div className='mt-10 md:mt-20 text-center font-semibold text-base md:text-2xl text-teal-400'>Why we chose Apple web sit</div>
        <div className=' w-[350px] mx-auto mt-1 border-t-2 border-dotted border-teal-500' ></div>

        <div className='py-8 px-5 md:px-10 leading-8 text-justify text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold'>
          In today is digital age, having a reliable and user-friendly platform is essential for achieving goals efficiently. Apple website has emerged as a top choice for individuals and organizations, offering exceptional features and unmatched performance. Here is why Apple stands out:

          Modern Design: Apple boasts a sleek, intuitive design that ensures easy navigation for all users.
          Speed and Reliability: The site is optimized for fast loading times, ensuring a seamless user experience.
          Mobile Responsiveness: Apple is fully compatible with all devices, from desktops to smartphones.
          Comprehensive Features: It offers tools and resources tailored to diverse needs, be it for education, business, or personal use.
          Security First: Advanced security measures protect user data and provide a safe browsing experience.
          User-Centered Experience: With feedback-driven updates, Apple always prioritizes user satisfaction.
          Offline Support: Innovative offline functionalities make it accessible anytime, anywhere.
          Customizability: Users can personalize their experience to suit their unique preferences.
          Expert Support Team: A responsive and professional team is always ready to assist with any issues.
          Community Engagement: Apple fosters a vibrant community, enabling users to connect, collaborate, and grow together.
          Apple is more than just a website; it is a gateway to achieving your objectives with ease. Its innovative approach and dedication to quality make it the perfect partner for modern digital needs. Whether you are a student, developer, or entrepreneur, Apple is designed to empower you every step of the way.
        </div>

        {/* end Discription abute site articeles */}


      </main>

    </div>
  )
}

