import { useTranslation } from 'react-i18next';
import userProfile from '../assets/user.jpg'
import type { commentType } from '../types/type';
import i18n from '../i18n';
import { getTextDirection } from '../utils/getTextDirection';

type Props = {
    responceComment: commentType;
}

export default function ResponseComment({ responceComment }: Props) {
    const { t } = useTranslation('main');

    return (
        <div className="bg-slate-100 dark:bg-slate-600 shadow-md rounded-lg px-2 sm:px-3 md:px-5 py-5 my-2">
            <div className='flex justify-start items-center gap-x-2'>
                <div className="relative w-12 md:w-15 h-12 md:h-15 rounded-full bg-inherit p-[1.5px]">
                    <div className="absolute inset-0 custom-gradient rounded-full animate-spin-slow"></div>
                    <img
                        className="relative w-full h-full rounded-full object-cover bg-slate-50 dark:bg-slate-900"
                        src={responceComment.team_members?.profile || responceComment.visitors?.profile || userProfile}
                        alt="commenter-profile"
                    />
                </div>
                <div className=''>
                    <span className='text-sm font-semibold'>
                        {responceComment.visitors?.first_name}{" "}{responceComment.visitors?.last_name}
                        {responceComment.team_members?.first_name}{" "}{responceComment.team_members?.last_name}
                    </span>
                    <span className="mx-1 font-bold text-lg">|</span>
                    <span className='text-sm font-semibold'>
                        {responceComment.visitors?.role_id === 1 && t("Admin")}
                        {responceComment.visitors?.role_id === 2 && t("Team Member")}
                        {responceComment.visitors?.role_id === 3 && t("User")}
                        {responceComment.team_members?.role_id === 1 && t("Admin")}
                        {responceComment.team_members?.role_id === 2 && t("Team Member")}
                        {responceComment.team_members?.role_id === 3 && t("User")}
                    </span>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {new Date(responceComment.created_at!).toLocaleDateString(i18n.language == 'dr' ? "fa-AF" : "en-US")}
                    </div>
                </div>
            </div>
            <hr className="my-2 text-slate-500" />
            <div
                className="text-sm leading-7 mt-4"
                dir={getTextDirection(responceComment.comment_text)}
            >{responceComment.comment_text}</div>
        </div>
    )
}