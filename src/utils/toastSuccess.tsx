import { FaCircleCheck } from 'react-icons/fa6';
import { toast } from 'sonner';
import i18n from '../i18n';


export const toastSuccess = (message: string) => {
    return (
        toast.success(
            <div className='flex justify-start items-center gap-2 text-green-600 dark:text-green-500'>
                <FaCircleCheck className='size-7' />
                <span className='text-[1rem] font-semibold font-serif rtl:font-GeomerricArabic'>{i18n.language == 'dr' ? "موفقیت" : "SUCCESS"}</span>
            </div>,
            {
                icon: null,
                description: <div className='text-green-500 dark:text-green-600 font-semibold ltr:lg:text-lg mt-2'> {message}</div>
            }
        )
    )
}
