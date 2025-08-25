"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-4 border-b bg-white">
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
