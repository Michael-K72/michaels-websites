import type { Metadata } from "next";
import AuraPage from "@/showcases/aura/AuraPage";
import { getConcept } from "@/data/concepts";

const concept = getConcept("aura");

export const metadata: Metadata = {
  title: concept ? `${concept.name} — ${concept.industry}` : "Aura — Luxury Real Estate",
  description:
    concept?.description ??
    "Quiet luxury editorial for private residences—an interactive style concept by Michael Kalachin.",
  openGraph: {
    title: concept ? `${concept.name} · Michael Kalachin` : "Aura · Michael Kalachin",
    description:
      concept?.mood ?? "Quiet luxury editorial for private residences.",
    images: concept?.previewImage ? [{ url: concept.previewImage }] : undefined,
  },
};

export default function AuraShowcasePage() {
  return <AuraPage />;
}
