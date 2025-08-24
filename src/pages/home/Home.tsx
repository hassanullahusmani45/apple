import { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Swiper as SwiperType } from "swiper/types";

import { MdOutlineWhatshot } from 'react-icons/md';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { HiInboxStack, HiMiniSquare3Stack3D, HiOutlineAcademicCap, HiOutlineClipboardDocumentList, HiOutlineUsers, HiSparkles } from 'react-icons/hi2';
import LandingCounter from '../../components/LandingCounter';
import { useAppSelector } from '../../hooks/reduxHooks';
import TeamMemmberCard from '../../components/TeamMemmberCard';
import hassanProfile from '../../assets/hassan.png';
import articleImage from '../../assets/post1.webp';
import ArticleCard from '../../components/ArticleCard';
import SearchBar from '../../components/SearchBar';
import CategoryCount from '../../components/CategoryCount';


export default function Home() {
  const { teamMembers, articles, newArticles, loading } = useAppSelector((state) => state.home);

  const { teamMembers: countTeamMembers, articles: countArticles, subscribers: countSubscribers, loading: countLoading, fetched } = useAppSelector(state => state.stats)

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
      <div className='flex flex-col justify-center items-center h-[50vh] pt-32'>

        <div className='text-3xl font-bold font-serif'>Apple Tecnology The Best Place For Lernig Articles</div>
        <div dir='rtl' className=' text-3xl font-bold font-serif mt-4 text-emerald-500'>يَا رَبِّ لَكَ الحَمْدُ كَمَا يَنْبَغِي لِجَلالِ وَجْهِكَ وَعَظِيمِ سُلْطَانِكَ</div>
        <SearchBar articles={articles} />


        <div className='grid grid-cols-3 w-1/2'>
          <div className='col-span-1 flex flex-col justify-center items-center'>
            <HiOutlineUsers className='size-14 mb-3' />
            <LandingCounter count={countTeamMembers} />
            <div className='text-xl font-medium'>Team Mammbers</div>
          </div>
          <div className='col-span-1 flex flex-col justify-center items-center'>
            <HiOutlineClipboardDocumentList className='size-14 mb-3' />
            <LandingCounter count={countArticles} />
            <div className='text-xl font-medium'>Total Articles</div>
          </div>
          <div className='col-span-1 flex flex-col justify-center items-center'>
            <HiOutlineAcademicCap className='size-14 mb-3' />
            <LandingCounter count={countSubscribers} />
            <div className='text-xl font-medium'>Users</div>
          </div>
        </div>

      </div>
      {/* end heading part  */}

      <main className='w-[95%] mx-auto'>

        {/* start SwiperJs part  */}


        {loading ? <div></div> : (
          <>
            <div className='mt-28 text-start font-semibold text-xl text-teal-500'><HiSparkles className='inline size-8 me-2 text-green-500' /> Our Experienced Team</div>
            <div className='w-1/4 mt-2 border-t-2 border-dotted border-teal-300 '></div>
            <div className='py-8'>
              <Swiper
                modules={[Autoplay]}
                slidesPerView={4}
                spaceBetween={40}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="mySwiper"
              >
                {teamMembers.map((teamMember) => (
                  <SwiperSlide key={teamMember.id}>
                    <TeamMemmberCard
                      profile={teamMember.profile || hassanProfile}
                      emaillink={teamMember.emaillink}
                      linkedinlink={teamMember.linkedinlink}
                      weblink={teamMember.weblink}
                      name={`${teamMember.first_name}  ${teamMember.last_name}`}
                      positionTitle={teamMember.position}
                      quickInfo={teamMember.info}
                    />
                  </SwiperSlide>
                ))}

              </Swiper>
            </div>
          </>
        )}
        {/* end SwiperJs part  */}





        {/* start all articles */}
        {loading ? <div></div> : (
          <>
            <div className='mt-28 text-start font-semibold text-xl text-fuchsia-500'><HiInboxStack className='inline size-8 me-2 text-violet-500' />All Articles</div>
            <div className='w-1/4 mt-2 border-t-2 border-dotted border-fuchsia-300 '></div>

            <div className='grid grid-cols-4 gap-4 my-10'>

              {articles.map((article) => (
                <div key={article.id} className='col-span-1'>
                  <ArticleCard
                    src={article.cover_image || articleImage}
                    author={article.authorName}
                    date={article.created_at && (article.created_at).slice(0, 10)}
                    link={`/show-article/${article.title}`}
                    title={article.title}
                    desc={article.summary}
                    viewCount={article.view_count}
                    className="bg-slate-200 dark:bg-slate-800"
                  />
                </div>
              ))}

            </div>
          </>
        )}
        {/* end all articles */}





        {/* start category part  */}
        {categoryLoading ? <div></div> : (
          <>
            <div className='mt-28 text-start font-semibold text-xl text-sky-500'><HiMiniSquare3Stack3D className='inline size-8 me-2 text-blue-500' />Numbers of the categories articles</div>
            <div className='w-1/3 mt-2 border-t-2 border-dotted border-sky-300'></div>
            <CategoryCount />
          </>
        )}
        {/* end category part  */}





        {/* start new articles part  */}
        {loading ? <div></div> : (
          <>
            <div className=' flex justify-between items-center mt-28'>
              <div className='w-full'>
                <div className='text-start font-semibold text-xl text-emerald-500'><MdOutlineWhatshot className='inline size-8 me-2 text-green-500' /> New Articles</div>
                <div className='w-1/4 mt-2 border-t-2 border-dotted border-emerald-300 '></div>
              </div>

              <div className='flex justify-center items-center gap-2'>
                <span className='p-2 bg-green-500 rounded-full hover:bg-green-700 transition-colors cursor-pointer' onClick={handlePrev}><FiChevronLeft className='size-7 font-bold text-white' /></span>
                <span className='p-2 bg-green-500 rounded-full hover:bg-green-700 transition-colors cursor-pointer' onClick={handleNext}><FiChevronRight className='size-7 text-white' /></span>
              </div>
            </div>

            <div className='py-8'>
              <Swiper
                slidesPerView={4}
                spaceBetween={20}
                loop={true}
                className="mySwiper"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {newArticles.map((newArticle) => (
                  <SwiperSlide key={newArticle.id}>
                    <ArticleCard
                      src={newArticle.cover_image || articleImage}
                      author={newArticle.authorName}
                      date={newArticle.created_at && (newArticle.created_at).slice(0, 10)}
                      link={`/show-article/${newArticle.title}`}
                      title={newArticle.title}
                      desc={newArticle.summary}
                      viewCount={newArticle.view_count}
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
        {loading ? <div></div> : (
          <>
            <div className='mt-28 text-center font-semibold text-2xl text-teal-400'>Why we chose Apple web sit</div>
            <div className=' w-1/3 mx-auto mt-2 border-t-2 border-dotted border-teal-500 ' ></div>

            <div className='py-8 leading-8 text-justify text-slate-600 dark:text-slate-300 text-base font-semibold'>
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
          </>
        )}
        {/* end Discription abute site articeles */}


      </main>

    </div>
  )
}

