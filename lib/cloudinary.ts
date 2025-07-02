import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Note: File upload functionality has been moved to server-side API route
// to avoid client-side issues with modules like 'fs'.
// Use the API route '/api/upload-teacher-photo' for file uploads.

export default cloudinary;
