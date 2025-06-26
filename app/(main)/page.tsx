"use client";

import Image from "next/image";
import Link from "next/link";
// PENYESUAIAN: Menambahkan ikon yang lebih relevan
import {
  FiBook,
  FiHeart,
  FiUsers,
  FiGift,
  FiSmile,
  FiBookOpen,
} from "react-icons/fi";
import { useDashboard } from "@/hooks/dashboard/useDashboard";

export default function HomePage() {
  const { totalStudents, totalTeachers, totalClasses, loading } =
    useDashboard();

  // PENYESUAIAN: Mengubah data statistik agar relevan dengan TPQ
  const achievements = [
    { number: `${totalStudents}+`, label: "Santri Aktif" },
    { number: `${totalClasses}`, label: "Jumlah Kelas" },
    { number: `${totalTeachers}+`, label: "Tenaga Pengajar" },
    { number: "100+", label: "Hafalan Doa & Surat" }, // Contoh metrik yang lebih relevan
  ];

  // PENYESUAIAN: Mengubah fitur unggulan sesuai dengan nilai TPQ
  const features = [
    {
      icon: FiBookOpen,
      title: "Kurikulum Terpadu",
      description:
        "Mengintegrasikan pendidikan Al-Qur'an, akhlak, dan praktek ibadah sehari-hari.",
    },
    {
      icon: FiHeart,
      title: "Lingkungan Belajar",
      description:
        "Suasana belajar yang nyaman, aman, dan penuh rasa kekeluargaan untuk santri.",
    },
    {
      icon: FiUsers,
      title: "Pembimbing Berpengalaman",
      description:
        "Dibimbing oleh ustadz/ustadzah yang sabar, berpengalaman, dan mencintai Al-Qur'an.",
    },
    {
      icon: FiSmile,
      title: "Metode Interaktif",
      description:
        "Menggunakan alat peraga dan metode bercerita agar proses belajar lebih menyenangkan.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-r from-teal-700 to-teal-900 pt-16 flex items-center">
        {/* Saran: Gunakan gambar yang relevan, misal anak-anak mengaji */}
        <div className="absolute inset-0">
          <Image
            src="/galeri/1.jpg" // PENYESUAIAN: Ganti dengan path gambar yang sesuai
            alt="Santri mengaji di TPQ Darul Quran Miftahul Jannah"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <div className="text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              TPQ Darul Quran Miftahul Jannah
            </h1>
            {/* PENYESUAIAN: Slogan yang lebih Islami dan sesuai visi TPQ */}
            <p className="text-xl md:text-2xl mb-8">
              Membentuk Generasi Qur'ani, Berakhlak Mulia, dan Cinta Kepada
              Allah & Rasul-Nya
            </p>
            <div className="space-x-4">
              <Link
                href="/about" // Sesuaikan dengan path Anda
                className="bg-white text-teal-700 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                href="/contacts" // Sesuaikan dengan path Anda
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-teal-700 transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {loading ? (
            <p className="text-center text-teal-600 text-lg">
              Memuat data statistik...
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-4xl font-bold text-teal-600 mb-2">
                    {item.number}
                  </h3>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Mengapa Memilih TPQ Kami?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-gray-700"
              >
                <feature.icon className="w-12 h-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Kabar dari TPQ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-700">
              <div className="h-48 bg-teal-200 flex items-center justify-center">
                <FiBookOpen className="w-16 h-16 text-teal-600" />
              </div>
              <div className="p-6">
                <p className="text-teal-600 text-sm mb-2">20 Juni 2025</p>
                <h3 className="text-xl font-semibold mb-2">
                  Wisuda Iqro & Juz Amma Angkatan V
                </h3>
                <p className="text-gray-600 mb-4">
                  Alhamdulillah, TPQ kami meluluskan santri angkatan V yang
                  telah menyelesaikan Iqro dan hafalan Juz Amma.
                </p>
                <Link
                  href="/berita/wisuda-iqro"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-700">
              <div className="h-48 bg-yellow-200 flex items-center justify-center">
                <FiGift className="w-16 h-16 text-yellow-600" />
              </div>
              <div className="p-6">
                <p className="text-yellow-600 text-sm mb-2">15 Mei 2025</p>
                <h3 className="text-xl font-semibold mb-2">
                  Semarak Lomba Peringatan Maulid Nabi
                </h3>
                <p className="text-gray-600 mb-4">
                  Kegiatan lomba hafalan, adzan, dan kaligrafi untuk
                  memperingati Maulid Nabi Muhammad SAW.
                </p>
                <Link
                  href="/berita/lomba-maulid"
                  className="text-yellow-600 font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-700">
              <div className="h-48 bg-blue-200 flex items-center justify-center">
                <FiHeart className="w-16 h-16 text-blue-600" />
              </div>
              <div className="p-6">
                <p className="text-blue-600 text-sm mb-2">28 April 2025</p>
                <h3 className="text-xl font-semibold mb-2">
                  Bakti Sosial dan Santunan Anak Yatim
                </h3>
                <p className="text-gray-600 mb-4">
                  Sebagai bentuk kepedulian di bulan Ramadhan, kami mengadakan
                  kegiatan bakti sosial dan santunan.
                </p>
                <Link
                  href="/berita/bakti-sosial"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-700 to-teal-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mari Bergabung Bersama Kami
          </h2>
          {/* PENYESUAIAN: Kalimat ajakan yang lebih pas */}
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Daftarkan putra-putri Anda untuk belajar dan mencintai Al-Qur'an
            sejak dini di lingkungan yang positif dan mendukung.
          </p>
          <Link
            href="/contacts"
            className="bg-white text-teal-600 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors"
          >
            Hubungi Kami Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
