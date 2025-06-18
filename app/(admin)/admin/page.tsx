"use client";

import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { FiUsers, FiBookOpen, FiGrid, FiClock } from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboardPage() {
  const {
    totalStudents,
    totalTeachers,
    totalClasses,
    recentStudents,
    recentTeachers,
    studentsByClass,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  const stats = [
    {
      title: "Total Siswa",
      value: totalStudents,
      icon: FiUsers,
      bgColor: "bg-teal-100",
      textColor: "text-teal-600",
      borderColor: "border-teal-500",
      link: "/admin/students",
    },
    {
      title: "Total Guru",
      value: totalTeachers,
      icon: FiBookOpen,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      borderColor: "border-red-500",
      link: "/admin/teachers",
    },
    {
      title: "Jumlah Kelas",
      value: totalClasses,
      icon: FiGrid,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
      borderColor: "border-emerald-500",
      link: "/admin/classes",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link href={stat.link} key={index}>
            <div
              className={`p-6 bg-white rounded-xl shadow-sm border-l-4 ${stat.borderColor}
              hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${stat.textColor} text-sm font-semibold mb-1`}>
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {stat.value.toLocaleString()}
                  </h3>
                </div>
                <div className={`p-3 ${stat.bgColor} rounded-full`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Siswa Terbaru
            </h2>
            <Link
              href="/admin/students"
              className="text-teal-600 hover:underline text-sm"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-gray-800"
              >
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">
                    Kelas: {student.class}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {student.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Teachers */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Guru Terbaru
            </h2>
            <Link
              href="/admin/teachers"
              className="text-teal-600 hover:underline text-sm"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="space-y-3">
            {recentTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-gray-800"
              >
                <div>
                  <p className="font-medium">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.subject}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {teacher.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students per Class Distribution */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Distribusi Siswa per Kelas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(studentsByClass).map(([className, count]) => (
            <div key={className} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Kelas {className}</p>
              <p className="text-2xl font-bold text-gray-800">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
