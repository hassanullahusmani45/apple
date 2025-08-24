
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiBars4, HiOutlineBuildingOffice2, HiSquare2Stack } from "react-icons/hi2";
import { TfiEmail } from "react-icons/tfi";
import { LuBicepsFlexed, LuMapPinHouse } from "react-icons/lu";
import { FaEye, FaHeartPulse, FaUser } from "react-icons/fa6";
import { IoCalendarSharp } from "react-icons/io5";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchArticleData } from "../../redux/slices/article/articleSlice";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function ShowArticle() {
    const { title } = useParams<{ title: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [articleBody] = useAutoAnimate<HTMLDivElement>();
    const [articleTitles] = useAutoAnimate<HTMLDivElement>();

    const [isTitleOpen, setIsTitleOpen] = useState(true)
    const [fetchDone, setFetchDone] = useState(false);

    const { article, loading } = useAppSelector((state) => state.article);

    useEffect(() => {
        if (title) {
            dispatch(fetchArticleData(title)).finally(() => setFetchDone(true));
        }
    }, [title, dispatch]);

    useEffect(() => {
        if (fetchDone && article === null) {
            navigate('/not-found');
        }
    }, [article, fetchDone, navigate]);


    // Author
    const author = article?.team_members;

    // article Sections
    const articleSections = article?.article_sections ?? [];


    return (
        <div>
            {loading ? <div className='w-full h-[40vh] flex justify-center items-center text-4xl font-extrabold'>loading ...</div> : (
                <div className=' grid grid-cols-7 gap-4' ref={articleBody}>
                    <div className='col-span-2 p-8 rounded-xl bg-slate-200 dark:bg-slate-800 h-fit'>

                        <span className='flex justify-center'>
                            <span className='relative'>
                                <Link to={`/team-memmber-profile/${author?.first_name} ${author?.last_name}`}>
                                    <img className=" w-56 h-56 rounded-full p-1.5 border-2 border-green-500 dark:border-orange-300 border-dotted" src={author?.profile} />
                                </Link>
                                <div className='absolute -right-1 bottom-7 p-1.5 bg-white dark:bg-slate-900 rounded-full border border-green-500 dark:border-orange-300'>🎯</div>
                            </span>
                        </span>
                        <div className='space-y-2 text-slate-700 dark:text-slate-300'>
                            <div className='text-lg font-semibold my-6 text-slate-800 dark:text-white'>{author?.first_name} {author?.last_name}</div>
                            <div className='flex justify-start items-center gap-2 text-slate-600 dark:text-slate-200 font-semibold'>{author?.position} <FaHeartPulse className='size-5 text-red-600' /></div>
                            <div className='text-sm'>{author?.biography}</div>
                            <div className='flex items-center gap-2 text-sm'><HiOutlineBuildingOffice2 className='size-5 text-black dark:text-white' />{author?.jobplace}</div>
                            <div className='flex items-center gap-2 text-sm'><TfiEmail className='size-5 text-black dark:text-white' />{author?.email}</div>
                            <div className='flex items-center gap-2 text-sm'><LuMapPinHouse className='size-5 text-black dark:text-white' />{author?.address}</div>
                        </div>

                        <div className='flex justify-start items-center gap-2 text-lg font-medium mt-6 mb-2 text-slate-900 dark:text-white'>My Skills <LuBicepsFlexed className='size-6 text-green-500 dark:text-orange-400' /> </div>
                        <div className='text-sm font-serif text-slate-700 dark:text-slate-300'>{author?.skills}</div>

                    </div>

                    <div className='col-span-5 rounded-xl p-8 bg-slate-200 dark:bg-slate-800'>
                        <div className='text-2xl font-bold text-black dark:text-white'>{article?.title}</div>
                        <hr className='border-slate-400 dark:border-slate-600 my-3' />
                        <div className='flex items-center gap-x-16 text-sm text-slate-700 dark:text-slate-400'>
                            <div className='flex justify-center gap-x-2' ><FaUser className='size-4.5' />{author?.first_name} {author?.last_name}</div>
                            <div className='flex justify-center gap-x-2' ><IoCalendarSharp className='size-4.5' />{article?.created_at.slice(0, 10)}</div>
                            <div className='flex justify-center gap-x-2' ><FaEye className='size-4.5' />{article?.view_count}</div>
                        </div>

                        {/* show the articl cover_img */}
                        <div className=' w-full my-8'>
                            <img className=' bg-cover w-full h-[500px]  rounded-xl' src={article?.cover_image}></img>
                        </div>

                        {/* show the Article Siction titles */}
                        <div className=' w-full bg-white dark:bg-slate-900/70 my-8 p-5 rounded-2xl !rounded-tl-none border border-slate-300 dark:border-slate-700/60'>
                            <div className=' flex justify-between items-center'>
                                <div className='flex items-center gap-x-2 text-lg font-semibold text-slate-700 dark:text-slate-100' ><HiBars4 className='size-6 text-black dark:text-white' />Headlines of this article:</div>
                                <div onClick={() => setIsTitleOpen(prev => !prev)} className=' p-1.5 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer transition-all'>
                                    {isTitleOpen ? (<HiChevronDown className='size-6' />) : (<HiChevronUp className='size-6' />)}
                                </div>
                            </div>

                            {isTitleOpen &&
                                <div ref={articleTitles}>
                                    <hr className='border-slate-300 dark:border-slate-600 my-4' />
                                    <div className='text-sm font-medium space-y-4 mt-4'>
                                        {articleSections.map((articleSection) => (
                                            <a href={"#" + articleSection.section_title} key={articleSection.id} className='flex items-center gap-1 text-slate-700 dark:text-slate-400 hover:text-green-500 transition-all'>
                                                <HiSquare2Stack className='size-5 text-slate-900 dark:text-white' />
                                                {articleSection.section_title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>



                        {/* show the article sections */}
                        {articleSections.map((articleSection) => (
                            <div id={articleSection.section_title} key={articleSection.id}>
                                <div className='text-slate-800 dark:text-slate-50 text-md font-semibold my-8'>{articleSection.section_title}</div>
                                <div className='text-slate-700 dark:text-slate-300/90 text-base font-medium '>{articleSection.section_topic}</div>
                                <div className='flex justify-center items-center w-full my-8'>
                                    <img className='bg-cover w-[70%] rounded-xl' src={articleSection?.section_img}></img>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            )}
        </div>
    )
}

