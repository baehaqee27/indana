"use client";

import { useState } from "react";
import { useStudents } from "@/hooks/students/useStudents";
import { Student } from "@/types/student";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ManageStudentsPage() {
  const { students, loading, error, addStudent, updateStudent, deleteStudent } =
    useStudents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student>({
    name: "",
    className: "", // Matches Student interface
    entryYear: new Date().getFullYear(), // Default to current year
  });
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for add/update loading
  const [deletingId, setDeletingId] = useState<string | null>(null); // New state for delete loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !currentStudent.name ||
      !currentStudent.className ||
      !currentStudent.entryYear
    ) {
      alert("Harap lengkapi semua bidang yang wajib diisi.");
      return;
    }

    // Ensure entryYear is a valid number
    if (
      typeof currentStudent.entryYear !== "number" ||
      isNaN(currentStudent.entryYear) ||
      currentStudent.entryYear < 1900 ||
      currentStudent.entryYear > new Date().getFullYear() + 5
    ) {
      alert("Tahun Masuk harus berupa angka tahun yang valid (misal: 2023).");
      return;
    }

    setIsSubmitting(true); // Start submitting loading
    try {
      if (modalMode === "edit" && currentStudent.id) {
        // Only update relevant fields, exclude id, createdAt, updatedAt as they are managed by Firestore/hook
        const { id, createdAt, ...dataToUpdate } = currentStudent;
        await updateStudent(id, dataToUpdate);
      } else {
        // Exclude id and timestamps when adding, as the hook handles them
        const { id, createdAt, updatedAt, ...studentToAdd } = currentStudent;
        await addStudent(studentToAdd as Omit<Student, "id">); // Cast to Omit<Student, "id">
      }
      setIsModalOpen(false);
      // Reset form after successful submission
      setCurrentStudent({
        name: "",
        className: "",
        entryYear: new Date().getFullYear(),
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Gagal menyimpan data siswa. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false); // End submitting loading
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      setDeletingId(id); // Start deleting loading for this specific item
      try {
        await deleteStudent(id);
      } catch (err) {
        console.error("Error deleting student:", err);
        alert("Gagal menghapus siswa. Silakan coba lagi.");
      } finally {
        setDeletingId(null); // End deleting loading
      }
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setCurrentStudent({
      name: "",
      className: "",
      entryYear: new Date().getFullYear(), // Default to current year for new entries
    });
    setIsModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setModalMode("edit");
    setCurrentStudent(student); // Populate form with existing student data
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <p className="ml-3 text-teal-600">Memuat data siswa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: Gagal memuat data siswa. {error}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Siswa</h1>
        <button
          onClick={openAddModal}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          + Tambah Siswa
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden text-gray-800 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kelas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tahun Masuk
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  Belum ada data siswa.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.className}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.entryYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => openEditModal(student)}
                      className="text-teal-600 hover:text-teal-800 mr-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                      aria-label={`Edit ${student.name}`}
                    >
                      <FiEdit className="inline-block" />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id!)}
                      className="text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      aria-label={`Hapus ${student.name}`}
                      disabled={deletingId === student.id} // Disable based on specific ID
                    >
                      {deletingId === student.id ? (
                        <span className="animate-spin inline-block h-4 w-4 border-b-2 border-red-600 rounded-full"></span>
                      ) : (
                        <FiTrash2 className="inline-block" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-800 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {modalMode === "edit" ? "Edit Siswa" : "Tambah Siswa"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Siswa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={currentStudent.name}
                  onChange={(e) =>
                    setCurrentStudent({
                      ...currentStudent,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="studentClass"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Kelas <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="studentClass"
                  value={currentStudent.className}
                  onChange={(e) =>
                    setCurrentStudent({
                      ...currentStudent,
                      className: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500 outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="entryYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tahun Masuk <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="entryYear"
                  value={
                    currentStudent.entryYear === 0
                      ? ""
                      : currentStudent.entryYear.toString()
                  }
                  onChange={(e) =>
                    setCurrentStudent({
                      ...currentStudent,
                      entryYear: parseInt(e.target.value) || 0, // Parse to number
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-teal-500 focus:border-teal-500 outline-none"
                  required
                  min="1900"
                  max={new Date().getFullYear() + 5}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={isSubmitting} // Disable based on isSubmitting state
                >
                  {isSubmitting ? (
                    <span className="animate-spin inline-block h-4 w-4 border-b-2 border-white rounded-full mr-2"></span>
                  ) : null}
                  {modalMode === "edit" ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
