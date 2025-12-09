import InvitationPage from "@/app/components/InvitationPage";

interface Guest {
  id: number;
  code: string;
  name: string;
  roles: string[];
  events: string[];
}

export default async function Page() {
  return (
    <div>
      <InvitationPage
        name={""}
        roles={["couple"]}
        events={["akad", "resepsi"]}
        coupleName="Evan & Dzihni"
        date="12 Desember 2025"
      />
    </div>
  );
}
