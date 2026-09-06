import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Michael Kalachin — discuss direction, timeline, and the experience you want to build.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
