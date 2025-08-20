"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import komponen Image
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // PENYESUAIAN: Mengubah "Akademik" menjadi "Program"
  const menuItems = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang" },
    { href: "/academics", label: "Program" },
    { href: "/gallery", label: "Galeri" },
    { href: "/contacts", label: "Kontak" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo dan Judul TPQ */}
          {/* PENYESUAIAN: Menambahkan logo dan mengatur layout dengan flex */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo1.png" // Path logo Anda
              alt="Logo TPQ Darul Quran Miftahul Jannah"
              width={40} // Atur lebar logo
              height={40} // Atur tinggi logo
              className="h-10 w-10" // Menyesuaikan ukuran jika perlu
            />
            <span className="font-bold text-lg md:text-xl text-teal-600">
              LPQ Darul Quran Miftahul Jannah
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-teal-600 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-teal-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-base text-gray-600 hover:text-teal-600"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
