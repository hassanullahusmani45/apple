import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface Article {
    id: number;
    title: string;
}

interface SearchBarProps {
    articles: Article[];
}

const SearchBar: React.FC<SearchBarProps> = ({ articles }) => {
    const { t } = useTranslation("main");
    const navigate = useNavigate();
    const [searchArticle, setSearchArticle] = useState<Article[]>([]);
    const [onFocus, setOnFocus] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchBody] = useAutoAnimate<HTMLDivElement>();

    // Debounce input
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(searchInputValue), 300);
        return () => clearTimeout(handler);
    }, [searchInputValue]);

    // Update search results based on debounced value
    useEffect(() => {
        const input = debouncedValue.toLowerCase();
        const filtered = articles.filter(a => a.title.toLowerCase().includes(input));
        setSearchArticle(input ? filtered : articles);
        setActiveIndex(-1);
    }, [debouncedValue, articles]);

    const searchHandler = (title: string) => {
        navigate(`/article/${encodeURIComponent(title)}`);
        setOnFocus(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(prev => Math.min(prev + 1, searchArticle.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            searchHandler(searchArticle[activeIndex].title);
        }
    };

    return (
        <div className={`relative bg-slate-800 ${onFocus ? 'rounded-t-2xl' : 'rounded-full'} m-15 md:m-20 w-[95%] md:w-[90%]  lg:w-[70%]`}>
            <input
                onFocus={() => setOnFocus(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setOnFocus(false);
                        setSearchInputValue('');
                    }, 300); // Delay to allow click on suggestions
                }}
                onChange={(e) => setSearchInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchInputValue}
                type="text"
                name="search"
                placeholder={t("search articles")}
                className={`block border-none outline-none bg-slate-600 dark:bg-slate-800 text-white dark:text-slate-100 w-full py-3 ps-4 md:ps-8 pe-10 text-base font-semibold placeholder:text-slate-100 dark:placeholder:text-slate-300 placeholder:text-sm placeholder:italic placeholder:font-normal ${onFocus ? 'rounded-t-2xl' : 'rounded-full'}`}
                autoComplete='off'
            />
            <button
                onClick={() => {
                    setTimeout(() => {
                        setOnFocus(false);
                        setSearchInputValue('');
                    }, 300); // Delay to allow click on suggestions
                }}
                type="submit"
                className="absolute end-1.5 bottom-1 bg-green-600 hover:bg-green-500 dark:bg-orange-500 dark:hover:bg-orange-400 text-white text-sm sm:font-medium rounded-full p-2"
            >
                <HiMiniMagnifyingGlass className='size-6' />
            </button>

            <div ref={searchBody} className={`absolute right-0 left-0 top-12.5 max-h-50 md:max-h-62 w-full bg-slate-200 dark:bg-slate-700/95 rounded-b-xl lg:rounded-b-2xl py-1 overflow-hidden transition-all ${onFocus ? 'opacity-100 pointer-events-auto' : 'hidden'}`}>
                {searchArticle.length === 0 ?
                    <div className="text-center font-bold text-lg text-green-600 dark:text-orange-400 py-8">
                        {t("No article found")}
                    </div> :
                    searchArticle.map((article, index) => (
                        <div
                            onClick={() => searchHandler(article.title)}
                            key={article.id}
                            className={`block text-xs md:text-xs font-normal px-6 md:px-8 lg:px-12 py-2 md:py-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 pointer-events-auto ${index === activeIndex ? 'bg-slate-300 dark:bg-slate-600' : ''
                                }`}
                        >
                            {article.title}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchBar;
