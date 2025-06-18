"use client";

import { FiBook, FiAward, FiUsers } from "react-icons/fi";

export default function AcademicsPage() {
  const programs = [
    {
      name: "Program IPA",
      description: "Fokus pada Sains, Matematika, dan Biologi.",
      icon: FiBook,
      subjects: [
        "Matematika Peminatan",
        "Fisika",
        "Kimia",
        "Biologi",
        "Informatika",
      ],
      achievements: "85% lulusan diterima di Fakultas Kedokteran dan Teknik",
    },
    {
      name: "Program IPS",
      description: "Fokus pada Ekonomi, Sosiologi, dan Sejarah.",
      icon: FiUsers,
      subjects: [
        "Ekonomi",
        "Sosiologi",
        "Geografi",
        "Sejarah Peminatan",
        "Akuntansi",
      ],
      achievements: "90% lulusan diterima di Fakultas Ekonomi dan Hukum",
    },
    {
      name: "Program Bahasa",
      description: "Fokus pada Bahasa dan Sastra.",
      icon: FiAward,
      subjects: [
        "Bahasa Inggris Peminatan",
        "Bahasa Jepang",
        "Sastra Indonesia",
        "Antropologi",
        "Linguistik",
      ],
      achievements: "Juara Olimpiade Bahasa Tingkat Nasional",
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

      {/* Programs Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {programs.map((program) => (
            <div
              key={program.name}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <program.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {program.name}
                </h2>
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
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 my-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Program Pengembangan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Klub Akademik",
                desc: "Olimpiade Sains, Matematika, dan Bahasa",
              },
              {
                title: "Program Research",
                desc: "Penelitian dan Pengembangan Ilmiah",
              },
              {
                title: "International Program",
                desc: "Pertukaran Pelajar dan Studi ke Luar Negeri",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
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
