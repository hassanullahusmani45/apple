import { MdLightMode } from "react-icons/md";
import { useTheme } from "../services/provider/ThemeContextProvider";
import { BsMoonStarsFill } from "react-icons/bs";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-x-2 px-3 py-1 rounded dark:hover:text-orange-300 hover:text-sky-500"
    >
      {theme === 'dark' ? <MdLightMode className="size-6" /> :<BsMoonStarsFill className="size-5" />}
    </button>
  );
};

export default ThemeToggleButton;
