export default function ProfileSkeleton() {
    return (
        <div className='mx-auto mb-14 animate-pulse'>

            <div className=" grid grid-cols-8 gap-4 md:gap-8">
                <div className='col-span-8 md:col-span-4 xl:col-span-3 bg-slate-200 dark:bg-slate-800 p-3 xl:p-8 rounded-2xl shadow-md'>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="w-30 lg:w-40 h-30 lg:h-40 mx-auto rounded-full bg-slate-300/40 dark:bg-slate-700"></div>
                        <div className="w-full h-32 lg:h-34 rounded-xl bg-slate-300/40 dark:bg-slate-700"></div>
                    </div>
                </div>

                <div className="col-span-8 md:col-span-4 xl:col-span-5 bg-slate-200 dark:bg-slate-800 mt-4 md:m-0 p-4 xl:p-8 rounded-2xl shadow-md">
                    <div className="flex justify-center m-2">
                        <div className="h-10 w-[10rem] lg:w-[20rem] bg-slate-300/30 dark:bg-slate-700 rounded-lg"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-14">
                        <div className="h-11 lg:h-12 w-full bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-10">
                        <div className="h-11 lg:h-12 w-full bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-6">
                        <div className="h-9 w-[6rem] lg:w-[10rem] bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                    </div>
                </div>

            </div>

            <div className='my-7'>
                <div className="bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                    <div className='flex justify-between items-center mb-8'>
                        <div className="h-10 w-[10rem] lg:w-[20rem] bg-slate-300/30 dark:bg-slate-700 rounded-lg"></div>
                    </div>
                    <div className='grid grid-cols-8 xl:grid-cols-7 gap-8 items-center justify-center'>

                        <div className="col-span-8 md:col-span-4 xl:col-span-3">
                            <div className="flex flex-col justify-center items-center">
                                <div className="h-11 lg:h-12 w-full bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                            </div>
                        </div>
                        <div className="col-span-8 md:col-span-4 xl:col-span-3">
                            <div className="flex flex-col justify-center items-center">
                                <div className="h-11 lg:h-12 w-full bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                            </div>
                        </div>
                        <div className='col-span-8 xl:col-span-1 flex justify-center items-center  text-center text-nowrap'>
                            <div className="h-9 lg:h-11 w-[6rem] lg:w-[10rem] bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                        </div>

                    </div>
                </div>
            </div>

            <div className='my-7'>
                <div className="bg-slate-200 dark:bg-slate-800 p-4 xl:p-8 rounded-2xl shadow-md">
                    <div className="h-10 w-[10rem] lg:w-[20rem] bg-slate-300/30 dark:bg-slate-700 rounded-lg mb-12"></div>

                    <div className="grid grid-cols-5 gap-4 justify-end items-center">
                        <div className="col-span-5 lg:col-span-4">
                            <div className="h-22 md:h-33 w-full bg-slate-300/30 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                        <div className="col-span-5 lg:col-span-1 flex justify-center items-center">
                            <div className="size-22 md:size-33 bg-slate-300/30 dark:bg-slate-700 rounded-xl"></div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                        <div className="h-9 lg:h-11 w-[6rem] lg:w-[10rem] bg-slate-300/40 dark:bg-slate-700 rounded-full"></div>
                    </div>
                </div>

            </div>

        </div >
    )
}
