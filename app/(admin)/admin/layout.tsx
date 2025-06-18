"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { FiLogOut } from "react-icons/fi"; // Import icon logout

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, logout } = useAuth(); // Tambahkan logout
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-xl border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-2 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/students"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Manajemen Siswa
          </Link>
          <Link
            href="/admin/teachers"
            className="block px-4 py-2 rounded hover:bg-gray-700"
          >
            Manajemen Guru
          </Link>
        </nav>
        {/* Tambahkan tombol logout */}
        <button
          onClick={logout}
          className="p-4 border-t border-gray-700 hover:bg-gray-700 flex justify-center"
          title="Logout"
        >
          <FiLogOut size={24} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
