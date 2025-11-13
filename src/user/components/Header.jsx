import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header({ onMenuClick }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      {/* Botão para abrir sidebar no mobile */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Menu size={22} />
      </button>

      <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        IntraCard
      </h1>

      {/* Botão de alternância de tema */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
