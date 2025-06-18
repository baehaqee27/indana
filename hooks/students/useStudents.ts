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
import { Student } from "@/types/student";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[];
      setStudents(studentsList);
    } catch (err) {
      setError("Failed to fetch students");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student: Omit<Student, "id">) => {
    try {
      const newStudent = {
        ...student,
        createdAt: Timestamp.now(), // Set createdAt to current timestamp
      };
      await addDoc(collection(db, "students"), newStudent);
      await fetchStudents();
    } catch (err) {
      setError("Failed to add student");
      console.error(err);
    }
  };

  const updateStudent = async (id: string, data: Partial<Student>) => {
    try {
      await updateDoc(doc(db, "students", id), data);
      await fetchStudents();
    } catch (err) {
      setError("Failed to update student");
      console.error(err);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "students", id));
      await fetchStudents();
    } catch (err) {
      setError("Failed to delete student");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}
