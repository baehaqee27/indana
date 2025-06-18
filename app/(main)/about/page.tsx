"use client";

import Image from "next/image";
import { FiStar } from "react-icons/fi";

export default function AboutPage() {
  const gallery = [
    { src: "/images/school1.jpg", alt: "Gedung Sekolah" },
    { src: "/images/lab.jpg", alt: "Laboratorium" },
    { src: "/images/library.jpg", alt: "Perpustakaan" },
    { src: "/images/sport.jpg", alt: "Fasilitas Olahraga" },
    { src: "/images/classroom.jpg", alt: "Ruang Kelas" },
    { src: "/images/canteen.jpg", alt: "Kantin" },
    { src: "/images/mosque.jpg", alt: "Masjid" },
    { src: "/images/field.jpg", alt: "Lapangan" },
  ];

  const testimonials = [
    {
      name: "Ahmad Saputra",
      role: "Alumni 2020, Mahasiswa UI",
      image: "/images/alumni1.jpg",
      content:
        "SMA Harapan Bangsa memberikan fondasi yang kuat untuk masa depan saya.",
    },
    // Add more testimonials...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 mb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">
            Tentang SMA Harapan Bangsa
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Didirikan pada tahun 1990, kami berkomitmen untuk menyediakan
            pendidikan berkualitas yang membentuk generasi unggul Indonesia.
          </p>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Visi</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi lembaga pendidikan terkemuka yang menghasilkan generasi
              unggul, berkarakter, dan siap menghadapi tantangan global.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Misi</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-4 text-lg">
              <li>Menyelenggarakan pendidikan berkualitas tinggi</li>
              <li>Mengembangkan potensi siswa secara optimal</li>
              <li>Membangun karakter dan kepribadian yang kuat</li>
              <li>Menerapkan teknologi dalam pembelajaran</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 my-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Galeri Sekolah
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="relative h-64 overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Apa Kata Alumni
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-teal-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-400 fill-current w-6 h-6"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
