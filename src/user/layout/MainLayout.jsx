import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Conteúdo principal */}
      <div className="flex flex-col flex-1">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 overflow-y-auto text-gray-800 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
