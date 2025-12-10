"use client";

import TrackImage from "./TrackImage";

interface EventSectionProps {
  events: string[];
}

export default function EventSection({ events }: EventSectionProps) {
  const eventDetails = {
    akad: {
      title: "Akad Nikah",
      date: "Jumat, 12 Desember 2025",
      time: "08:00 - 09:30 WIB",
      location: "Rumah Mempelai Pria",
      address: "Jl. Gatot Subroto No. 42, Jakarta",
      description: "Ijab Qabul dan doa berkah untuk pernikahan",
      image: "/images/dummy-venue-1.jpg",
      details: [
        "Persiapan dimulai pukul 07:00 WIB",
        "Acara inti berlangsung ± 1.5 jam",
        "Dihadiri keluarga besar kedua belah pihak",
      ],
      dress: "Formal / Batik",
      note: "Harap tiba 15 menit lebih awal",
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      date: "Jumat, 12 Desember 2025",
      time: "11:00 - 17:00 WIB",
      location: "Grand Ballroom Jakarta",
      address: "Jl. Sudirman No. 1, Jakarta Pusat",
      description: "Ucapan, makan bersama, dan penutup acara",
      image: "/images/dummy-venue-2.jpg",
      details: [
        "Pembukaan & sambutan pukul 11:30 WIB",
        "Makan bersama & hiburan pukul 12:00 WIB",
        "Potong kue & penutup pukul 16:30 WIB",
      ],
      dress: "Formal / Batik Indonesia",
      note: "Parkir tersedia di lokasi venue",
    },
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const details = eventDetails[event as keyof typeof eventDetails];
        return (
          <section key={event} className="card overflow-hidden animate-in">
            {/* Hero Image with Overlay */}
            <div className="relative h-48 overflow-hidden group">
              <TrackImage
                src={details?.image || "/images/placeholder.jpg"}
                alt={details?.title || "event"}
                width={1200}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-xl text-[var(--text-primary)]">
                  {details?.title}
                </h3>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-3 pb-3 border-b border-[var(--border-line)]">
                <p className="text-[var(--text-secondary)] text-xs">
                  Event {index + 1} of {events.length}
                </p>
                <span className="badge">
                  {event === "akad" ? "Pagi" : "Siang"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">
                    Tanggal
                  </p>
                  <p className="text-[var(--text-primary)] font-semibold">
                    {details?.date}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">
                    Waktu
                  </p>
                  <p className="text-[var(--text-primary)] font-semibold">
                    {details?.time}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">
                    Lokasi
                  </p>
                  <p className="text-[var(--text-primary)] font-semibold">
                    {details?.location}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">
                    {details?.address}
                  </p>
                </div>
              </div>

              <div className="mb-3 pb-3 border-b border-[var(--border-line)]">
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  {details?.description}
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-2 mb-3">
                {details?.details.map((d, i) => (
                  <div key={i} className="row">
                    <div className="image-thumb flex items-center justify-center text-[var(--accent-warm)] font-bold">
                      ●
                    </div>
                    <div className="flex-1">
                      <div className="label text-sm text-[var(--text-primary)]">
                        {d}
                      </div>
                      <div className="hint text-xs text-[var(--text-secondary)]">
                        {i === 0 ? "Persiapan" : "Detail acara"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Important Note */}
              <div className="note-alert">
                <span className="label">Penting</span>
                <p className="text-[var(--text-primary)]">{details?.note}</p>
              </div>
            </div>
          </section>
        );
      })}

      {/* General Info */}
      <div className="card p-4">
        <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
          Informasi Umum
        </h4>
        <div className="space-y-2 text-sm text-[var(--text-secondary)]">
          <p>✨ Pakaian rapi dan sopan sangat dihargai</p>
          <p>🎵 Musik instrumental akan menemani acara</p>
          <p>📸 Dokumentasi profesional akan dilakukan</p>
        </div>
      </div>
    </div>
  );
}
