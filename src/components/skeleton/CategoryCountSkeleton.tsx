export default function CategorySkeleton() {
    return (
        <div className="mt-16 md:mt-28 animate-pulse">
            <div className="flex justify-start items-center gap-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="w-[15rem] h-4 md:h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="mt-2 w-[19rem] h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            <div className='grid grid-cols-4 gap-6 lg:gap-2 xl:gap-6 px-8 sm:px-0 py-8'>
                <div className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-40 rounded-xl bg-slate-300 dark:bg-slate-700"></div>
                <div className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-40 rounded-xl bg-slate-300 dark:bg-slate-700"></div>
                <div className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-40 rounded-xl bg-slate-300 dark:bg-slate-700"></div>
                <div className="col-span-4 sm:col-span-2 lg:col-span-1 w-full h-40 rounded-xl bg-slate-300 dark:bg-slate-700"></div>
            </div>
        </div>
    )
}
