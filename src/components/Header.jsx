import { Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 shadow-md sticky top-0 z-30">
      {/* Botão de menu visível apenas em telas pequenas */}
      <button
        onClick={onMenuClick}
        className="block lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      >
        <Menu size={22} />
      </button>

      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        IntraCard
      </h1>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-gray-800" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>
    </header>
  );
}
