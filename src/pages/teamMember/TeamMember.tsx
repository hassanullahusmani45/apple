import { useParams, useNavigate } from 'react-router-dom'
import TeamMemberSidebar from '../../components/TeamMemberSidebar';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { fetcheTeamMemberData } from '../../redux/slices/teamMember/teamMemberSlice';
import ArticleCard from '../../components/ArticleCard';
import articleImage from '../../assets/post1.webp';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { MdWavingHand } from 'react-icons/md';
import TeamMemberSkeleton from '../../components/skeleton/TeamMemberSkeleton';


export default function TeamMember() {

    const { id } = useParams();
    const [fetchDone, setFetchDone] = useState(false);
    const navigate = useNavigate();
    const [teamMemberBody] = useAutoAnimate<HTMLDivElement>();

    const dispatch = useAppDispatch();
    const { author, teamMemberArticles, loading, savedID } = useAppSelector(state => state.teamMember);

    useEffect(() => {
        if (id && savedID !== id) {
            dispatch(fetcheTeamMemberData(id)).finally(() => setFetchDone(true));
        }
        if (savedID === id) {
            setFetchDone(true);
        }
    }, [id, savedID, dispatch]);

    useLayoutEffect(() => {
        if (fetchDone && author === null) {
            navigate('/not-found');
        }
    }, [author, fetchDone, navigate]);



    return (
        <div className=''>
            {loading ? (<TeamMemberSkeleton />) :
                (
                    <div ref={teamMemberBody} className='grid grid-cols-12 gap-8 sm:gap-x-2 mb-16'>

                        {author && fetchDone &&
                            <>
                                {/* TeamMember information */}
                                <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:mx-0 2xl:mx-10 ">
                                    <TeamMemberSidebar author={author!} />
                                </div>


                                <div className='col-span-12 md:col-span-7 lg:col-span-8 p-4 md:p-6 lg:p-8 rounded-xl bg-slate-200 dark:bg-slate-800'>
                                    <div className=''>
                                        <div className='flex items-center justify-start gap-2 text-xl mb-5 lg:my-8'>
                                            Hi there! I’m
                                            <div className="font-serif font-semibold">{author?.first_name} {author?.last_name}</div>
                                            <MdWavingHand className='size-5 text-green-500 dark:text-orange-400' />
                                        </div>
                                        <div className='text-base text-slate-800 dark:text-slate-300'>{author?.info}</div>
                                    </div>

                                    <div className='grid grid-cols-12 gap-4 w-[85%] xl:w-[85%] 2xl:w-full sm:w-full mx-auto my-8'>
                                        {teamMemberArticles.map(article => (
                                            <div className=" col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-6 2xl:col-span-4">
                                                <ArticleCard
                                                    key={article.id}
                                                    src={article.cover_image || articleImage}
                                                    author={`${article.team_members?.first_name} ${article.team_members?.last_name}`}
                                                    authorID={article.team_members?.id}
                                                    date={article.created_at?.slice(0, 10)}
                                                    link={`/article/${encodeURIComponent(article.title)}`}
                                                    title={article.title}
                                                    desc={article.summary || ''}
                                                    viewCount={article.view_count}
                                                    className="bg-slate-100 dark:bg-slate-700"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                )}
        </div>
    )
}
