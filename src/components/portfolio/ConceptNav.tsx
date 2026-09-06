"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONCEPTS, SITE } from "@/data/concepts";
import { cn } from "@/lib/cn";
import type { NavTheme } from "@/types/concept";

const NAV_ITEMS = [
  { href: "/", label: "Index" },
  ...CONCEPTS.map((c) => ({ href: c.href, label: c.name })),
  { href: "/contact", label: "Contact" },
];

function themeFromPath(pathname: string): NavTheme {
  const concept = CONCEPTS.find((c) => pathname.startsWith(c.href));
  if (concept) return concept.navTheme;
  if (pathname.startsWith("/contact")) return "dark";
  return "dark";
}

export function ConceptNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const theme = themeFromPath(pathname);

  const current = useMemo(() => {
    if (pathname === "/") return "Index";
    if (pathname.startsWith("/contact")) return "Contact";
    return CONCEPTS.find((c) => pathname.startsWith(c.href))?.name ?? "Index";
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-3 left-1/2 z-50 w-[min(1180px,calc(100%-1.25rem))] -translate-x-1/2 transition-colors duration-500",
          `nav-theme-${theme}`,
        )}
      >
        <div
          className="flex h-[58px] items-center justify-between gap-4 rounded-full border px-3 backdrop-blur-xl md:h-[64px] md:px-4"
          style={{
            background: "var(--nav-bg)",
            borderColor: "var(--nav-border)",
            color: "var(--nav-fg)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <Link
              href="/"
              aria-label="Michael Kalachin home"
              className="grid h-10 w-10 place-items-center rounded-full border text-[0.7rem] font-semibold tracking-[0.12em]"
              style={{ borderColor: "var(--nav-border)" }}
            >
              {SITE.monogram}
            </Link>
            <div className="hidden items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span style={{ color: "var(--nav-muted)" }}>Available for projects</span>
            </div>
            <div
              className="mx-1 hidden h-5 w-px md:block"
              style={{ background: "var(--nav-border)" }}
            />
            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-2.5 py-2 text-[0.72rem] tracking-[0.08em] uppercase transition-opacity",
                      active ? "opacity-100" : "opacity-55 hover:opacity-100",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        className="absolute inset-x-2 -bottom-0.5 h-px"
                        style={{ background: "currentColor" }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <span className="text-[0.7rem] tracking-[0.16em] uppercase opacity-70">
              {current}
            </span>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border text-sm"
              style={{ borderColor: "var(--nav-border)" }}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] bg-[#090909]/95 px-6 pt-28 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="eyebrow mb-8 text-white/50">Select a direction</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="block border-b border-white/10 py-4 text-3xl font-display text-white"
                >
                  Overview
                </Link>
              </li>
              {CONCEPTS.map((c, i) => (
                <motion.li
                  key={c.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={c.href}
                    className="flex items-baseline justify-between border-b border-white/10 py-4 text-white"
                  >
                    <span className="font-display text-3xl">{c.name}</span>
                    <span className="text-xs tracking-[0.18em] uppercase text-white/45">
                      {c.number} · {c.industry}
                    </span>
                  </Link>
                </motion.li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="block border-b border-white/10 py-4 text-3xl font-display text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
