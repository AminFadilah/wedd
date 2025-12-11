"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, FormEvent, useRef } from "react";
import toast from "react-hot-toast";

interface Guest {
  id: number;
  name: string;
  roles: string | string[];
  events: string | string[];
  code: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"list" | "add" | "upload">("list");

  const [guests, setGuests] = useState<Guest[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const isSubmitting = useRef(false);

  // ---------------- Fetch Data ----------------
  const fetchGuests = async () => {
    try {
      const res = await fetch("/api/guests");
      if (!res.ok) throw new Error("Fetch gagal");
      const data = await res.json();
      setGuests(data);
    } catch {
      toast.error("Gagal memuat tamu");
    }
  };

  useEffect(() => {
    if (activeTab === "list") {
      fetchGuests();
    }
  }, [activeTab]);

  // Helper
  const parseJsonArray = (value: string | string[]): string[] => {
    if (Array.isArray(value)) return value;
    try {
      return JSON.parse(value) || [];
    } catch {
      return [];
    }
  };

  // ---------------- Add Guest ----------------
  const handleAddGuest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    const f = new FormData(e.currentTarget);
    const name = (f.get("name") as string)?.trim();
    const role = f.get("role") as string;

    const events: string[] = [];
    if (f.get("event_akad")) events.push("akad");
    if (f.get("event_resepsi")) events.push("resepsi");

    if (!name || !role || events.length === 0) {
      toast.error("Semua field wajib diisi.");
      isSubmitting.current = false;
      return;
    }

    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roles: [role], events }),
      });

      if (!res.ok) throw new Error();

      toast.success("Tamu berhasil ditambahkan!");
      e.currentTarget.reset();

      // refresh list kalau sedang di tab list
      if (activeTab === "list") fetchGuests();
    } catch {
      toast.error("Gagal menambahkan tamu.");
    } finally {
      isSubmitting.current = false;
    }
  };

  // ---------------- Upload Excel ----------------
  const handleUploadExcel = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;

    if (!fileInput.files?.length) {
      toast.error("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const res = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();
      toast.success("Upload Excel berhasil!");
      fileInput.value = "";
      // refresh list kalau sedang di tab list
      if (activeTab === "list") fetchGuests();
    } catch {
      toast.error("Gagal upload file Excel.");
    }
  };

  // ---------------- Summary ----------------
  const totalTamu = guests.length;
  const tamuAkad = guests.filter((g) =>
    parseJsonArray(g.events).includes("akad")
  ).length;
  const tamuResepsi = guests.filter((g) =>
    parseJsonArray(g.events).includes("resepsi")
  ).length;
  const tamuKeduanya = guests.filter((g) => {
    const ev = parseJsonArray(g.events);
    return ev.includes("akad") && ev.includes("resepsi");
  }).length;

  // ---------------- Search + Pagination ----------------
  const filtered = guests.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <main
      className="min-h-screen p-8"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div
        className="max-w-5xl mx-auto p-4 rounded-xl"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-line)",
        }}
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Total Tamu" value={totalTamu} color="var(--accent-light)" />
          <Card title="Tamu Akad" value={tamuAkad} color="#ffb3c6" />
          <Card title="Tamu Resepsi" value={tamuResepsi} color="#cdb4db" />
          <Card title="Hadir Keduanya" value={tamuKeduanya} color="var(--accent-1)" />
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { key: "list", label: "Daftar Tamu", color: "#cdb4db" },
            { key: "add", label: "Tambah Tamu", color: "var(--accent-1)" },
            { key: "upload", label: "Upload Excel", color: "#a0c4ff" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className="px-4 py-2 rounded-lg active:scale-95"
              style={{
                background:
                  activeTab === tab.key ? tab.color : "var(--accent-2)",
                border: "1px solid var(--border-line)",
                color: activeTab === tab.key ? "#000" : "var(--text-primary)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===================== CONTENT ===================== */}
        <div
          className="p-6 rounded-xl"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-line)",
          }}
        >
          {/* ---------------- LIST ---------------- */}
          {activeTab === "list" && (
            <>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama..."
                className="mb-4 w-full p-2 rounded"
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-line)",
                }}
              />

              <GuestTable
                guests={paginated}
                parseJsonArray={parseJsonArray}
                copiedId={copiedId}
                setCopiedId={setCopiedId}
              />

              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </>
          )}

          {/* ---------------- ADD ---------------- */}
          {activeTab === "add" && (
            <form className="space-y-4" onSubmit={handleAddGuest}>
              <input
                name="name"
                placeholder="Nama"
                className="w-full p-2 rounded"
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-line)",
                }}
              />

              {/* Role */}
              <select
                name="role"
                className="w-full p-2 rounded"
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-line)",
                }}
              >
                <option value="">Pilih Role</option>
                <option value="couple">Couple</option>
                <option value="evans_parent">Evans Parent</option>
                <option value="dzihni_parent">Dzihni Parent</option>
              </select>

              {/* Events */}
              <div className="space-y-2">
                <label className="block font-medium">Pilih Event:</label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" name="event_akad" />
                  Akad
                </label>

                <label className="flex items-center gap-2">
                  <input type="checkbox" name="event_resepsi" />
                  Resepsi
                </label>
              </div>

              <button
                className="px-4 py-2 rounded active:scale-95"
                style={{
                  background: "var(--accent-1)",
                  color: "var(--text-primary)",
                }}
              >
                Simpan
              </button>
            </form>
          )}

          {/* ---------------- UPLOAD ---------------- */}
          {activeTab === "upload" && (
            <form className="space-y-4" onSubmit={handleUploadExcel}>
              <input
                type="file"
                accept=".xlsx,.xls"
                className="w-full p-2 rounded"
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-line)",
                }}
              />

              <button
                className="px-4 py-2 rounded active:scale-95"
                style={{
                  background: "#a0c4ff",
                  color: "black",
                }}
              >
                Upload
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */
function Card({ title, value, color }: any) {
  return (
    <div
      className="p-4 rounded-xl shadow flex flex-col"
      style={{
        background: "var(--accent-2)",
        border: "1px solid var(--border-line)",
      }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{title}</span>
      <span className="text-3xl font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function GuestTable({ guests, parseJsonArray, copiedId, setCopiedId }: any) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full"
        style={{ border: "1px solid var(--border-line)" }}
      >
        <thead>
          <tr style={{ background: "var(--accent-2)" }}>
            <th className="p-2">Nama</th>
            <th className="p-2">Roles</th>
            <th className="p-2">Events</th>
            <th className="p-2 text-right">Link & Copy</th>
          </tr>
        </thead>

        <tbody>
          {guests.map((g: any) => {
            const encodedName = encodeURIComponent(g.name);
            const fullLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${encodedName}/${g.code}`;
            const isCopied = copiedId === g.id;

            return (
              <tr key={g.id} style={{ background: "var(--bg-primary)" }}>
                <td className="p-2">{g.name}</td>
                <td className="p-2">{parseJsonArray(g.roles).join(", ")}</td>
                <td className="p-2">{parseJsonArray(g.events).join(", ")}</td>

                <td className="p-2 flex items-center justify-between">
                  <a
                    href={fullLink}
                    target="_blank"
                    className="hover:underline"
                    style={{ color: "#a0c4ff" }}
                  >
                    {fullLink}
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(fullLink);
                      setCopiedId(g.id);
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                    className="p-1 rounded active:scale-95"
                    style={{
                      background: "var(--accent-2)",
                      border: "1px solid var(--border-line)",
                    }}
                  >
                    {isCopied ? (
                      <CheckIcon
                        className="w-5 h-5"
                        style={{ color: "var(--accent-light)" }}
                      />
                    ) : (
                      <ClipboardIcon
                        className="w-5 h-5"
                        style={{ color: "var(--text-primary)" }}
                      />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ page, setPage, totalPages }: any) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={page <= 1}
        onClick={() => setPage((p: number) => p - 1)}
        className="px-3 py-1 rounded disabled:opacity-30 active:scale-95"
        style={{
          background: "var(--accent-2)",
          border: "1px solid var(--border-line)",
        }}
      >
        Prev
      </button>

      <span style={{ color: "var(--text-secondary)" }}>
        Page {page} / {totalPages || 1}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage((p: number) => p + 1)}
        className="px-3 py-1 rounded disabled:opacity-30 active:scale-95"
        style={{
          background: "var(--accent-2)",
          border: "1px solid var(--border-line)",
        }}
      >
        Next
      </button>
    </div>
  );
}
