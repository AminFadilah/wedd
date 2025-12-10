"use client";

import { useState } from "react";
import TrackImage from "./TrackImage";
import CoverPage from "./CoverPage";
import GuestRoles from "./GuestRoles";
import EventSection from "./EventSection";
import Gallery from "./Gallery";

type TabType = "acara" | "galery";

export default function InvitationPage({
  name,
  roles,
  events,
  coupleName,
  date,
}: {
  name: string;
  roles: string[];
  events: string[];
  coupleName: string;
  date: string;
}) {
  const [showCover, setShowCover] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("acara");

  const tabs: { id: TabType; label: string }[] = [
    { id: "acara", label: "Acara" },
    { id: "galery", label: "Galery" },
  ];

  return (
    <>
      {showCover ? (
        <CoverPage
          coupleName={coupleName}
          date={date}
          guestName={name}
          onOpen={() => setShowCover(false)}
        />
      ) : (
        <main className="min-h-screen flex justify-center items-start p-5 sm:p-10 bg-[var(--bg-primary)] pb-20">
          <div className="w-full max-w-2xl rounded-2xl card overflow-hidden shadow-2xl">
            {/* Header Hero */}
            <div className="relative h-48 sm:h-56 bg-gradient-to-b from-[var(--grad-start)] to-[var(--grad-end)] overflow-hidden group">
              <TrackImage
                src="/images/dummy-venue-1.jpg"
                alt="pernikahan"
                width={1200}
                height={600}
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--grad-start)]/60 to-[var(--grad-end)]/40"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <p className="uppercase text-xs tracking-[0.25em] text-[var(--text-secondary)] font-semibold">
                  Undangan untuk
                </p>
                <h2 className="text-[32px] sm:text-[42px] font-bold mt-2 text-[var(--text-primary)] drop-shadow-lg">
                  {name || "Anda"}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                  Kehadiran Anda sangat berarti bagi kami ✨
                </p>

                <div className="mt-4">
                  <GuestRoles roles={roles} coupleName={coupleName} compact />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border-line)] bg-[var(--bg-secondary)]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? "text-[var(--accent-warm)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--accent-warm)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              {activeTab === "acara" && events.length > 0 && (
                <div className="animate-in">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Acara Pernikahan
                  </h3>
                  <EventSection events={events} />
                </div>
              )}

              {activeTab === "galery" && (
                <div className="animate-in">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Galery
                  </h3>
                  <Gallery />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center py-8 px-6 border-t border-[var(--border-line)] bg-[var(--bg-secondary)]">
              <p className="text-sm text-[var(--text-secondary)]">
                Dengan Cinta
              </p>
              <p className="text-xl sm:text-2xl font-bold mt-1 text-[var(--accent-warm)]">
                {coupleName}
              </p>
              <p className="text-xs mt-2 text-[var(--text-secondary)]">
                {date}
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
