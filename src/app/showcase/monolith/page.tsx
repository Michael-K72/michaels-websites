import type { Metadata } from "next";
import MonolithPage from "@/showcases/monolith/MonolithPage";

export const metadata: Metadata = {
  title: "MONOLITH — Architecture Website Concept",
  description:
    "Interactive architecture studio website concept by Michael Kalachin — Swiss-grid minimalism and editorial project index.",
};

export default function Page() {
  return <MonolithPage />;
}
