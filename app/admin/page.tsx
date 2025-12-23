"use client";

import {
  ArrowPathRoundedSquareIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, FormEvent, useRef, ReactNode } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);

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
      formRef.current?.reset();

      setActiveTab("list");

      setSearch("");
      setPage(1);

      fetchGuests();
    } catch {
      toast.error("Gagal menambahkan tamu");
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
  const tamuAkad = guests.filter((g) => {
    const ev = parseJsonArray(g.events);
    return ev.includes("akad") && !ev.includes("resepsi");
  }).length;

  const tamuResepsi = guests.filter((g) => {
    const ev = parseJsonArray(g.events);
    return ev.includes("resepsi") && !ev.includes("akad");
  }).length;

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
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-5xl mx-auto p-4 rounded-xl">
        <div className="mb-3 text-3xl text-neutral-800">Wedding Invitation Dashboard</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card
            title="Total Tamu"
            value={totalTamu}
            valueClass="text-sky-600"
            icon={<UserGroupIcon className="w-6 h-6" />}
            iconColor="text-sky-600"
            iconBg="bg-sky-100"
          />
          <Card
            title="Tamu Akad"
            value={tamuAkad}
            valueClass="text-emerald-600"
            icon={<CalendarIcon className="w-6 h-6" />}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-100"
          />
          <Card
            title="Tamu Resepsi"
            value={tamuResepsi}
            valueClass="text-amber-500"
            icon={<CalendarDaysIcon className="w-6 h-6" />}
            iconColor="text-amber-600"
            iconBg="bg-amber-100"
          />
          <Card
            title="Hadir Keduanya"
            value={tamuKeduanya}
            valueClass="text-rose-500"
            icon={<ArrowPathRoundedSquareIcon className="w-6 h-6" />}
            iconColor="text-rose-600"
            iconBg="bg-rose-100"
          />
        </div>
        <div className="bg-neutral-50 p-6 rounded-xl shadow space-y-6">
          <div className="flex space-x-2 mb-6">
            {[
              {
                key: "list",
                label: "Daftar Tamu",
                activeBg: "bg-indigo-100",
                activeText: "text-indigo-700",
              },
              {
                key: "add",
                label: "Tambah Tamu",
                activeBg: "bg-emerald-100",
                activeText: "text-emerald-700",
              },
              {
                key: "upload",
                label: "Upload Excel",
                activeBg: "bg-sky-100",
                activeText: "text-sky-700",
              },
            ].map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`
          px-4 py-2 rounded-lg border text-sm font-medium
          transition-all active:scale-95
          ${
            isActive
              ? `${tab.activeBg} ${tab.activeText} border-transparent`
              : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
          }
        `}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === "list" && (
            <>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama..."
                className="
          mb-4 w-full p-2 rounded-lg
          bg-white border border-neutral-200
          text-sm text-neutral-700
          placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300
        "
              />

              <GuestTable
                guests={paginated}
                parseJsonArray={parseJsonArray}
                copiedId={copiedId}
                setCopiedId={setCopiedId}
              />

              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </>
          )}

          {activeTab === "add" && (
            <form ref={formRef} className="space-y-4" onSubmit={handleAddGuest}>
              {/* Nama */}
              <input
                name="name"
                placeholder="Nama"
                className="
        w-full p-2 rounded-lg
        bg-white border border-neutral-200
        text-sm text-neutral-700
        placeholder:text-neutral-400
        focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
      "
              />

              {/* Role */}
              <select
                name="role"
                className="
        w-full p-2 rounded-lg
        bg-white border border-neutral-200
        text-sm text-neutral-700
        focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300
      "
              >
                <option value="">Pilih Role</option>
                <option value="couple">Couple</option>
                <option value="evans_parent">Evans Parent</option>
                <option value="dzihni_parent">Dzihni Parent</option>
              </select>

              {/* Events */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Pilih Event:
                </label>

                <label className="flex items-center gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    name="event_akad"
                    className="accent-emerald-600"
                  />
                  Akad
                </label>

                <label className="flex items-center gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    name="event_resepsi"
                    className="accent-emerald-600"
                  />
                  Resepsi
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
        px-4 py-2 rounded-lg
        bg-emerald-600 text-white text-sm font-medium
        hover:bg-emerald-700
        transition active:scale-95
      "
              >
                Simpan
              </button>
            </form>
          )}

          {activeTab === "upload" && (
            <form className="space-y-4" onSubmit={handleUploadExcel}>
              <input
                type="file"
                accept=".xlsx,.xls"
                className="
        w-full p-2 rounded-lg
        bg-white border border-neutral-200
        text-sm text-neutral-700
        file:mr-4 file:px-4 file:py-2
        file:rounded-md file:border-0
        file:bg-sky-100 file:text-sky-700
        hover:file:bg-sky-200
      "
              />

              <button
                type="submit"
                className="
        px-4 py-2 rounded-lg
        bg-sky-600 text-white text-sm font-medium
        hover:bg-sky-700
        transition active:scale-95
      "
              >
                Upload
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */
function Card({
  title,
  value,
  valueClass,
  icon,
  iconColor = "text-sky-600",
  iconBg = "bg-sky-100",
}: {
  title: string;
  value: number | string;
  valueClass?: string;
  icon: ReactNode;
  iconColor?: string;
  iconBg?: string;
}) {
  return (
    <div className="p-4 rounded-xl shadow flex flex-col bg-neutral-50 space-y-3">
      <div className="flex items-center gap-3">
        {/* Icon wrapper */}
        <div
          className={`
            p-2 rounded-lg
            ${iconBg}
            ${iconColor}
          `}
        >
          {icon}
        </div>

        <span className="text-sm text-neutral-600">{title}</span>
      </div>

      <span className={`text-3xl font-bold ${valueClass}`}>{value}</span>
    </div>
  );
}

function GuestTable({ guests, parseJsonArray, copiedId, setCopiedId }: any) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full text-sm">
        <thead className="bg-neutral-100 border-b border-neutral-200">
          <tr>
            <th className="p-3 text-left font-medium text-neutral-700">Nama</th>
            <th className="p-3 text-left font-medium text-neutral-700">
              Roles
            </th>
            <th className="p-3 text-left font-medium text-neutral-700">
              Events
            </th>
            <th className="p-3 text-right font-medium text-neutral-700">
              Link & Copy
            </th>
          </tr>
        </thead>

        <tbody>
          {guests.map((g: any) => {
            const encodedName = encodeURIComponent(g.name);
            const fullLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${encodedName}/${g.code}`;
            const isCopied = copiedId === g.id;

            return (
              <tr
                key={g.id}
                className="border-b border-neutral-200 bg-white hover:bg-neutral-50"
              >
                <td className="p-3 text-neutral-700">{g.name}</td>

                <td className="p-3 text-neutral-600">
                  {parseJsonArray(g.roles).join(", ")}
                </td>

                <td className="p-3 text-neutral-600">
                  {parseJsonArray(g.events).join(", ")}
                </td>

                <td >
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={fullLink}
                      target="_blank"
                      className="
                        text-sky-600 hover:underline
                        truncate max-w-[220px]
                      "
                    >
                      {fullLink}
                    </a>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(fullLink);
                        setCopiedId(g.id);
                        setTimeout(() => setCopiedId(null), 1500);
                      }}
                      className="
                        p-2 rounded-lg
                        border border-neutral-200
                        bg-neutral-50
                        hover:bg-neutral-100
                        transition active:scale-95
                      "
                    >
                      {isCopied ? (
                        <CheckIcon className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ClipboardIcon className="w-5 h-5 text-neutral-600" />
                      )}
                    </button>
                  </div>
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
    <div className="flex justify-between items-center mt-4 text-sm">
      <button
        disabled={page <= 1}
        onClick={() => setPage((p: number) => p - 1)}
        className="
          px-3 py-1 rounded-lg
          border border-neutral-200
          bg-neutral-50
          text-neutral-700
          hover:bg-neutral-100
          disabled:opacity-30
          transition active:scale-95
        "
      >
        Prev
      </button>

      <span className="text-neutral-500">
        Page {page} / {totalPages || 1}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage((p: number) => p + 1)}
        className="
          px-3 py-1 rounded-lg
          border border-neutral-200
          bg-neutral-50
          text-neutral-700
          hover:bg-neutral-100
          disabled:opacity-30
          transition active:scale-95
        "
      >
        Next
      </button>
    </div>
  );
}
