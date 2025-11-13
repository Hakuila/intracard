import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Activity,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ open, setOpen }) {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Clientes", path: "/clientes", icon: Users },
    { name: "Cartões", path: "/cartoes", icon: CreditCard },
    { name: "Transações", path: "/transacoes", icon: Activity },
  ];

  return (
    <aside
      className={`fixed lg:static z-30 top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          IntraCard
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                active
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon size={20} />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-0 w-full px-4">
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
