export default function General() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl text-center">
        <h2 className="text-3xl font-bold">Undangan Umum</h2>
        <p className="mt-4 text-gray-600">
          Ini adalah halaman undangan umum—tidak personal. Tampilkan detail
          acara (akad/resepsi) di sini.
        </p>

        <section className="mt-6 p-6 border rounded">
          <h3 className="font-semibold">Akad Nikah</h3>
          <p>Hari, Tanggal — Jam</p>
        </section>

        <section className="mt-4 p-6 border rounded">
          <h3 className="font-semibold">Resepsi</h3>
          <p>Hari, Tanggal — Jam</p>
        </section>
      </div>
    </div>
  );
}
