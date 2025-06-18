"use client";

import { useState } from "react";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "/images/school1.jpg",
      alt: "Gedung Sekolah",
      category: "Fasilitas",
    },
    {
      src: "/images/lab.jpg",
      alt: "Laboratorium",
      category: "Fasilitas",
    },
    {
      src: "/images/library.jpg",
      alt: "Perpustakaan",
      category: "Fasilitas",
    },
    {
      src: "/images/classroom.jpg",
      alt: "Ruang Kelas Modern",
      category: "Akademik",
    },
    {
      src: "/images/sport.jpg",
      alt: "Fasilitas Olahraga",
      category: "Olahraga",
    },
    {
      src: "/images/event1.jpg",
      alt: "Upacara Bendera",
      category: "Kegiatan",
    },
    {
      src: "/images/event2.jpg",
      alt: "Pentas Seni",
      category: "Kegiatan",
    },
    {
      src: "/images/lab2.jpg",
      alt: "Praktikum Kimia",
      category: "Akademik",
    },
    // Add more images as needed
  ];

  const handlePrevious = () => {
    setSelectedImage((prev) =>
      prev === null ? null : prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === null ? null : prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 mb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">Galeri Sekolah</h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Jelajahi fasilitas dan kegiatan di SMA Harapan Bangsa melalui
            koleksi foto kami
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">{image.alt}</h3>
                  <p className="text-gray-300 text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <FiX size={24} />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <FiChevronLeft size={36} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <FiChevronRight size={36} />
          </button>

          <div className="relative w-full max-w-4xl aspect-[16/9]">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <h3 className="text-xl font-semibold">
                {images[selectedImage].alt}
              </h3>
              <p className="text-gray-300">{images[selectedImage].category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
