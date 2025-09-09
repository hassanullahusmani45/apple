import ArticleCardSkeleton from "./ArticleCardSkeleton";
import TeamMemberSidebarSkeleton from "./TeamMemberSidebarSkeleton";

export default function TeamMemberSkeleton() {
    return (
        <div className="grid grid-cols-12 gap-8 sm:gap-x-2 mb-16 animate-pulse">
            <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:mx-0 2xl:mx-10 ">
                <TeamMemberSidebarSkeleton />
            </div>

            <div className='col-span-12 md:col-span-7 lg:col-span-8 p-4 md:p-6 lg:p-8 rounded-xl bg-slate-200 dark:bg-slate-800'>
                <div className="w-[11rem] h-7 my-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex flex-col justify-start gap-3">
                    <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-[15rem] h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className='grid grid-cols-12 gap-4 w-[85%] xl:w-[85%] 2xl:w-full sm:w-full mx-auto my-8'>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className='col-span-12 sm:col-span-6 md:col-span-12 lg:col-span-6 2xl:col-span-4'>
                            <ArticleCardSkeleton className="bg-slate-300/30! dark:bg-slate-700/50!" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
