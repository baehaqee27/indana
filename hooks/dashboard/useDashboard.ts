import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  recentStudents: Array<{
    id: string;
    name: string;
    className: string;
    createdAt: Timestamp;
  }>;
  recentTeachers: Array<{
    id: string;
    name: string;
    subject: string;
    createdAt: Timestamp;
  }>;
  studentsByClass: Record<string, number>;
  loading: boolean;
  error: string | null;
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    recentStudents: [],
    recentTeachers: [],
    studentsByClass: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all collections
        const studentsSnap = await getDocs(collection(db, "students"));
        const teachersSnap = await getDocs(collection(db, "teachers"));

        // Get recent students
        const recentStudentsQuery = query(
          collection(db, "students"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const recentStudentsSnap = await getDocs(recentStudentsQuery);

        // Get recent teachers
        const recentTeachersQuery = query(
          collection(db, "teachers"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const recentTeachersSnap = await getDocs(recentTeachersQuery);

        // Calculate students per class
        const studentsByClass = studentsSnap.docs.reduce((acc, doc) => {
          const classname = doc.data().className;
          acc[classname] = (acc[classname] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          totalStudents: studentsSnap.size,
          totalTeachers: teachersSnap.size,
          totalClasses: Object.keys(studentsByClass).length,
          recentStudents: recentStudentsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as any[],
          recentTeachers: recentTeachersSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as any[],
          studentsByClass,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch dashboard stats",
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
}
