export default function LandingCounterSkeleton() {
    return (
        <div className=''>
            

            <div className="grid grid-cols-3 my-12">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div className="flex flex-col justify-center items-center gap-2">
                        <div className="w-14 h-14 mx-auto rounded-full bg-slate-200 dark:bg-slate-800"></div>
                        <div className="h-6 w-[5rem] rounded-xl bg-slate-300/40 dark:bg-slate-700"></div>
                        <div className="h-6 w-[7rem] md:w-[10rem] rounded-xl bg-slate-300/40 dark:bg-slate-700"></div>

                    </div>
                ))}
            </div>

        </div>
    )
}
