import hassanProfile from '../assets/hassan.jpeg';

type Props = {}

export default function ResponseComment({ }: Props) {
    return (
        <div className="bg-slate-100 dark:bg-slate-600 shadow-md rounded-lg px-2 sm:px-3 md:px-5 py-5 my-2">
            <div className='flex justify-start items-center gap-x-2'>
                <div className="relative w-12 md:w-15 h-12 md:h-15 rounded-full bg-inherit p-[1px]">
                    <div className="absolute inset-0 custom-gradient rounded-full animate-spin-slow"></div>
                    <img
                        className="relative w-full h-full rounded-full object-cover bg-slate-50 dark:bg-slate-900"
                        src={hassanProfile}
                        alt="commenter-profile"
                    />
                </div>
                <div className=''>
                    <span>hassan ullah usmani</span>
                    <span className="mx-2 font-bold text-lg">|</span>
                    <span>admin</span>
                    <div className="text-sm">1404-3-12</div>
                </div>
            </div>
            <hr className="my-2 text-slate-500" />
            <div className="text-sm leading-7 mt-4"></div>
        </div>
    )
}