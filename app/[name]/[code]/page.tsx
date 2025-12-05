// app/[name]/[code]/page.tsx
import { notFound } from "next/navigation";
import InvitationPage from "@/app/components/InvitationPage";

interface Guest {
  id: number;
  code: string;
  name: string;
  roles: string[];
  events: string[];
}

export default async function Page({ params }: { params: { name: string; code: string } }) {
  const { code } = await params;

  if (!code) return notFound();

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/validate?code=${code}`, { cache: "no-store" });

  if (!res.ok) return notFound();

  const guest: Guest = await res.json();

  return (
    <InvitationPage
      name={guest.name}
      roles={guest.roles || []}
      events={guest.events || []}
      coupleName="Evan & Dzihni"
      date="12 Desember 2025"
    />
  );
}
