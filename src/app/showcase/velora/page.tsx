import type { Metadata } from "next";
import VeloraPage from "@/showcases/velora/VeloraPage";

export const metadata: Metadata = {
  title: "Velora — Premium Automotive Concept",
  description:
    "VELORA GT Coupé: a dark cinematic premium automotive style concept with scroll cinema, configuration, and performance storytelling by Michael Kalachin.",
  openGraph: {
    title: "Velora — Premium Automotive Concept",
    description:
      "Interactive style concept 02 / 05. Pure motion, precision configuration, and cinematic performance.",
  },
};

export default function Page() {
  return <VeloraPage />;
}
