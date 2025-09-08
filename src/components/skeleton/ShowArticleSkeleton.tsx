import TeamMemberSidebarSkeleton from "./TeamMemberSidebarSkeleton";

export default function ShowArticleSkeleton() {
    return (
        <div className='grid grid-cols-12 gap-8 sm:gap-x-2 mb-16 animate-pulse'>
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1 sm:mx-30 lg:mx-0 2xl:mx-10 ">
                <TeamMemberSidebarSkeleton />
            </div>

            <div className='col-span-12 lg:col-span-8 order-1 lg:order-2 rounded-xl p-4 md:p-8 bg-slate-200 dark:bg-slate-800'>
                <div className="h-6 w-[10rem] lg:w-[20rem] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
                <div className="h-0.5  rounded-lg bg-slate-300 dark:bg-slate-700 my-3"></div>

                <div className="flex justify-between md:justify-start items-center md:gap-x-16">
                    <div className="w-[6rem] h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-[6rem] h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-[6rem] h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>

                <div className="w-full aspect-[16/9] max-h-[400px] rounded-xl bg-slate-300 dark:bg-slate-700 my-8"></div>

                <div className="my-8 p-5 rounded-2xl !rounded-tl-none bg-slate-300 dark:bg-slate-700">
                    <div className="flex justify-between">
                        <div className="w-[12rem] h-6 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                    </div>
                    <div className="h-0.5  rounded-lg bg-slate-200 dark:bg-slate-600 my-3"></div>
                    <div className="w-[10rem] h-4 rounded-full bg-slate-200 dark:bg-slate-600 my-4"></div>
                    <div className="w-[8rem] h-4 rounded-full bg-slate-200 dark:bg-slate-600 my-4"></div>
                    <div className="w-[9rem] h-4 rounded-full bg-slate-200 dark:bg-slate-600 my-4"></div>
                </div>

                {/* first section of article */}
                <div className="h-6 w-[10rem] lg:w-[20rem] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
                <div className="my-8">
                    <div className=" h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="w-[9rem] h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>

                    <div className=" h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="w-[16rem] h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>

                    <div className=" h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="w-[4rem] h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                </div>
                <div className="md:w-[80%] xl:w-[70%] aspect-[16/9] max-h-[400px] rounded-xl bg-slate-300 dark:bg-slate-700 my-8 mx-auto"></div>

                {/* second section of article */}
                <div className="h-6 w-[10rem] lg:w-[20rem] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
                <div className="my-8">
                    <div className=" h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="w-[9rem] h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>

                    <div className=" h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="w-[16rem] h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>

                    <div className=" h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                    <div className="w-[4rem] h-2 rounded-full bg-slate-200 dark:bg-slate-700 my-4"></div>
                </div>
                <div className="md:w-[80%] xl:w-[70%] aspect-[16/9] max-h-[400px] rounded-xl bg-slate-300 dark:bg-slate-700 my-8 mx-auto"></div>


            </div>
        </div>

    )
}
