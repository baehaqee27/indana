import Image from "next/image";
import Link from "next/link";
import { FiBook, FiAward, FiUsers, FiMonitor } from "react-icons/fi";

export default function HomePage() {
  const achievements = [
    { number: "1000+", label: "Lulusan" },
    { number: "90%", label: "Diterima PTN" },
    { number: "50+", label: "Prestasi" },
    { number: "30+", label: "Guru Profesional" },
  ];

  const features = [
    {
      icon: FiBook,
      title: "Kurikulum Modern",
      description: "Kurikulum yang relevan dengan tuntutan zaman",
    },
    {
      icon: FiAward,
      title: "Fasilitas Lengkap",
      description: "Laboratorium, perpustakaan, dan sarana olahraga modern",
    },
    {
      icon: FiUsers,
      title: "Guru Profesional",
      description: "Pengajar berpengalaman dan tersertifikasi",
    },
    {
      icon: FiMonitor,
      title: "Teknologi Terkini",
      description: "Smart classroom dan pembelajaran digital",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section dengan Background Image */}
      <section className="relative h-[90vh] bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              SMA Harapan Bangsa
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Membentuk Generasi Unggul, Kreatif, dan Berkarakter untuk
              Indonesia Maju
            </p>
            <div className="space-x-4">
              <Link
                href="/about"
                className="bg-white text-teal-600 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors"
              >
                Tentang Kami
              </Link>
              <Link
                href="/contacts"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-teal-600 transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-teal-800 to-teal-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-200 mb-12">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-gray-700"
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Berita Terbaru
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg text-gray-700"
              >
                <div className="h-48 bg-gray-200 relative">
                  {/* Placeholder untuk gambar */}
                </div>
                <div className="p-6">
                  <p className="text-teal-600 text-sm mb-2">12 Juni 2023</p>
                  <h3 className="text-xl font-semibold mb-2">
                    Prestasi Siswa dalam Olimpiade Sains
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Siswa-siswi kami berhasil meraih medali emas dalam Olimpiade
                    Sains Nasional...
                  </p>
                  <Link
                    href="#"
                    className="text-teal-600 font-semibold hover:underline"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-800 to-teal-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-xl mb-8">
            Daftarkan putra/putri Anda untuk masa depan yang lebih cerah
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
