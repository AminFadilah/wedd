"use client";

import ImageShowcase from "./ImageShowcase";

export default function Gallery() {
  const galleryData = {
    title: "Momen Berharga",
    description: "Koleksi foto dari perjalanan cinta kami",
    heroImage: "/frame1.png",
    images: [
      {
        src: "/frame1.png",
        caption: "First Meeting",
        detail: "Awal dimulainya cerita indah kami",
      },
      {
        src: "/frame2.png",
        caption: "Engagement",
        detail: "Hari spesial pertunangan kami",
      },
      {
        src: "/frame1.png",
        caption: "Pre-Wedding",
        detail: "Sesi poto pre-wedding yang memorable",
      },
      {
        src: "/frame2.png",
        caption: "Family Moments",
        detail: "Kebersamaan dengan keluarga tercinta",
      },
      {
        src: "/frame1.png",
        caption: "Wedding Preparation",
        detail: "Persiapan menjelang hari istimewa",
      },
      {
        src: "/frame2.png",
        caption: "Special Moments",
        detail: "Kenangan indah yang tak terlupakan",
      },
    ],
  };

  return (
    <div className="space-y-4">
      <ImageShowcase {...galleryData} />

      <div className="card p-4">
        <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
          Galeri Lengkap
        </h4>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          Galeri ini menampilkan perjalanan cinta kami dari awal hingga momen
          istimewa ini. Setiap foto menceritakan kisah yang berbeda. Klik foto
          untuk melihat versi lebih besar dan navigasi melalui koleksi kami.
        </p>
      </div>
    </div>
  );
}
