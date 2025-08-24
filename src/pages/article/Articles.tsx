import { useEffect, useState } from 'react'
import articleImage from "../../assets/post1.webp"
import { HiMiniMagnifyingGlass, HiOutlineShieldExclamation } from 'react-icons/hi2';
import { IoFolderOpen } from "react-icons/io5";
import ArticleCard from '../../components/ArticleCard';
import { useAppSelector } from '../../hooks/reduxHooks';
import { FaFilter } from "react-icons/fa6";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import type { Article } from '../../types/type';

export default function Articles() {
    const { articles, loading } = useAppSelector((state) => state.home);
    const [articlesBody] = useAutoAnimate<HTMLDivElement>();



    const [filterArticles, setFilterArticles] = useState<Article[]>([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchValue, setSearchValue] = useState('');



    useEffect(() => {
        switch (filterStatus) {
            case "all": {
                setFilterArticles(articles);
                break;
            }
            case "mostPopular": {
                const mostPopular = [...articles]
                    .sort((a, b) => b.view_count - a.view_count);
                setFilterArticles(mostPopular);
                break;
            }
            case "new": {
                const newArticles = [...articles].reverse();
                setFilterArticles(newArticles);
                break;
            }
            case "old": {
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
        {loading ? <div className='w-full h-[40vh] flex justify-center items-center text-7xl font-extrabold'>loading</div> :
            <div>

                <div className='flex justify-between items-center mb-10 px-4'>
                    <div className='text-2xl font-semibold'>Total Articles</div>
                    <div className='font-bold text-lg text-green-500'> <span className='bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-md'>{filterArticles.length}</span> <span className='text-slate-700 dark:text-slate-200 text-base font-semibold'>Filtered Articles</span></div>
                </div>


                <div className='grid grid-cols-12 gap-x-2'>


                    <div className='col-span-3'>
                        <div className="relative bg-slate-800 rounded-full overflow-hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <HiMiniMagnifyingGlass className='size-6' />
                            </div>
                            <input type="text" id="search" placeholder="Search articles ..."
                                className="block border-none outline-none bg-slate-200 dark:bg-slate-800 w-full py-4 ps-12 pe-24 text-sm  dark:placeholder:text-slate-300 placeholder:text-sm"
                                required autoComplete='off' onChange={(event) => { setSearchValue(event.target.value.toLowerCase()) }} value={searchValue} />
                            <button type="button" onClick={searchHandler}
                                className="absolute end-2.5 bottom-2.5 text-white bg-teal-600 dark:bg-teal-700 hover:bg-teal-500 dark:hover:bg-teal-900 font-medium rounded-full text-sm px-4 py-2">Search</button>
                        </div>

                        <div className='bg-slate-200 dark:bg-slate-800 p-4 rounded-xl my-10'>
                            <div className='flex justify-start items-center gap-2 font-medium text-xl'><IoFolderOpen className='size-7' /> Article categories</div>
                            <div className='mt-6 ms-3 space-y-5'>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "frontend"} id="frontend" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("frontend")} />
                                    <label htmlFor="frontend" className={`ms-2 text-sm font-semibold ${filterStatus == "frontend" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>Frontend</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "backend"} id="backend" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("backend")} />
                                    <label htmlFor="backend" className={`ms-2 text-sm font-semibold ${filterStatus == "backend" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>Backend</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "artificialIntelligence"} id="artificialIntelligence" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("artificialIntelligence")} />
                                    <label htmlFor="artificialIntelligence" className={`ms-2 text-sm font-semibold ${filterStatus == "artificialIntelligence" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>Artificial intelligence</label>
                                </div>
                                <div className="flex items-center">
                                    <input checked={filterStatus === "security"} id="security" type="checkbox" className="w-3 h-3" onChange={() => setFilterStatus("security")} />
                                    <label htmlFor="security" className={`ms-2 text-sm font-semibold ${filterStatus == "security" ? "text-teal-400" : "text-slate-700 dark:text-white/50"}`}>Security</label>
                                </div>
                            </div>

                        </div>

                    </div>



                    <div className='col-span-9'>
                        <div className='flex justify-start items-center rounded-xl bg-slate-200 dark:bg-slate-800 px-4 gap-8'>
                            <div className='flex justify-start items-center me-8  py-3'>
                                <FaFilter className='size-6 me-1' />
                                <div className='text-lg font-semibold'>Filter Articles By :</div>
                            </div>
                            <div onClick={() => { setFilterStatus("all") }} className={`text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "all" ? "text-teal-500 border-y-2 border-teal-600 py-3" : "text-slate-600 dark:text-slate-400"}`}>All</div>
                            <div onClick={() => { setFilterStatus("mostPopular") }} className={`text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "mostPopular" ? "text-teal-500 border-y-2 border-teal-600 py-3" : "text-slate-600 dark:text-slate-400"}`}>Most popular</div>
                            <div onClick={() => { setFilterStatus("new") }} className={`text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "new" ? "text-teal-500 border-y-2 border-teal-600 py-3" : "text-slate-600 dark:text-slate-400"}`}>Newest</div>
                            <div onClick={() => { setFilterStatus("old") }} className={`text-base cursor-pointer font-semibold px-1.5 ${filterStatus == "old" ? "text-teal-500 border-y-2 border-teal-600 py-3" : "text-slate-600 dark:text-slate-400"}`}>Oldest</div>
                        </div>

                        <div className='grid grid-cols-3 gap-4 my-10 overflow-hidden' ref={articlesBody}>

                            {filterArticles.length > 0 ? (
                                filterArticles.map((allArticle, index) => (
                                    <div key={index} className='col-span-1'>
                                        <ArticleCard
                                            src={allArticle.cover_image || articleImage}
                                            author={allArticle.authorName}
                                            date={allArticle.created_at && (allArticle.created_at).slice(0, 10)}
                                            link={`/article/${allArticle.title}`}
                                            title={allArticle.title}
                                            desc={allArticle.summary}
                                            viewCount={allArticle.view_count}
                                            className="bg-slate-200 dark:bg-slate-800 shadow-md shadow-slate-300 dark:shadow-slate-950"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className='col-span-3 bg-yellow-500 dark:bg-yellow-400/80 rounded-xl'>
                                    <div className='flex justify-evenly items-center w-full h-56'>
                                        <HiOutlineShieldExclamation className='size-24' />
                                        <div className='font-bold font-serif text-2xl text-gray-800 dark:text-slate-200'>This Category Article Is Not Found !</div>
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        }
    </>
    )
}
