export default function TeamMemberSidebarSkeleton() {
    return (
        <div className='animate-pulse h-fit p-8 rounded-xl bg-slate-200 dark:bg-slate-800 shadow-md px-4 py-6'>
            <div className="flex justify-center items-center">
                <div className="w-40 md:w-44 lg:w-50 h-40 md:h-44 lg:h-50 rounded-full p-1.5 bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="w-[10rem] h-8 my-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="w-[8rem] h-6 my-4 rounded-full bg-slate-300 dark:bg-slate-700"></div>


            <div className="flex flex-col justify-start gap-3">
                <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[15rem] h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>

            <div className="flex justify-start items-center gap-2 my-1 mt-2">
                <div className="size-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[12rem] h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex justify-start items-center gap-2 my-1">
                <div className="size-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[16rem] h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex justify-start items-center gap-2 my-1">
                <div className="size-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[10rem] h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>

            <div className="w-[11rem] h-7 my-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex flex-col justify-start gap-3">
                <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[5rem] h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>

        </div>
    )
}
