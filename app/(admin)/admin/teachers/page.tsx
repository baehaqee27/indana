"use client";

import { useState } from "react";
import { useTeachers } from "@/hooks/teachers/useTeachers";
import { Teacher } from "@/types/teacher";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons
import { Timestamp } from "firebase/firestore"; // Import Timestamp

export default function ManageTeachersPage() {
  const { teachers, loading, error, addTeacher, updateTeacher, deleteTeacher } =
    useTeachers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize currentTeacher with correct types and default values.
  // dateOfBirth should be a string for form input, then converted to Timestamp.
  const [currentTeacher, setCurrentTeacher] = useState<
    Omit<Teacher, "dateOfBirth"> & { dateOfBirth: string }
  >({
    name: "",
    address: "",
    dateOfBirth: "", // Use string for form input
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert dateOfBirth string from form to Firestore Timestamp
      const teacherToSave: Teacher = {
        ...currentTeacher,
        dateOfBirth: currentTeacher.dateOfBirth
          ? Timestamp.fromDate(new Date(currentTeacher.dateOfBirth))
          : (null as any), // Handle empty string if needed, or make dateOfBirth required
      };

      if (currentTeacher.id) {
        // If updating, ensure the ID is passed correctly
        await updateTeacher(currentTeacher.id, teacherToSave);
      } else {
        await addTeacher(teacherToSave);
      }
      setIsModalOpen(false);
      // Reset to initial empty state for the next new teacher
      setCurrentTeacher({ name: "", address: "", dateOfBirth: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Gagal menyimpan data guru. Silakan coba lagi."); // User feedback
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
      try {
        await deleteTeacher(id);
      } catch (err) {
        console.error("Error deleting teacher:", err);
        alert("Gagal menghapus guru. Silakan coba lagi."); // User feedback
      }
    }
  };

  // Function to open modal for adding a new teacher
  const handleAddTeacherClick = () => {
    setCurrentTeacher({ name: "", address: "", dateOfBirth: "" }); // Reset for new entry
    setIsModalOpen(true);
  };

  // Function to open modal for editing an existing teacher
  const handleEditTeacherClick = (teacher: Teacher) => {
    setCurrentTeacher({
      ...teacher,
      // Convert Timestamp to string (YYYY-MM-DD) for form display
      dateOfBirth: teacher.dateOfBirth
        ? teacher.dateOfBirth.toDate().toISOString().split("T")[0]
        : "",
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Guru</h1>
        <button
          onClick={handleAddTeacherClick} // Use the new handler
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          + Tambah Guru
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden text-gray-800">
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
                Alamat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tgl. Lahir
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teachers.map((teacher, index) => (
              <tr key={teacher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {teacher.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Format Timestamp for display */}
                  {teacher.dateOfBirth
                    ? teacher.dateOfBirth.toDate().toLocaleDateString("id-ID")
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => handleEditTeacherClick(teacher)} // Use the new handler
                    className="text-teal-600 hover:text-teal-800 mr-3"
                  >
                    <FiEdit className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-gray-800">
          <div className="bg-white rounded-lg w-96 p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {currentTeacher.id ? "Edit Guru" : "Tambah Guru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Guru
                </label>
                <input
                  type="text"
                  id="name"
                  value={currentTeacher.name}
                  onChange={(e) =>
                    setCurrentTeacher({
                      ...currentTeacher,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="address"
                  value={currentTeacher.address}
                  onChange={(e) =>
                    setCurrentTeacher({
                      ...currentTeacher,
                      address: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tanggal Lahir
                </label>
                <input
                  type="date" // Use type="date" for date input
                  id="dateOfBirth"
                  value={currentTeacher.dateOfBirth}
                  onChange={(e) =>
                    setCurrentTeacher({
                      ...currentTeacher,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  {currentTeacher.id ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
