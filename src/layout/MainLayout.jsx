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
      <div className="flex flex-col flex-1 relative z-10">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Overlay escuro no mobile quando a sidebar estiver aberta */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-20"
        />
      )}
    </div>
  );
}
