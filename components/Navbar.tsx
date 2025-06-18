"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Beranda" },
    { href: "/about", label: "Tentang" },
    { href: "/academics", label: "Akademik" },
    { href: "/gallery", label: "Galeri" },
    { href: "/contacts", label: "Kontak" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 :dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-bold text-2xl text-teal-600">
            SMA Harapan Bangsa
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-teal-600 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-teal-800 :dark:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-teal-600"
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
