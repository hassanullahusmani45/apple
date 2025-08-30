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
      {theme === 'dark' ? <MdLightMode className="size-5 text" /> : <BsMoonStars className="size-[1rem]" />}
    </button>
  );
};

export default ThemeToggleButton;
