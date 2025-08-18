import { FiArrowRightCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Post(props:any) {

  return (
    <div className={`flex flex-col justify-between rounded-xl ${ !props.className && "bg-slate-800"} ${props.className}`}>
      <Link to={props.link}><img className="w-full h-40 rounded-t-xl overflow-hidden" src={props.src} /></Link>
      <div className="px-4 py-8 flex flex-col justify-between h-[295px]">
        <Link to={props.link} className="font-medium line-clamp-2">{props.title}</Link>
        <div className="text-slate-400 text-sm line-clamp-3">{props.desc}</div>

        <div className="flex justify-between items-center text-slate-300 pb-4 border-b border-b-slate-500">
          <div className="line-clamp-1">{props.author}</div>
          <div className="text-nowrap">{props.date}</div>
        </div>
        <Link to={props.link} className="flex justify-center items-center gap-1 text-sm hover:text-green-500 hover:scale-105 transition-all">
          Study the article
          <FiArrowRightCircle className="size-5" />
        </Link>
      </div>
    </div>
  )
}