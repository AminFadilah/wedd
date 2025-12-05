interface GuestRolesProps {
  roles: string[];
}

export default function GuestRoles({ roles }: GuestRolesProps) {
  return (
    <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
      {roles.includes("couple") && (
        <p className="text-base md:text-lg">
          Kami — <span className="font-semibold">mempelai</span> — dengan senang
          hati mengundang Anda.
        </p>
      )}
      {roles.includes("evans_parent") && (
        <p className="text-base md:text-lg">
          Atas nama keluarga mempelai{" "}
          <span className="font-semibold">pria</span>, kami mengundang Anda.
        </p>
      )}
      {roles.includes("dzihni_parent") && (
        <p className="text-base md:text-lg">
          Atas nama keluarga mempelai{" "}
          <span className="font-semibold">wanita</span>, kami mengundang Anda.
        </p>
      )}
    </div>
  );
}
