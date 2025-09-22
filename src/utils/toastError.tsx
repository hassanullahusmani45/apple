import { TiWarning } from 'react-icons/ti';
import { toast } from 'sonner';
import i18n from '../i18n';

export const toastError = (message: string) => {
    return (
        toast.error(
            <div className='flex justify-start items-center gap-2 text-red-600 dark:text-red-500'>
                <TiWarning className="size-7" />
                <span className='text-[1rem] font-semibold font-serifrtl:font-GeomerricArabic'>{i18n.language == 'dr' ? "خطا" : "ERROR"}</span>
            </div>
            , {
                icon: null,
                description: <div className='text-red-500 dark:text-red-600 font-semibold ltr:lg:text-lg mt-2'> {message}</div>
            }
        )
    )
}
