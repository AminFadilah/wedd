"use client";

interface CoverProps {
  onOpen: () => void;
  coupleName: string;
  date: string;
}

export default function CoverPage({ onOpen, coupleName, date }: CoverProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center transition-colors duration-500
                 dark:bg-gray-900"
      style={{ backgroundImage: "url('/assets/cover-bg.jpg')" }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-gray-200 drop-shadow-lg text-center px-4">
        {coupleName}
      </h1>
      <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white dark:text-gray-300 drop-shadow-md text-center px-4">
        {date}
      </p>
      <button
        onClick={onOpen}
        className="mt-10 px-6 py-3 rounded bg-blue-600 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400
                   text-white dark:text-gray-100 text-lg font-medium transition-all duration-300 shadow-lg"
      >
        Buka Undangan
      </button>
    </div>
  );
}
