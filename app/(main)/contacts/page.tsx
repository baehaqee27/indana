"use client";

import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Add access key to formData
    formData.append("access_key", "728ca5be-9a8e-4bd6-acd3-d2e91eff661f");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message:
            "Pesan berhasil terkirim! Kami akan segera menghubungi Anda.",
        });
        form.reset();
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      label: "Alamat",
      value: "Jalan Pendidikan No. 123, Jakarta, 12345",
    },
    {
      icon: FiPhone,
      label: "Telepon",
      value: "(021) 123-4567",
    },
    {
      icon: FiMail,
      label: "Email",
      value: "info@smaharapanbangsa.sch.id",
    },
    {
      icon: FiClock,
      label: "Jam Operasional",
      value: "Senin - Jumat: 07:00 - 15:00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 py-24 mb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-white mb-6">Hubungi Kami</h1>
          <p className="text-xl text-teal-100 max-w-3xl">
            Kami siap membantu Anda dengan informasi lebih lanjut tentang SMA
            Harapan Bangsa
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Informasi Kontak
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-teal-100 p-3 rounded-full mr-4">
                      <info.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">
                        {info.label}
                      </h3>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Kirim Pesan
              </h2>
              {status.type && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    status.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status.message}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900 bg-white"
                    required
                    minLength={3}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-900 bg-white"
                    required
                    minLength={10}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-8 rounded-xl shadow-lg h-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Lokasi Kami
            </h2>
            <div className="h-[600px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
