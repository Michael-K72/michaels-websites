import Link from "next/link";
import { CONCEPTS, SITE } from "@/data/concepts";

export function PortfolioFooter() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0B0D10] text-[#F2EEE7]">
      <div className="mk-container py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr] md:gap-12">
          <div>
            <p className="eyebrow mb-5 text-[#B9A584]/85">Michael Kalachin</p>
            <h2 className="font-display text-[clamp(2.4rem,7vw,4.75rem)] leading-[0.92] tracking-[-0.02em]">
              Custom websites
              <br />
              for companies
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:text-[0.95rem]">
              Solo designer and developer. I build distinctive digital identities for brands
              that want craft, clarity, and a site that feels intentional—not templated.
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-white/35">
              The five directions below are style concepts for inspiration—not published
              client work.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="eyebrow mb-4">Style concepts</p>
              <ul className="space-y-2.5">
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
              <a href={`mailto:${SITE.email}`} className="transition hover:text-[#B9A584]">
                {SITE.email}
              </a>
              <Link href="/contact" className="transition hover:text-[#B9A584]">
                Contact
              </Link>
              <Link href="/impressum" className="transition hover:text-[#B9A584]">
                Impressum
              </Link>
              <Link href="/privacy" className="transition hover:text-[#B9A584]">
                Privacy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs tracking-[0.16em] uppercase text-white/35">
          <span>{SITE.availability}</span>
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
