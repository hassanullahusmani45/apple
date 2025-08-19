import { useState, useEffect } from "react";
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
    const navigate = useNavigate();
    const [searchArticle, setSearchArticle] = useState<Article[]>([]);
    const [onFocus, setOnFocus] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

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
        navigate(`/show-article/${encodeURIComponent(title)}`);
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
        <div className={`relative bg-slate-800 ${onFocus ? 'rounded-t-2xl' : 'rounded-full'} mb-20 mt-14 w-4/6`}>
            <input
                onFocus={() => setOnFocus(true)}
                onChange={(e) => setSearchInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchInputValue}
                type="text"
                placeholder="Search articles here..."
                className={`block border-none outline-none bg-slate-600 dark:bg-slate-800 text-white dark:text-slate-100 w-full py-5 ps-8 pe-10 text-base placeholder:text-slate-100 dark:placeholder:text-slate-300 placeholder:text-sm ${onFocus ? 'rounded-t-2xl' : 'rounded-full'}`}
                autoComplete='off'
            />
            <button
                onClick={() => {
                    setOnFocus(false);
                    setSearchInputValue('');
                }}
                type="submit"
                className="absolute end-3 bottom-2 bg-sky-500 hover:bg-sky-600 dark:bg-orange-500 dark:hover:bg-orange-400 text-white font-medium rounded-full text-sm p-3"
            >
                <HiMiniMagnifyingGlass className='size-6' />
            </button>

            <div className={`absolute right-0 left-0 top-16 max-h-64 w-full bg-slate-200 dark:bg-slate-700/95 rounded-b-2xl py-1 overflow-hidden transition-all ${onFocus ? 'opacity-100 shadow-md dark:shadow-sm dark:shadow-slate-500 pointer-events-auto' : 'hidden'}`}>
                {searchArticle.length === 0 ?
                    <div className="text-center text-sky-500 dark:text-orange-400 py-8">
                        No articles found
                    </div> :
                    searchArticle.map((article, index) => (
                        <div
                            onClick={() => searchHandler(article.title)}
                            key={article.id}
                            className={`block px-8 py-3 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 pointer-events-auto ${index === activeIndex ? 'bg-slate-300 dark:bg-slate-600' : ''
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
