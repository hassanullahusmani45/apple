import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import articleImage from "../../assets/post1.webp"
import { HiMiniMagnifyingGlass, HiOutlineShieldExclamation } from 'react-icons/hi2';
import { IoFolderOpen } from "react-icons/io5";
import ArticleCard from '../../components/ArticleCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import { FaFilter } from "react-icons/fa6";
import type { Article } from '../../types/type';
import ArticlesSkeleton from '../../components/skeleton/ArticlesSkeleton';
import { useTranslation } from 'react-i18next';
import { localizedNumber } from '../../utils/localizedNumber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function Articles() {
    const { articles, loading } = useAppSelector((state) => state.home);
    const { t } = useTranslation("main")


    const [filterArticles, setFilterArticles] = useState<Article[]>([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchValue, setSearchValue] = useState('');
    const articlesBody = useRef(null)

    useLayoutEffect(() => {
        if (!filterArticles.length || loading) return;
        const ctx = gsap.context(() => {
            gsap.set(".article-item", { opacity: 0, y: 100 });
            ScrollTrigger.batch(".article-item", {
                interval: 0.2,
                onEnter: batch =>
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.18,
                        duration: 0.8,
                        ease: 'bounce.out',
                    }),
                onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 100, duration: 0.6 }),
                start: "top 90%",
            });

            ScrollTrigger.refresh();
        }, [articlesBody]);

        return () => ctx.revert();
    }, [filterArticles]);

    useEffect(() => {
        switch (filterStatus) {
            case "all": {
                const allPopular = [...articles]
                    .sort((a, b) => a.title.localeCompare(b.title));
                setFilterArticles(allPopular);
                break;
            }
            case "mostPopular": {
                const mostPopular = [...articles]
                    .sort((a, b) => b.view_count - a.view_count);
                setFilterArticles(mostPopular);
                break;
            }
            case "old": {
                const oldArticles = [...articles].reverse();
                setFilterArticles(oldArticles);
                break;
            }
            case "new": {
                setFilterArticles(articles);
                break;
            }
            case "security": {
                const security = articles.filter(article => article.category_id === 1)

                setFilterArticles(security);
                break;
            }
            case "frontend": {
                const frontend = articles.filter(article => article.category_id === 2)
                setFilterArticles(frontend);
                break;
            }
            case "backend": {
                const backend = articles.filter(article => article.category_id === 3)

                setFilterArticles(backend);
                break;
            }
            case "artificialIntelligence": {
                const artificialIntelligence = articles.filter(article => article.category_id === 4)

                setFilterArticles(artificialIntelligence);
                break;
            }

            default:
                setFilterArticles(articles);
                break;
        }
    }, [filterStatus, articles])


    const searchHandler = () => {
        const search = articles.filter(article => article.title.toLowerCase().includes(searchValue));
        setFilterArticles(search);
        setSearchValue("")

    }


    return (<>

        <div>

            <div className='flex justify-between items-center mb-3 px-4'>
                <div className='text-xl md:text-2xl font-semibold'>{t("Total Articles")}</div>
                <div className='font-bold text-sm md:text-lg text-green-500'> <span className='bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md'>{localizedNumber(filterArticles.length)}</span> <span className='text-slate-700 dark:text-slate-200 text-sm md:text-base font-semibold'>{t("Filtered Articles")}</span></div>
            </div>


            <div className='grid grid-cols-12 gap-2'>

                <div className='col-span-12 lg:col-span-4 xl:col-span-3'>
                    <div className="grid grid-cols-12 gap-2 lg:gap-y-10">
                        <div className="col-span-12 md:col-span-6 lg:col-span-12 md:order-2 lg:order-1">
                            <div className="relative bg-slate-800 rounded-full overflow-hidden">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <HiMiniMagnifyingGlass className='size-6' />
                                </div>
                                <input type="text" id="search" placeholder={t("Search articles ...")}
                                    className="block border-none outline-none bg-slate-200 dark:bg-slate-800 w-full py-3.5 md:py-4 ps-10 pe-24 text-xs md:text-sm placeholder:italic placeholder:text-slate-700 dark:placeholder:text-slate-300 placeholder:text-sm"
                                    required autoComplete='off' onChange={(event) => { setSearchValue(event.target.value.toLowerCase()) }} value={searchValue} />
                                <button type="button" onClick={searchHandler}
                                    className="absolute bottom-1.5 end-1.5 md:end-2.5 md:bottom-2.5 text-white bg-teal-600 dark:bg-teal-700 hover:bg-teal-500 dark:hover:bg-teal-900 font-medium rounded-full text-sm px-4 py-1.5 md:py-2">{t("Search")}</button>
                            </div>
                        </div>

                        <div className='col-span-12  md:col-span-6 lg:col-span-12 md:order-1 lg:order-2 bg-slate-200 dark:bg-slate-800 p-4 rounded-xl'>
                            <div className='flex justify-start items-center gap-2 font-semibold text-sm md:text-lg'><IoFolderOpen className='size-5.5 md:size-7' />{t("Article categories")}</div>
                            <div className='mt-4 md:mt-6 ms-3 space-y-2 md:space-y-5'>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "frontend"} id="frontend" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("frontend")} />
                                    <label htmlFor="frontend" className={`ms-2 text-sm font-medium md:font-semibold ${filterStatus == "frontend" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>{t("Frontend")}</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "backend"} id="backend" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("backend")} />
                                    <label htmlFor="backend" className={`ms-2 text-sm font-medium md:font-semibold ${filterStatus == "backend" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>{t("Backend")}</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "artificialIntelligence"} id="artificialIntelligence" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("artificialIntelligence")} />
                                    <label htmlFor="artificialIntelligence" className={`ms-2 text-sm font-medium md:font-semibold ${filterStatus == "artificialIntelligence" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>{t("Artificial intelligence")}</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "security"} id="security" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("security")} />
                                    <label htmlFor="security" className={`ms-2 text-sm font-medium md:font-semibold ${filterStatus == "security" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>{t("Security")}</label>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>



                <div className='col-span-12 lg:col-span-8 xl:col-span-9'>
                    <div className='flex justify-between sm:justify-start items-center rounded-xl bg-slate-200 dark:bg-slate-800 px-2 md:px-4 sm:gap-8'>
                        <div className='flex justify-start items-center sm:me-8 py-2.5 md:py-3 gap-x-1'>
                            <FaFilter className='size-5 md:size-6' />
                            <div className='text-lg font-semibold hidden md:block'>{t("Filter Articles By")} :</div>
                            <div className='text-base font-semibold block md:hidden'>{t("Filter By")}:</div>
                        </div>
                        <div onClick={() => { setFilterStatus("all") }} className={`text-sm md:text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "all" ? "text-teal-500 border-y-2 border-teal-600 py-2.5 md:py-3" : "text-slate-600 dark:text-slate-400"}`}>{t("All")}</div>
                        <div onClick={() => { setFilterStatus("mostPopular") }} className={`text-sm md:text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "mostPopular" ? "text-teal-500 border-y-2 border-teal-600 py-2.5 md:py-3" : "text-slate-600 dark:text-slate-400"}`}>{t("Most popular")}</div>
                        <div onClick={() => { setFilterStatus("new") }} className={`text-sm md:text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "new" ? "text-teal-500 border-y-2 border-teal-600 py-2.5 md:py-3" : "text-slate-600 dark:text-slate-400"}`}>{t("Newest")}</div>
                        <div onClick={() => { setFilterStatus("old") }} className={`text-sm md:text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "old" ? "text-teal-500 border-y-2 border-teal-600 py-2.5 md:py-3" : "text-slate-600 dark:text-slate-400"}`}>{t("Oldest")}</div>
                    </div>

                    {loading ? (<ArticlesSkeleton />) :
                        (
                            <div ref={articlesBody} className='grid grid-cols-12 gap-4 my-10 w-[85%] sm:w-full mx-auto'>

                                {filterArticles.length > 0 ? (
                                    filterArticles.map(({ id, cover_image, team_members, created_at, title, summary, view_count }) => (
                                        <div key={id} className='article-item col-span-12 sm:col-span-6 xl:col-span-4'>
                                            <ArticleCard
                                                src={cover_image || articleImage}
                                                author={`${team_members.first_name} ${team_members.last_name}`}
                                                authorID={team_members.id}
                                                date={created_at.slice(0, 10)}
                                                link={`/article/${encodeURIComponent(title)}/${id}`}
                                                title={title}
                                                desc={summary || ''}
                                                viewCount={view_count}
                                                className="bg-slate-200 dark:bg-slate-800 shadow-md shadow-slate-300 dark:shadow-slate-950"
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className='col-span-12 bg-yellow-500 dark:bg-yellow-400/80 rounded-xl'>
                                        <div className='flex justify-center items-center w-full h-40 sm:h-56 p-4 gap-3'>
                                            <HiOutlineShieldExclamation className='size-14 lg:size-20' />
                                            <div className='font-bold font-serif text-xl lg:text-2xl text-gray-800 dark:text-slate-100'>{t("ArticleNotFound")}</div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}


                </div>

            </div>
        </div>
    </>
    )
}
