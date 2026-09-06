import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Direction not found",
};

export default function NotFound() {
  return (
    <div className="page-pad flex min-h-[70vh] items-center bg-[#0b0b0b] text-[#f4f1ec]">
      <div className="mk-container py-20">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-[0.9]">
          Direction
          <br />
          not found.
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/55">
          This path isn&apos;t part of the portfolio. Return to the index and choose a
          concept.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex border border-white/25 px-6 py-3 text-xs tracking-[0.18em] uppercase"
        >
          Return to index
        </Link>
      </div>
    </div>
  );
}
