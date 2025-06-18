import { Timestamp } from "firebase/firestore";

export interface Student {
  id?: string;
  name: string;
  className: string;
  entryYear: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
