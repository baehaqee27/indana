import { Timestamp } from "firebase/firestore";

export interface Teacher {
  id?: string;
  name: string;
  address: string; // Konsisten dengan bahasa Inggris
  dateOfBirth: Timestamp; // Gunakan Timestamp untuk tanggal lahir
  createdAt?: Timestamp;
  updatedAt?: Timestamp; // Opsional: Untuk melacak update
}
