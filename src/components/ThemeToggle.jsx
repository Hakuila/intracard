import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-transform"
      aria-label="Alternar tema"
    >
      {theme === "light" ? (
        <Moon size={18} className="text-gray-700" />
      ) : (
        <Sun size={18} className="text-yellow-400" />
      )}
    </button>
  );
}
