"use client";

import { useState } from "react";
import TrackImage from "./TrackImage";
import CoverPage from "./CoverPage";
import GuestRoles from "./GuestRoles";
import EventSection from "./EventSection";
import Gallery from "./Gallery";

interface InvitationPageProps {
  name: string;
  roles: string[];
  events: string[];
  coupleName: string;
  date: string;
}

export default function InvitationPage({
  name,
  roles,
  events,
  coupleName,
  date,
}: InvitationPageProps) {
  const [showCover, setShowCover] = useState(true);

  /**
   * Klik buka undangan
   * langsung tampilkan main
   */
  const handleOpenInvitation = () => {
    setShowCover(false);
  };

  return (
    <>
      {/* ================= COVER ================= */}
      {showCover && (
        <div className="fixed inset-0 z-50">
          <CoverPage
            coupleName={coupleName}
            date={date}
            guestName={name}
            onOpen={handleOpenInvitation}
          />
        </div>
      )}

      {/* ================= MAIN ================= */}
      {!showCover && (
        <main className="min-h-screen bg-rose-950 text-rose-50 pb-24">
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-rose-900/60 backdrop-blur">
            {/* HERO */}
            <section className="relative h-screen overflow-hidden">
              <TrackImage
                src="/images/dummy-venue-1.jpg"
                alt="pernikahan"
                width={1200}
                height={600}
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-rose-900/80 via-rose-900/60 to-rose-950" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="uppercase text-xs tracking-[0.3em] text-rose-200 font-semibold">
                  Undangan untuk
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                  {name || "Anda"}
                </h2>
                <p className="mt-3 text-sm text-rose-200">
                  Kehadiran Anda sangat berarti bagi kami
                </p>
                <div className="mt-6">
                  <GuestRoles
                    roles={roles}
                    coupleName={coupleName}
                    compact
                  />
                </div>
              </div>
            </section>

            {/* ACARA */}
            {events.length > 0 && (
              <section className="px-6 py-12 text-center">
                <h3 className="text-xl font-semibold">
                  Acara Pernikahan
                </h3>
                <div className="w-12 h-1 bg-rose-500 mx-auto rounded-full my-6" />
                <EventSection events={events} />
              </section>
            )}

            {/* GALERI */}
            <section className="px-6 py-12 text-center bg-rose-900/40">
              <h3 className="text-xl font-semibold">Galeri</h3>
              <div className="w-12 h-1 bg-rose-500 mx-auto rounded-full my-6" />
              <Gallery />
            </section>

            {/* FOOTER */}
            <section className="text-center py-10 bg-rose-950">
              <p className="text-sm text-rose-300">Dengan Cinta</p>
              <p className="text-2xl font-bold mt-2">{coupleName}</p>
              <p className="text-xs mt-3 text-rose-300">{date}</p>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
