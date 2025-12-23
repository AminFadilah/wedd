"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import TrackImage from "./TrackImage";

interface CoverProps {
  onOpen: () => void;
  coupleName: string;
  date: string;
  guestName?: string;
}

export default function CoverPage({
  onOpen,
  coupleName,
  date,
  guestName,
}: CoverProps) {
useLayoutEffect(() => {
  const elements = gsap.utils.toArray(".cover-content > *");

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 24,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      clearProps: "transform",
    }
  );
}, []);
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-rose-950 select-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 via-rose-800/50 to-rose-950" />

      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl -rotate-12 opacity-40">
          <TrackImage
            src="/images/dummy-couple.jpg"
            alt="pasangan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute top-20 right-10 w-28 h-28 sm:w-36 sm:h-36 rounded-lg shadow-2xl rotate-6 opacity-35">
          <TrackImage
            src="/images/dummy-venue-1.jpg"
            alt="pernikahan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute bottom-10 left-20 w-24 h-24 sm:w-32 sm:h-32 rounded-lg shadow-2xl rotate-12 opacity-30">
          <TrackImage
            src="/images/dummy-family-1.jpg"
            alt="perayaan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute bottom-20 right-10 w-36 h-36 sm:w-44 sm:h-44 rounded-lg shadow-2xl -rotate-6 opacity-45">
          <TrackImage
            src="/images/dummy-venue-2.jpg"
            alt="cincin pernikahan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.1] font-extrabold text-[16vw] leading-none overflow-auto whitespace-nowrap uppercase text-rose-50">
        {coupleName.replace(" ", "\n")}
      </div>

      {/* Main content */}
      <div className="cover-content relative z-10 text-center flex flex-col items-center px-4 max-w-3xl">
        {guestName && (
          <p className="text-rose-50 text-xl tracking-[0.2em] uppercase mb-3 font-bold">
             {guestName}
          </p>
        )}

        <p className="text-rose-100 text-sm tracking-[0.3em] uppercase mb-4">
          Dengan senang hati mengundang Anda merayakan
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold drop-shadow-2xl text-neutral-50 mb-2">
          {coupleName}
        </h1>

        <div className="w-12 h-1 bg-rose-500 rounded-full mb-6" />

        <p className="text-lg text-rose-100 tracking-widest mb-2">{date}</p>

        <p className="text-sm text-rose-200 max-w-lg mb-8">
          Kami mengundang Anda untuk hadir dan berbagi kebahagiaan di hari
          istimewa kami.
        </p>

        <button
          onClick={onOpen}
          className="
            px-6 py-3 rounded-lg
            bg-rose-600 text-white
            text-lg font-medium
            hover:bg-rose-500
            shadow-lg shadow-rose-950/40
            transition-all active:scale-95
          "
        >
          Buka Undangan
        </button>
      </div>
    </section>
  );
}
