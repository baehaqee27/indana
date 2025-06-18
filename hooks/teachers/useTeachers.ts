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

  const addTeacher = async (teacher: Omit<Teacher, "id">) => {
    try {
      const newTeacher = {
        ...teacher,
        createdAt: Timestamp.now(),
      };
      await addDoc(collection(db, "teachers"), newTeacher);
      await fetchTeachers();
    } catch (err) {
      setError("Failed to add teacher");
      console.error(err);
    }
  };

  const updateTeacher = async (id: string, data: Partial<Teacher>) => {
    try {
      await updateDoc(doc(db, "teachers", id), data);
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
