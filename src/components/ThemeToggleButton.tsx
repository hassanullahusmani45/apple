import { MdLightMode } from "react-icons/md";
import { useTheme } from "../services/provider/ThemeContextProvider";
import { BsMoonStars } from "react-icons/bs";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="them-button-style"
    >
      {theme === 'dark' ? <MdLightMode className="size-3.5 sm:size-5" /> : <BsMoonStars className="size-3 sm:size-[1rem]" />}
    </button>
  );
};

export default ThemeToggleButton;
