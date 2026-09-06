import type { Metadata } from "next";
import ElanPage from "@/showcases/elan/ElanPage";

export const metadata: Metadata = {
  title: "Élan — Luxury Hospitality Concept",
  description:
    "Élan is a warm, emotional hospitality style concept—lakeside rooms, dining, wellness, and refined booking for Michael Kalachin's portfolio.",
  openGraph: {
    title: "Élan — Luxury Hospitality Concept",
    description:
      "A boutique hospitality experience centered on atmosphere, rooms, and booking.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Élan hospitality concept preview",
      },
    ],
  },
};

export default function Page() {
  return <ElanPage />;
}
