import ArticleCardSkeleton from "./ArticleCardSkeleton";

export default function ArticlesSkeleton() {
    return (

        <div className="animate-pulse grid grid-cols-12 gap-4 my-10 overflow-hidden w-[85%] sm:w-full mx-auto">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='col-span-12 sm:col-span-6 xl:col-span-4'>
                    <ArticleCardSkeleton />
                </div>
            ))}
        </div>
    )
}
