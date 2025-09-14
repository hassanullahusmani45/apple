import ArticleCardSkeleton from "../ArticleCardSkeleton";

export default function AllArticlesSkeleton() {
    return (
        <div className="mt-10 md:mt-20 animate-pulse">

            <div className='w-[85%] sm:w-full mx-auto grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 2xl:gap-8 my-10'>
                
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className='col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 my-3 sm:my-0'>
                        <ArticleCardSkeleton />
                    </div>
                ))}

            </div>
        </div>
    )
}
