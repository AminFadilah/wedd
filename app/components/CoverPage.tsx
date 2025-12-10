"use client";

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
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--bg-primary)] select-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--grad-start)]/6 via-[var(--grad-end)]/6 to-[var(--bg-primary)] opacity-80"></div>

      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-2xl transform -rotate-12 opacity-60 hover:opacity-100 transition-opacity">
          <TrackImage
            src="/images/dummy-couple.jpg"
            alt="pasangan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute top-20 right-10 w-28 h-28 sm:w-36 sm:h-36 rounded-lg shadow-2xl transform rotate-6 opacity-50 hover:opacity-100 transition-opacity">
          <TrackImage
            src="/images/dummy-venue-1.jpg"
            alt="pernikahan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute bottom-10 left-20 w-24 h-24 sm:w-32 sm:h-32 rounded-lg shadow-2xl transform rotate-12 opacity-40 hover:opacity-100 transition-opacity">
          <TrackImage
            src="/images/dummy-family-1.jpg"
            alt="perayaan"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute bottom-20 right-10 w-36 h-36 sm:w-44 sm:h-44 rounded-lg shadow-2xl transform -rotate-6 opacity-70 hover:opacity-100 transition-opacity">
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
      <div
        className="absolute opacity-[0.03] font-extrabold text-[18vw] leading-none uppercase text-[var(--accent-warm)]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
        }}
      >
        {coupleName.replace(" ", " & ")}
      </div>

      {/* Main content */}
      <div className="relative text-center z-10 flex flex-col items-center px-4 max-w-3xl">
        {guestName && (
          <p className="text-[var(--accent-warm)] text-sm sm:text-base tracking-[0.2em] uppercase mb-3 font-semibold">
            Yth. {guestName}
          </p>
        )}

        <p className="text-[var(--text-secondary)] text-sm sm:text-base tracking-[0.3em] uppercase mb-4">
          Dengan senang hati mengundang Anda merayakan
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold drop-shadow-2xl text-[var(--text-primary)] mb-2">
          {coupleName}
        </h1>

        <div className="w-12 h-1 bg-[var(--accent-warm)] rounded-full mb-6"></div>

        <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] tracking-widest mb-2">
          {date}
        </p>

        <p className="text-sm text-[var(--text-secondary)] max-w-lg mb-8">
          Bergabunglah dengan kami untuk merayakan momen indah dalam perjalanan
          cinta kami
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={onOpen}
            className="btn-primary text-base sm:text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
          >
            ▶ Buka Undangan
          </button>
          <button className="btn-secondary text-base sm:text-lg">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
    </section>
  );
}
