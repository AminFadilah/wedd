"use client";

import { useState } from "react";
import TrackImage from "./TrackImage";

interface ImageShowcaseProps {
  title: string;
  description?: string;
  heroImage: string;
  images: { src: string; caption: string; detail: string }[];
}

export default function ImageShowcase({
  title,
  description,
  heroImage,
  images,
}: ImageShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Hero Image */}
      <div className="hero-image">
        <TrackImage
          src={heroImage}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay">
          <div>
            <h2 className="text-[var(--text-primary)]">{title}</h2>
            {description && (
              <p className="text-[var(--text-secondary)]">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="card">
        <div className="image-grid">
          {images.map((img, i) => (
            <div
              key={i}
              className="image-tile group"
              onClick={() => setSelectedIndex(i)}
            >
              <TrackImage
                src={img.src}
                alt={img.caption}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="play-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="image-caption">
                <h4 className="text-[var(--text-primary)]">{img.caption}</h4>
                <p className="text-[var(--text-secondary)]">{img.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-[var(--text-primary)] text-2xl hover:scale-110 transition"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>

            <TrackImage
              src={images[selectedIndex].src}
              alt={images[selectedIndex].caption}
              width={1200}
              height={800}
              className="w-full rounded-lg"
            />

            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                {images[selectedIndex].caption}
              </h3>
              <p className="text-sm mt-2 text-[var(--text-secondary)]">
                {images[selectedIndex].detail}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-4 gap-2">
              <button
                className="btn-secondary"
                onClick={() =>
                  setSelectedIndex(
                    selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
                  )
                }
              >
                ← Prev
              </button>
              <span className="text-[var(--text-primary)] text-sm">
                {selectedIndex + 1} / {images.length}
              </span>
              <button
                className="btn-secondary"
                onClick={() =>
                  setSelectedIndex(
                    selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
                  )
                }
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
