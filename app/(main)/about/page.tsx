"use client";

import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { useTeachers } from "@/hooks/teachers/useTeachers";

export default function AboutPage() {
  const {
    teachers,
    loading: teachersLoading,
    error: teachersError,
  } = useTeachers();

  const testimonials = [
    {
      name: "Ahmad Saputra",
      role: "Alumni 2020, Mahasiswa UI",
      image: "/images/alumni1.jpg",
      content:
        "TPQ Darul Quran Miftahul Jannah memberikan fondasi yang kuat untuk masa depan saya.",
    },
    // Add more testimonials...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">
            Tentang TPQ Darul Quran Miftahul Jannah
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Didirikan sejak tahun 2018, kami berkomitmen untuk menyebarkan
            cahaya Al-Qur'an dan membentuk generasi Qur'ani yang berakhlak
            mulia.
          </p>
        </div>
      </section>
      <section className="bg-white pb-12 md:pb-20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Judul Bagian Sejarah */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Perjalanan Kami
            </h2>
            <p className="mt-2 text-xl text-gray-500">
              Dari Niat Tulus Menjadi Cahaya di Tengah Masyarakat
            </p>
          </div>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify md:px-12">
            <p>
              Berawal dari sebuah niat tulus, perjalanan kami dimulai dari dua
              buah rumah yang disatukan dan diwakafkan untuk menjadi sebuah
              pusat pendidikan Al-Qur'an. Dengan tekad yang kuat, langkah awal
              kami diresmikan dengan berdirinya yayasan pada tanggal{" "}
              <strong className="font-semibold text-gray-800">
                17 September 2017
              </strong>
              .
            </p>
            <p>
              Pintu gerbang ilmu secara resmi kami buka pada{" "}
              <strong className="font-semibold text-gray-800">
                18 Februari 2018
              </strong>
              , di mana{" "}
              <strong className="font-semibold text-gray-800">
                TPQ Darul Quran Miftahul Jannah
              </strong>{" "}
              mulai beroperasi. Langkah pertama kami dimulai dengan penuh
              kesederhanaan, membimbing lima orang santri pertama yang merupakan
              anak-anak dari tetangga terdekat.
            </p>
            <p>
              Kala itu, kami hadir di tengah lingkungan di mana umat Islam
              adalah minoritas. Dengan hanya 25 Kepala Keluarga Muslim, bahkan
              jemaah di masjid terdekat hanya dapat dihitung jari, sekitar tiga
              orang. Namun, keterbatasan itu tidak pernah menyurutkan semangat
              kami untuk menyebarkan cahaya Al-Qur'an.
            </p>
            <p>
              Alhamdulillah, seiring berjalannya waktu, berkat rahmat Allah SWT
              dan dukungan tulus dari berbagai pihak, dakwah kecil kami diterima
              dengan hangat. Banyak warga yang mendukung dan semakin banyak
              keluarga Muslim yang menjadi bagian dari komunitas kami.
            </p>
            <p>
              Kini, dari lima orang santri, TPQ kami telah berkembang dan
              menjadi rumah bagi kurang lebih{" "}
              <strong className="font-semibold text-gray-800">60 santri</strong>{" "}
              yang bersemangat menimba ilmu. Lingkungan kami pun telah
              bertransformasi. Syiar Islam semakin hidup, masjid kembali ramai
              oleh jemaah, dan majelis-majelis pengajian rutin menghidupkan
              hari-hari kami. Ini adalah bukti bahwa niat baik yang dirawat
              dengan ikhlas akan selalu menemukan jalannya untuk tumbuh dan
              memberikan manfaat bagi banyak orang.
            </p>
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Visi</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menciptakan generasi penghafal Qur'an yang berakhlaqul karimah.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-teal-600 mb-6">Misi</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-4 text-lg">
              <li>Menekankan adab dan akhlaq</li>
              <li>Mengembangkan potensi anak pada bidangnya</li>
              <li>Menghafal Al-Qur'an sesuai kaidah ilmu tajwid</li>
              <li>Mempelajari berbagai pelajaran sesuai tuntunan syar'i</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Guru Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 my-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Guru TPQ
          </h2>
          {teachersLoading ? (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-2">Memuat data guru...</p>
            </div>
          ) : teachersError ? (
            <div className="text-center text-red-300">
              <p className="text-xl">Error: {teachersError}</p>
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center text-white">
              <p className="text-xl">Belum ada data guru yang tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teachers.map((teacher, index) => (
                <div
                  key={index}
                  className="relative min-h-72 md:min-h-80 aspect-[3/4] overflow-hidden rounded-xl shadow-lg bg-white"
                >
                  {teacher.photoURL ? (
                    <Image
                      src={teacher.photoURL}
                      alt={teacher.name}
                      fill
                      className="object-contain hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector("div");
                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">Tidak ada foto</span>
                    </div>
                  )}
                  {teacher.photoURL && (
                    <div
                      className="w-full h-full flex items-center justify-center bg-gray-200"
                      style={{ display: "none" }}
                    >
                      <span className="text-gray-500">Gagal memuat foto</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    <p className="font-semibold">{teacher.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
