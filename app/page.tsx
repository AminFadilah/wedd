import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl text-center p-8 rounded-xl shadow">
        <h1 className="text-4xl font-serif">Nama Mempelai</h1>
        <p className="mt-4 text-gray-600">
          Undangan Pernikahan — Tanggal & Tempat
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link href="/general" className="px-4 py-2 border rounded">
            Undangan Umum
          </Link>
          <Link href="/admin" className="px-4 py-2 bg-black text-white rounded">
            Admin
          </Link>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Masukkan kode pada URL: <code>/WXXXXX</code>
        </div>
      </div>
    </main>
  );
}
