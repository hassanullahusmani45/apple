import { FaEye, FaRegUser } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ArticleCard(props: any) {

  return (
    <div className={`relative flex flex-col justify-between rounded-xl text-black dark:text-white ${!props.className && "bg-slate-800"} ${props.className}`}>
      <span className="absolute right-2 top-2 w-10 h-10 flex flex-col justify-center items-center text-slate-200 bg-green-500 rounded-full text-sm font-semibold shadow shadow-white"><FaEye className="size-4 text-white" />{props.viewCount}</span>
      <Link to={props.link}><img className="w-full h-46 rounded-t-xl overflow-hidden" src={props.src} /></Link>
      <div className="px-4 py-8 flex flex-col justify-between h-[295px]">
        <Link to={props.link} className="font-medium line-clamp-2">{props.title}</Link>
        <div className="text-slate-700 dark:text-slate-400 text-sm line-clamp-3">{props.desc}</div>

        <div className="flex justify-between items-center text-sm text-slate-800 dark:text-slate-300 pb-4 border-b border-b-slate-500">
          <Link to={`/team-memmber-profile/${props.author}`}  className="line-clamp-1 flex justify-start items-center gap-1 text-sm hover:text-green-500 dark:hover:text-orange-400"><FaRegUser className="size-5 text-green-500 dark:text-orange-400" />{props.author}</Link>
          <div className="text-nowrap">{props.date}</div>
        </div>
        <Link to={props.link} className="flex justify-center items-center gap-1 text-sm hover:text-green-500 dark:hover:text-orange-400 hover:scale-105 transition-all">
          Study the article
          <FiArrowRightCircle className="size-6 text-green-500 dark:text-orange-400" />
        </Link>
      </div>
    </div>
  )
}