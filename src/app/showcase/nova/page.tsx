import type { Metadata } from "next";
import NovaPage from "@/showcases/nova/NovaPage";

export const metadata: Metadata = {
  title: "Nova — Technology / AI",
  description:
    "Style concept 04/05: Nova — an operational intelligence platform with interactive systems mapping, metrics, and precise product storytelling.",
  openGraph: {
    title: "Nova — Technology / AI style concept",
    description:
      "Systems that think with you. An interactive technology showcase by Michael Kalachin.",
  },
};

export default function Page() {
  return <NovaPage />;
}
