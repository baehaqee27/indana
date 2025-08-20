"use client";

import {
  FiBook,
  FiAward,
  FiUsers,
  FiFeather,
  FiClipboard,
  FiBookOpen,
} from "react-icons/fi";

export default function AcademicsPage() {
  const programTPQ = [
    {
      name: "Kelas Usman",
      jenjang: "SMP keatas",
      description:
        "Fokus pada pendalaman ilmu-ilmu Islam fundamental dan pemantapan Al-Qur'an.",
      icon: FiBookOpen, // Ikon untuk kelas tingkat lanjut/pendalaman ilmu
      subjects: [
        "Bahasa Arab",
        "Tajwid",
        "Sirah Nabawi",
        "Fiqih",
        "Nisaiyyah (Kajian Wanita)",
        "Hadits",
        "Tahsin",
        "Ngaji Qur'an",
        "Hafalan Al-Qur'an",
      ],
      achievements:
        "Mampu membaca Al-Qur'an dengan tartil dan memahami dasar-dasar fiqih ibadah.",
    },
    {
      name: "Kelas Umar",
      jenjang: "SD kelas 4-6",
      description:
        "Fokus pada pengenalan dasar-dasar Islam, praktek ibadah, dan memulai hafalan.",
      icon: FiClipboard, // Ikon untuk kelas dengan banyak praktek/checklist
      subjects: [
        "Ngaji Iqro",
        "Ngaji Al-Qur'an",
        "Hafalan Al-Qur'an",
        "Muroja'ah (Mengulang Hafalan)",
        "Mufrodat (Kosa Kata Arab)",
        "Tahsin",
        "Praktek Wudhu",
        "Praktek Sholat",
        "Hafalan Dzikir Setelah Sholat",
      ],
      achievements:
        "Lancar membaca Iqro/Al-Qur'an dan hafal bacaan serta dzikir sholat dengan benar.",
    },
    {
      name: "Kelas Abu Bakar",
      jenjang: "TK - SD kelas 3",
      description:
        "Fokus pada pengenalan huruf Hijaiyah (Iqro), hafalan dasar, dan praktek ibadah.",
      icon: FiFeather, // Ikon untuk kelas pemula/dasar, seperti mulai menulis/membaca
      subjects: [
        "Ngaji Iqro",
        "Hafalan Al-Qur'an",
        "Muroja'ah (Mengulang Hafalan)",
        "Praktek Sholat",
        "Praktek Wudhu",
        "Hafalan Doa-Doa Pilihan",
      ],
      achievements:
        "Menyelesaikan Iqro jilid dasar dan hafal doa-doa harian serta surat-surat pendek.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 mb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">
            Program Akademik
          </h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Kami menyediakan program pendidikan yang komprehensif untuk
            mengembangkan potensi setiap siswa sesuai dengan minat dan bakatnya.
          </p>
        </div>
      </section>

      {/* programTPQ Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {programTPQ.map((program) => (
            <div
              key={program.name}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <program.icon className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {program.name}
                  </h2>
                  <div className="border-b border-gray-200 my-2"></div> {/* Separator line */}
                  <p className="text-gray-500 text-sm">{program.jenjang}</p> {/* Jenjang */}
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {program.description}
              </p>
              <div className="mb-6">
                <h3 className="font-semibold text-teal-600 mb-3">
                  Mata Pelajaran Unggulan:
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {program.subjects.map((subject, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-teal-600 mb-2">Prestasi:</h3>
                <p className="text-gray-600">{program.achievements}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Activities Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Program Pengembangan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Program Tahfidz Qur'an",
                desc: "Program intensif bagi santri yang fokus pada hafalan Al-Qur'an dengan target yang terukur.",
              },
              {
                title: "Syiar & Kegiatan Komunitas",
                desc: "Mengadakan lomba, perayaan hari besar Islam, dan bakti sosial untuk menumbuhkan semangat dakwah.",
              },
              {
                title: "Seni Kreativitas Islami",
                desc: "Mengembangkan bakat santri melalui kegiatan seperti kaligrafi, hadrah (rebana), dan nasyid.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl transform hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-teal-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
