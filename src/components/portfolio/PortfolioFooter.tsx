import Link from "next/link";
import { CONCEPTS, SITE } from "@/data/concepts";

export function PortfolioFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#080808] text-[#f4f1ec]">
      <div className="mk-container py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Michael Kalachin</p>
            <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.02em]">
              Digital
              <br />
              experiences
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              Interactive website concepts that demonstrate direction, craft, and technical
              polish for future collaborations.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="eyebrow mb-4">Directions</p>
              <ul className="space-y-2">
                {CONCEPTS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={c.href}
                      className="group inline-flex items-center gap-3 text-lg transition-opacity hover:opacity-70"
                    >
                      <span className="text-xs tracking-[0.18em] text-white/40">
                        {c.number}
                      </span>
                      <span>{c.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <Link href="/contact">Contact</Link>
              <Link href="/impressum">Impressum</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs tracking-[0.16em] uppercase text-white/35">
          <span>{SITE.availability}</span>
          <span>© {new Date().getFullYear()} {SITE.name}</span>
        </div>
      </div>
    </footer>
  );
}
