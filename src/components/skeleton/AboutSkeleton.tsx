import LandingCounterSkeleton from "./LandingCounterSkeleton";
import TeamMemberCardSkeleton from "./TeamMemberCardSkeleton";

export default function AboutSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="flex justify-center items-center mt-15 md:mt-25 lg:mt-40">
                <div className="h-10 w-[10rem] lg:w-[20rem] bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            </div>
            <div className="grid grid-cols-12 gap-6 xl:gap-x-3 2xl:gap-x-12  my-10 xl:my-20">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 mx-10 sm:m-0'>
                        <TeamMemberCardSkeleton />
                    </div>
                ))}
            </div>

            <div className="">
                <div className="mt-15 xl:mt-25">
                    <div className="h-8 rounded-xl bg-slate-300/40 dark:bg-slate-700 w-[13rem] md:w-4/6 lg:w-1/2 xl:w-1/3 mx-auto"></div>
                </div>
                <LandingCounterSkeleton />
            </div>
        </div>
    )
}
