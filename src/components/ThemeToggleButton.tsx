import { MdLightMode } from "react-icons/md";
import { useTheme } from "../services/provider/ThemeContextProvider";
import { BsMoonStars } from "react-icons/bs";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex justify-center items-center p-2.5 rounded-full bg-slate-300 dark:bg-slate-700 dark:hover:text-orange-400 hover:text-green-500"
    >
      {theme === 'dark' ? <MdLightMode className="size-5" /> : <BsMoonStars className="size-[1rem]" />}
    </button>
  );
};

export default ThemeToggleButton;
