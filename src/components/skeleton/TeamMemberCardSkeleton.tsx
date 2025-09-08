export default function TeamMemberCardSkeleton() {
    return (
        <div className='bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-md px-4 py-6'>
            <div className="flex justify-center items-center">
                <div className="w-40 h-40 mx-auto rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-8 mb-2">
                <div className="size-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="size-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="size-8 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="flex justify-center items-center gap-4 mb-5">
                <div className="w-full h-19 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="w-full h-28 rounded-xl bg-slate-300 dark:bg-slate-700"></div>
        </div>
    )
}
