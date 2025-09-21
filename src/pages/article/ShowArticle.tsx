
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HiBars4, HiSquare2Stack } from "react-icons/hi2";
import { FaCommentSlash, FaEye, FaUser } from "react-icons/fa6";
import { IoCalendarSharp } from "react-icons/io5";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchArticleComments, fetchArticleData } from "../../redux/slices/article/articleSlice";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TeamMemberSidebar from '../../components/TeamMemberSidebar';
import ShowArticleSkeleton from '../../components/skeleton/ShowArticleSkeleton';
import { useTranslation } from 'react-i18next';
import { localizedNumber } from '../../utils/localizedNumber';
import { GoCommentDiscussion } from "react-icons/go";
import { TbMessagePlus } from 'react-icons/tb';
import Comment from '../../components/Comment';
import ResponseComment from '../../components/ResponseComment';
import hassanProfile from '../../assets/hassan.jpeg';
import RHFTextarea from '../../components/form/RHFTextarea';
import { FormProvider, useForm } from 'react-hook-form';
import type z from 'zod';
import { commentSchema } from '../../types/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';


export default function ShowArticle() {
    const { t, i18n } = useTranslation("main");
    const { title, article_id } = useParams<{ title: string, article_id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [articleBody] = useAutoAnimate<HTMLDivElement>();
    const [articleTitles] = useAutoAnimate<HTMLDivElement>();

    const [isTitleOpen, setIsTitleOpen] = useState(true);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [fetchDone, setFetchDone] = useState(false);

    const { article, comments, articleDataLoading, articleCommentsLoading } = useAppSelector((state) => state.article);

    useEffect(() => {
        const fetchData = async () => {
            if (title && article_id) {
                await dispatch(fetchArticleData(title));
                await dispatch(fetchArticleComments(article_id));
                setFetchDone(true);
            }
        };

        fetchData();
    }, [title, article_id, dispatch]);


    useEffect(() => {
        if (fetchDone && article === null) {
            navigate('/not-found');
        }
    }, [article, fetchDone, navigate]);


    // Author
    const author = article?.team_members;

    // article Sections
    const articleSections = article?.article_sections ?? [];

    type commentData = z.infer<typeof commentSchema>

    const methods = useForm<commentData>({
        defaultValues: {
            comment_text: ''
        },
        resolver: zodResolver(commentSchema)
    });

    const onsubmit = (data: commentData) => {
        console.log(data);
        methods.reset();
    }

    console.log("Comments:", comments);

    return (
        <div>
            {(articleDataLoading || articleCommentsLoading) ? (<ShowArticleSkeleton />) : (
                <div className='grid grid-cols-12 gap-8 sm:gap-x-2 mb-16' ref={articleBody}>

                    {/* the autor or this article */}
                    <div className="col-span-12 lg:col-span-4 order-2 lg:order-1 sm:mx-30 lg:mx-0 2xl:mx-10 ">
                        <TeamMemberSidebar author={author!} />
                    </div>

                    <div className='col-span-12 lg:col-span-8 order-1 lg:order-2 rounded-xl p-4 md:p-8 bg-slate-200 dark:bg-slate-800'>
                        <div className='text-xl lg:text-2xl font-bold text-black dark:text-white'>{article?.title}</div>
                        <hr className='border-slate-400 dark:border-slate-600 my-3' />
                        <div className='flex justify-between md:justify-start items-center md:gap-x-16 text-sm text-slate-700 dark:text-slate-400'>
                            <div className='flex justify-center gap-1 md:gap-x-2' ><FaUser className='size-4.5' />{author?.first_name} {author?.last_name}</div>
                            <div className='flex justify-center gap-1 md:gap-x-2' ><IoCalendarSharp className='size-4.5' />{new Date(article?.created_at!).toLocaleDateString(i18n.language == 'dr' ? "fa-AF" : "en-US")}</div>
                            <div className='flex justify-center gap-1 md:gap-x-2' ><FaEye className='size-4.5' />{localizedNumber(article?.view_count || 0)}</div>
                        </div>

                        {/* show the articl cover_img */}
                        <div className=' w-full my-8'>
                            <img className='object-cover w-full aspect-[16/9] max-h-[400px] rounded-xl' src={article?.cover_image}></img>
                        </div>

                        {/* show the Article Siction titles */}
                        <div className=' w-full bg-white dark:bg-slate-900/70 my-8 p-5 rounded-2xl !rounded-tl-none border border-slate-300 dark:border-slate-700/60'>
                            <div className=' flex justify-between items-center'>
                                <div className='flex items-center gap-x-2 text-lg font-semibold text-slate-700 dark:text-slate-100' ><HiBars4 className='size-6 text-black dark:text-white' />{t("Headlines of this article:")}</div>
                                <div onClick={() => setIsTitleOpen(prev => !prev)} className=' p-1 lg:p-1.5 bg-green-500 rounded-full hover:bg-green-600 cursor-pointer transition-all'>
                                    {isTitleOpen ? (<HiChevronDown className='size-5 md:size-6' />) : (<HiChevronUp className='size-5 md:size-6' />)}
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
                                {articleSection.section_img &&
                                    <div className='flex justify-center items-center w-full my-8'>
                                        <img className='object-cover md:w-[80%] xl:w-[70%] aspect-[16/9] rounded-xl' src={articleSection?.section_img}></img>
                                    </div>
                                }
                            </div>
                        ))}

                        {/* start Comments part */}
                        <div className='w-full bg-white dark:bg-slate-900/70 mt-28 px-2 sm:px-3 md:px-5 py-5 rounded border border-slate-300 dark:border-slate-700/60'>
                            <div className='flex justify-between items-center mb-5'>
                                <div className='flex items-center gap-x-2 text-lg font-semibold' >
                                    <GoCommentDiscussion className='size-6 md:size-8 text-sky-500' />
                                    {t("comments")}
                                </div>
                                <div onClick={() => { setIsCommentOpen(true) }} className='flex items-center gap-x-2 text-sm font-medium rounded-md text-white bg-sky-500 p-1 md:p-1.5 cursor-pointer shadow-md shadow-slate-400 dark:shadow-slate-700'>
                                    {t("add-comment")}
                                    <TbMessagePlus className='size-4.5 sm:size-5' />
                                </div>
                            </div>

                            {/* new-comment start */}
                            {isCommentOpen &&
                                <Fragment>
                                    <div className='flex justify-start items-center gap-x-2'>
                                        <div className="relative w-12 md:w-15 h-12 md:h-15 rounded-full bg-inherit p-[1px]">
                                            <div className="absolute inset-0 custom-gradient rounded-full animate-spin-slow"></div>
                                            <img
                                                className="relative w-full h-full rounded-full object-cover bg-slate-50 dark:bg-slate-900"
                                                src={hassanProfile}
                                                alt="commenter-profile"
                                            />
                                        </div>
                                        <div className=''>
                                            <span>hassan ullah usmani</span>
                                            <div className="text-sm">{t("new-comment")}</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <FormProvider {...methods}>
                                            <form onSubmit={methods.handleSubmit(onsubmit)} className='my-3'>
                                                <RHFTextarea
                                                    name='comment_text'
                                                    placeholder={t('comment-pleacholder')}
                                                    rows={4}
                                                    className='dark:bg-slate-700!'
                                                />

                                                <div className="flex justify-end gap-x-3">
                                                    <button
                                                        type='button'
                                                        className='cancel-button px-5!'
                                                        onClick={() => {
                                                            setIsCommentOpen(false);
                                                            methods.reset();
                                                        }}
                                                    >
                                                        {t("cancel")}
                                                    </button>
                                                    <button type='submit' className='success-button'>{t("submit-comment")}</button>
                                                </div>
                                            </form>
                                        </FormProvider>
                                    </div>
                                </Fragment>
                            }

                            {/* new-comment end */}

                            {/* comments  */}
                            <Fragment>
                                {comments.length === 0 ? (
                                    <div className="flex justify-center items-center gap-x-2 text-center py-16 rounded-lg bg-slate-200 dark:bg-slate-700">
                                        <FaCommentSlash className='size-8 text-yellow-700 dark:text-yellow-500' />
                                        <span className='font-semibold text-yellow-600'>{t("no-comments-yet")}</span>
                                    </div>
                                ) : (
                                    comments
                                        .filter(comment => !comment.parent_comment_id)
                                        .map(comment => (
                                            <Comment key={comment.id} comment={comment}>
                                                {comments
                                                    .filter(c => c.parent_comment_id === comment.id)
                                                    .map(response => (
                                                        <ResponseComment key={response.id} responceComment={response} />
                                                    ))
                                                }
                                            </Comment>
                                        ))
                                )}
                            </Fragment>
                            {/* comments */}
                        </div>
                        {/* end Comments part */}

                    </div>

                </div>
            )}
        </div>
    )
}

