import { CiUser } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { ArticleCardType } from "../types/type";

export default function ArticleCard({
  src,
  author,
  authorID,
  date,
  link,
  title,
  desc,
  viewCount,
  className,
}: ArticleCardType) {

  return (
    <div className={`relative flex flex-col justify-between rounded-xl text-black dark:text-white ${!className && "bg-slate-800"} ${className}`}>
      <span className="absolute right-2 top-2 w-8 h-10 flex flex-col justify-center items-center text-slate-200 bg-green-500 rounded text-sm font-light shadow shadow-white"><FaEye className="size-4 text-white" />{viewCount}</span>
      
      <Link to={link}><img className="w-full h-46 rounded-t-xl overflow-hidden" src={src} /></Link>

      <div className="px-4 py-8 flex flex-col justify-between h-[295px]">
        <Link to={link} className="font-medium line-clamp-2">{title}</Link>
        <div className="text-slate-700 dark:text-slate-400 text-sm line-clamp-3">{desc}</div>

        <div className="flex justify-between items-center text-sm text-slate-800 dark:text-slate-300 pb-4 border-b border-b-slate-500">
          <Link to={`/author-profile/${authorID}`} className="line-clamp-1 flex justify-start items-center gap-1 text-sm hover:text-green-500 dark:hover:text-orange-400"><CiUser className="size-6 text-slate-900 dark:text-slate-50" />{author}</Link>
          <div className="text-nowrap">{date}</div>
        </div>
        <Link to={link} className="flex justify-center items-center gap-1 text-sm hover:text-green-500 dark:hover:text-orange-400 hover:scale-105 transition-all">
          Study the article
          <FiArrowRightCircle className="size-6 text-green-500 dark:text-orange-400" />
        </Link>
      </div>

    </div>
  )
}