interface EventSectionProps {
  events: string[];
}

export default function EventSection({ events }: EventSectionProps) {
  return (
    <div className="mt-6 space-y-4">
      {events.includes("akad") && (
        <section className="p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Akad Nikah
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Hari, Tanggal</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">08:00 WIB</p>
        </section>
      )}

      {events.includes("resepsi") && (
        <section className="p-4 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Resepsi
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Hari, Tanggal</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">11:00 - Selesai</p>
        </section>
      )}
    </div>
  );
}
