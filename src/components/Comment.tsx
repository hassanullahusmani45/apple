import type { ReactNode } from 'react';
import hassanProfile from '../assets/hassan.jpeg';
import type { commentType } from '../types/type';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { getTextDirection } from '../utils/getTextDirection';


type Props = {
    children?: ReactNode;
    comment: commentType;
}

export default function Comment({ children, comment }: Props) {
    const { t } = useTranslation('main');
    console.log("Comment:", comment);

    return (
        <div className="bg-slate-200/90 dark:bg-slate-700 shadow-md rounded-lg px-2 sm:px-3 md:px-5 py-5 mt-5">
            <div className='flex justify-start items-center gap-x-2'>
                <div className="relative w-12 md:w-15 h-12 md:h-15 rounded-full bg-inherit p-[1.5px]">
                    <div className="absolute inset-0 custom-gradient rounded-full animate-spin-slow"></div>
                    <img
                        className="relative w-full h-full rounded-full object-cover bg-slate-50 dark:bg-slate-900"
                        src={comment.team_members?.profile || comment.visitors?.profile || hassanProfile}

                        alt="commenter-profile"
                    />
                </div>
                <div className=''>
                    <span className='text-sm font-semibold'>
                        {comment.visitors?.first_name}{" "}{comment.visitors?.last_name}
                        {comment.team_members?.first_name}{" "}{comment.team_members?.last_name}
                    </span>
                    <span className="mx-1 font-bold text-lg">|</span>
                    <span className='text-sm font-semibold rtl:font-GeomerricArabic'>
                        {comment.visitors?.role_id === 1 && t("Admin")}
                        {comment.visitors?.role_id === 2 && t("Team Member")}
                        {comment.visitors?.role_id === 3 && t("User")}
                        {comment.team_members?.role_id === 1 && t("Admin")}
                        {comment.team_members?.role_id === 2 && t("Team Member")}
                        {comment.team_members?.role_id === 3 && t("User")}
                    </span>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {new Date(comment.created_at!).toLocaleDateString(i18n.language == 'dr' ? "fa-AF" : "en-US")}
                    </div>
                </div>
            </div>
            <hr className="my-2 text-slate-500" />
            <div
                className="text-sm leading-7 mt-4 font-vazirmatn"
                dir={getTextDirection(comment.comment_text)}
            >
                {comment.comment_text}
            </div>


            {/* children */}
            {children}
            {/* children */}

        </div>
    )
}