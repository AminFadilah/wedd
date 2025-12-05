"use client";
import {
  CheckIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, FormEvent } from "react";

interface Guest {
  id: number;
  name: string;
  roles: string | string[];
  events: string | string[];
  code: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"add" | "upload" | "list">("add");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const base = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("testbase", base);
  // Fetch data dari API route /api/guests
  useEffect(() => {
    if (activeTab === "list") {
      fetch("/api/guests")
        .then((res) => res.json())
        .then((data) => setGuests(data))
        .catch(console.error);
    }
  }, [activeTab]);

  const parseJsonArray = (value: string | string[]): string[] => {
    if (Array.isArray(value)) return value;
    try {
      return JSON.parse(value) || [];
    } catch {
      return [];
    }
  };

  // ----------------- Add Guest -----------------
  const handleAddGuest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const roles = (formData.get("roles") as string)
      .split(",")
      .map((r) => r.trim());
    const events = (formData.get("events") as string)
      .split(",")
      .map((r) => r.trim());

    // Panggil API untuk simpan data
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roles, events }),
      });
      if (!res.ok) throw new Error("Gagal menambahkan tamu");
      alert("Tamu berhasil ditambahkan!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menambahkan tamu");
    }
  };

  // ----------------- Upload Excel -----------------
  const handleUploadExcel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0)
      return alert("Pilih file terlebih dahulu");

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload gagal");
      alert("Excel berhasil diupload!");
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat upload Excel");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          {["add", "upload", "list"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? "bg-gray-700"
                  : "bg-gray-800 hover:bg-gray-700"
              } transition-colors`}
              onClick={() => setActiveTab(tab as "add" | "upload" | "list")}
            >
              {tab === "add"
                ? "Tambah Tamu Manual"
                : tab === "upload"
                ? "Upload Excel"
                : "Lihat Semua Tamu"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "add" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Tambah Tamu Manual</h2>
              <form className="space-y-4" onSubmit={handleAddGuest}>
                <input
                  name="name"
                  type="text"
                  placeholder="Nama"
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700"
                />
                <input
                  name="roles"
                  type="text"
                  placeholder="Roles (pisahkan dengan koma)"
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700"
                />
                <input
                  name="events"
                  type="text"
                  placeholder="Events (pisahkan dengan koma)"
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  Simpan
                </button>
              </form>
            </div>
          )}
          {activeTab === "upload" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Upload Excel</h2>
              <form className="space-y-4" onSubmit={handleUploadExcel}>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="w-full p-2 rounded bg-gray-900 border border-gray-700"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  Upload
                </button>
              </form>
            </div>
          )}
          {activeTab === "list" && (
            <div className="overflow-x-auto relative">
              <h2 className="text-xl font-semibold mb-4">Daftar Tamu</h2>
              <table className="w-full border border-gray-700">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 border border-gray-700">Nama</th>
                    <th className="p-2 border border-gray-700">Roles</th>
                    <th className="p-2 border border-gray-700">Events</th>
                    <th className="p-2 border border-gray-700 text-right">
                      Link & Copy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((g) => {
                    const base = process.env.NEXT_PUBLIC_BASE_URL;
                    const encodedName = encodeURIComponent(g.name);
                    const fullLink = `${base}/${encodedName}/${g.code}`;

                    const isCopied = copiedId === g.id;

                    const handleCopy = () => {
                      navigator.clipboard.writeText(fullLink);
                      setCopiedId(g.id);
                      setTimeout(() => setCopiedId(null), 1500);
                    };

                    return (
                      <tr key={g.id} className="bg-gray-900">
                        <td className="p-2 border border-gray-700">{g.name}</td>
                        <td className="p-2 border border-gray-700">
                          {parseJsonArray(g.roles).join(", ")}
                        </td>
                        <td className="p-2 border border-gray-700">
                          {parseJsonArray(g.events).join(", ")}
                        </td>

                        <td className="p-2 border border-gray-700 flex items-center justify-between gap-3">
                          <a
                            href={`/${encodedName}/${g.code}`}
                            className="text-blue-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {fullLink}
                          </a>

                          <button
                            onClick={handleCopy}
                            className="p-1 rounded hover:bg-gray-700 transition"
                          >
                            {isCopied ? (
                              <CheckIcon className="w-5 h-5 text-green-400" />
                            ) : (
                              <ClipboardIcon className="w-5 h-5 text-gray-300" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
