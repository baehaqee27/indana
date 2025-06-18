import Link from "next/link";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SMA Harapan Bangsa</h3>
            <p className="text-gray-400">
              Membentuk generasi unggul untuk Indonesia yang lebih baik.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/academics"
                  className="text-gray-400 hover:text-white"
                >
                  Program Akademik
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
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <FiMapPin className="mr-2" />
                Jalan Pendidikan No. 123
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2" />
                (021) 123-4567
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2" />
                info@smaharapanbangsa.sch.id
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Jam Operasional</h4>
            <ul className="text-gray-400">
              <li>Senin - Jumat: 07:00 - 15:00</li>
              <li>Sabtu: 07:00 - 12:00</li>
              <li>Minggu: Tutup</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SMA Harapan Bangsa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
