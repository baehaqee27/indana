import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Teacher } from "@/types/teacher";

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const teachersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Teacher[];
      setTeachers(teachersList);
    } catch (err) {
      setError("Failed to fetch teachers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTeacher = async (teacher: Omit<Teacher, "id">, photo?: File) => {
    try {
      let photoURL: string | undefined;
      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);
        const response = await fetch("/api/upload-teacher-photo", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          photoURL = data.url;
        } else {
          throw new Error(data.error || "Failed to upload photo");
        }
      }
      const newTeacher = {
        ...teacher,
        photoURL,
        createdAt: Timestamp.now(),
      };
      await addDoc(collection(db, "teachers"), newTeacher);
      await fetchTeachers();
    } catch (err) {
      setError("Failed to add teacher");
      console.error(err);
    }
  };

  const updateTeacher = async (
    id: string,
    data: Partial<Teacher>,
    photo?: File
  ) => {
    try {
      let updatedData = { ...data };
      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);
        const response = await fetch("/api/upload-teacher-photo", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (response.ok) {
          updatedData.photoURL = result.url;
        } else {
          throw new Error(result.error || "Failed to upload photo");
        }
      }
      await updateDoc(doc(db, "teachers", id), updatedData);
      await fetchTeachers();
    } catch (err) {
      setError("Failed to update teacher");
      console.error(err);
    }
  };

  const deleteTeacher = async (id: string) => {
    try {
      await deleteDoc(doc(db, "teachers", id));
      await fetchTeachers();
    } catch (err) {
      setError("Failed to delete teacher");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return {
    teachers,
    loading,
    error,
    addTeacher,
    updateTeacher,
    deleteTeacher,
  };
}
