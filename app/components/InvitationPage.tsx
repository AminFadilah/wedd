"use client";

import { useState } from "react";
import Cover from "./CoverPage";
import GuestRoles from "./GuestRoles";
import EventSection from "./EventSection";

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

  return (
    <>
      {showCover ? (
        <Cover
          coupleName={coupleName}
          date={date}
          onOpen={() => setShowCover(false)}
        />
      ) : (
        <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg transition-transform transform hover:scale-[1.01]">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Undangan untuk
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900 dark:text-gray-100">
              {name}
            </h2>

            <GuestRoles roles={roles} />
            <EventSection events={events} />

            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-300">
              <p>Terima kasih atas perhatian dan doanya.</p>
              <p className="mt-1">Kami tunggu kehadiran Anda.</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
