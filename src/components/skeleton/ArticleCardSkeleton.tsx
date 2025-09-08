type props = {
    className?: string | undefined;
}
export default function ArticleCardSkeleton({ className }: props) {
    return (
        <div className={`bg-slate-200 dark:bg-slate-800 rounded-xl shadow-md ${className}`}>
            <div className="relative flex justify-center items-center">
                <span className="absolute right-2 top-2 w-10 h-10 flex rounded-full bg-slate-200 dark:bg-slate-700"></span>
                <div className="w-full h-46 rounded-t-xl bg-slate-300 dark:bg-slate-600"></div>
            </div>
            <div className="px-4 py-8">
                <div className="w-2/3 h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex flex-col gap-y-3 my-8">
                    <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-full h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
                <div className="flex justify-between gap-y-2">
                    <div className="w-[8rem] h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="w-[8rem] h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>
                <div className="w-full h-0.5 rounded-full bg-slate-300 dark:bg-slate-700 my-6"></div>
                <div className="relative flex justify-center items-center">
                    <div className="w-[8rem] h-6 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                </div>

            </div>

        </div>
    )
}
