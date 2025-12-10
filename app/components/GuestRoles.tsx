"use client";

import TrackImage from "./TrackImage";

interface GuestRolesProps {
  roles: string[];
  compact?: boolean;
  coupleName?: string;
}

export default function GuestRoles({
  roles,
  compact = false,
  coupleName,
}: GuestRolesProps) {
  const roleConfig = {
    couple: {
      label: "Mempelai",
      message:
        "Kami dengan senang hati mengundang Anda untuk merayakan momen spesial kami.",
      image: "/images/dummy-couple.jpg",
    },
    evans_parent: {
      label: "Keluarga Pria",
      message:
        "Atas nama keluarga mempelai pria, kami dengan hormat mengundang Anda untuk hadir di acara istimewa ini.",
      image: "/images/dummy-family-1.jpg",
    },
    dzihni_parent: {
      label: "Keluarga Wanita",
      message:
        "Atas nama keluarga mempelai wanita, kami dengan hormat mengundang Anda untuk merayakan hari bahagia kami.",
      image: "/images/dummy-family-2.jpg",
    },
  };

  if (compact) {
    const inviterLabels = roles.map((role) => {
      if (role === "couple" && coupleName) return coupleName;
      return roleConfig[role as keyof typeof roleConfig]?.label ?? role;
    });

    return (
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">
          Diundang oleh
        </span>
        <div className="inline-flex items-center gap-2 flex-wrap justify-center">
          {inviterLabels.map((label, i) => (
            <span key={i} className="badge">
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
