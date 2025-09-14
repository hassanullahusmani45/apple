
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import ArticleCardSkeleton from '../ArticleCardSkeleton';

export default function NewArticlesSkeleton() {
    return (
        <div className="mt-10 md:mt-20 animate-pulse">


            <div className='mt-10 md:mt-20 flex justify-between items-center'>
                <div className='w-full'>
                    <div className="flex justify-start items-center gap-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        <div className="w-[11rem] h-4 md:h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                    <div className="mt-2 w-[15rem] h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className='flex justify-center items-center gap-2'>

                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
            </div>
            <div className='w-[85%] sm:w-full mx-auto py-8'>
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 1500,
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
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <ArticleCardSkeleton />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    )
}
