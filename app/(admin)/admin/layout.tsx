"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 relative">
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white z-30">
        <div className="text-xl font-bold">Admin Panel</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Overlay on mobile when sidebar open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-gray-800 text-white z-30
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0
        `}
      >
        <div className="p-4 font-bold text-xl border-b border-gray-700 hidden md:block">
          Admin Panel
        </div>
        <nav className="flex-1 p-2 space-y-2">
          <Link
            href="/admin"
            onClick={handleLinkClick}
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/students"
            onClick={handleLinkClick}
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Manajemen Siswa
          </Link>
          <Link
            href="/admin/teachers"
            onClick={handleLinkClick}
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Manajemen Guru
          </Link>
        </nav>
        <button
          onClick={() => {
            logout();
            setSidebarOpen(false);
          }}
          className="p-4 border-t border-gray-700 hover:bg-gray-700 flex justify-center"
          title="Logout"
        >
          <FiLogOut size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
