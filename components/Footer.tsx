import Link from "next/link";
import Image from "next/image"; // 1. Import komponen Image
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Kolom 4: Jam Operasional diganti dengan Logo */}
          <div>
            {/* PERUBAHAN UTAMA DI SINI */}
            <Image
              src="/logo1.png"
              alt="Logo Afiliasi TPQ"
              width={200}
              height={200}
              className="mx-auto md:mx-0" // Agar di mobile center, di desktop rata kiri
            />
          </div>
          {/* Kolom 1: Tentang TPQ */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              TPQ Darul Quran Miftahul Jannah
            </h3>
            {/* Penyesuaian: Menggunakan tagline yang sudah disepakati */}
            <p className="text-gray-400">
              Membentuk Generasi Qur'ani, Berakhlak Mulia, dan Cinta Kepada
              Allah & Rasul-Nya.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                {/* Penyesuaian: Mengganti Akademik menjadi Program */}
                <Link
                  href="/academics"
                  className="text-gray-400 hover:text-white"
                >
                  Program
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-400 hover:text-white"
                >
                  Galeri
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <FiMapPin className="mr-3 mt-1 flex-shrink-0" />
                <span>Jalan Pasirmas Barat No. 5, Kota Semarang</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3" />
                <span>0822-2711-6930</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3" />
                <span>darulquranmiftahuljannah@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400">
          <p>
            {/* Penyesuaian: Mengubah tahun ke tahun sekarang */}
            &copy; {new Date().getFullYear()} TPQ Darul Quran Miftahul Jannah.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
