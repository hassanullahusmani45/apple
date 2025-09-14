import ArticleCardSkeleton from "../ArticleCardSkeleton";

export default function AllArticlesSkeleton() {
    return (
        <div className="mt-10 md:mt-20 animate-pulse">
            <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[10rem] h-4 md:h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="mt-2 w-[14rem] h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>

            <div className='w-[85%] sm:w-full mx-auto grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 2xl:gap-8 my-10'>

                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 my-3 sm:my-0'>
                        <ArticleCardSkeleton />
                    </div>
                ))}

            </div>
        </div>
    )
}
