import LandingCounterSkeleton from "./LandingCounterSkeleton";
import TeamMemberCardSkeleton from "./TeamMemberCardSkeleton";

export default function AboutSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col justify-center items-center gap-3 mt-15 md:mt-25 lg:mt-40">
                <div className="h-6 w-[8rem] lg:w-[18rem] bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="h-1 w-[12rem] lg:w-[22rem] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <div className="grid grid-cols-12 gap-6 xl:gap-x-3 2xl:gap-x-12  my-10 xl:my-20">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mx-10 sm:m-0'>
                        <TeamMemberCardSkeleton />
                    </div>
                ))}
            </div>

            <div className="">
                <div className="flex flex-col justify-center items-center gap-3 mt-15 xl:mt-25">
                    <div className="h-6 w-[10rem] lg:w-[20rem] rounded-xl bg-slate-300 dark:bg-slate-700"></div>
                    <div className="h-1 w-[12rem] lg:w-[22rem] rounded-lg bg-slate-300 dark:bg-slate-700"></div>
                </div>
                <div className="flex justify-around items-center lg:w-1/2 my-12 lg:mx-auto">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <LandingCounterSkeleton key={index} />
                    ))}
                </div>
            </div>

        </div>
    )
}
