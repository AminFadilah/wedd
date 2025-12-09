"use client";

import { useState } from "react";
import GuestRoles from "./GuestRoles";
import EventSection from "./EventSection";

// ================= COVER PAGE ==================
function Cover({
  coupleName,
  date,
  onOpen,
}: {
  coupleName: string;
  date: string;
  onOpen: () => void;
}) {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden
      bg-gray-50 dark:bg-gray-900 p-6"
    >
      <span
        className="absolute select-none opacity-10 font-extrabold text-gray-700 dark:text-gray-200
  text-[35vw] sm:text-[30vw] md:text-[25vw] lg:text-[20vw]
  leading-none tracking-tight text-center pointer-events-none whitespace-nowrap"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {coupleName}
      </span>

      {/* MAIN TEXT */}
      <div className="relative text-center z-10">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white drop-shadow-md">
          {coupleName}
        </h1>

        <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 mt-3 tracking-wide">
          {date}
        </p>

        {/* BUTTON */}
        <button
          onClick={onOpen}
          className="mt-6 px-6 py-3 rounded-lg text-white font-medium 
            bg-gradient-to-r from-gray-700 to-gray-900
            hover:brightness-110 hover:scale-105 active:scale-95
            transition-all duration-300 cursor-pointer shadow-xl"
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
}

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

  return (
    <>
      {showCover ? (
        <Cover
          coupleName={coupleName}
          date={date}
          onOpen={() => setShowCover(false)}
        />
      ) : (
        <main
          className="min-h-screen flex justify-center items-start p-5 sm:p-8 md:p-12
          bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
        >
          <div
            className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl
            bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-300 dark:border-gray-700"
          >
            {/* HEADER */}
            <div className="text-center px-6 py-10">
              <h1
                className="text-base sm:text-lg font-light tracking-[0.30em] uppercase 
                text-gray-600 dark:text-gray-300"
              >
                Undangan Untuk
              </h1>

              <h2
                className="text-[30px] sm:text-[38px] md:text-[42px] font-bold mt-2
                text-gray-900 dark:text-white drop-shadow-sm"
              >
                {name}
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 tracking-wide">
                Kami berharap kehadiran Anda dapat menambah kebahagiaan di hari
                spesial kami.
              </p>
            </div>

            {/* ROLES */}
            {roles.length > 0 && (
              <section className="px-6 pb-10 border-t border-gray-300/60 dark:border-gray-700/60">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Sebagai Tamu:
                </h3>
                {/* Tetap memakai komponen original */}
                <GuestRoles roles={roles} />
              </section>
            )}

            {/* EVENTS */}
            {events.length > 0 && (
              <section className="px-6 pb-12 border-t border-gray-300/60 dark:border-gray-700/60">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Rangkaian Acara:
                </h3>
                {/* Tetap memakai komponen original */}
                <EventSection events={events} />
              </section>
            )}

            {/* FOOTER */}
            <div className="text-center py-8 bg-white/60 dark:bg-gray-900/40 border-t dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Dengan hormat,
              </p>

              <p className="text-xl sm:text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {coupleName}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
                {date}
              </p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
