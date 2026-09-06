"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CONCEPTS } from "@/data/concepts";

export default function OverviewPage() {
  const [active, setActive] = useState(0);
  const current = CONCEPTS[active];

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-700"
      style={{
        background:
          current.slug === "aura"
            ? "#efe8dc"
            : current.slug === "velora"
              ? "#070707"
              : current.slug === "monolith"
                ? "#f7f7f5"
                : current.slug === "nova"
                  ? "#07111f"
                  : "#f1ebe2",
        color:
          current.slug === "velora" || current.slug === "nova" ? "#f4f1ec" : "#151515",
      }}
    >
      <section className="page-pad mk-container relative pb-10 pt-10 md:pb-16 md:pt-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow mb-6 opacity-70">Digital directions</p>
            <h1 className="font-display text-[clamp(3.4rem,11vw,8.5rem)] leading-[0.88] tracking-[-0.03em]">
              Michael
              <br />
              Kalachin
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-65 md:text-base">
              Five industries. Five experiences. One standard.
            </p>
          </div>
          <div className="lg:pb-4">
            <p className="max-w-sm text-sm leading-relaxed opacity-60">
              Explore interactive website concepts designed to demonstrate different
              approaches to digital identity, interaction, commerce, and storytelling.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.65rem] tracking-[0.18em] uppercase opacity-50">
              <span>Web design</span>
              <span>Development</span>
              <span>Motion</span>
              <span>Interaction</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-container relative pb-24 md:pb-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 opacity-55">01 — 05</p>
            <h2 className="font-display text-3xl md:text-5xl">Choose a direction</h2>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-relaxed opacity-50 md:block">
            These are style concepts—not prior client projects. Each one shows a possible
            experience Michael can design and develop for your brand.
          </p>
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <ul className="relative z-10 space-y-1">
            {CONCEPTS.map((concept, index) => {
              const isActive = index === active;
              return (
                <li key={concept.slug}>
                  <Link
                    href={concept.href}
                    data-cursor="Explore"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group grid grid-cols-[3rem_1fr] items-start border-t py-5 transition-opacity md:grid-cols-[4rem_1fr]"
                    style={{
                      borderColor: "currentColor",
                      opacity: isActive ? 1 : 0.45,
                    }}
                  >
                    <span className="pt-1 text-xs tracking-[0.18em]">{concept.number}</span>
                    <span>
                      <span className="block font-display text-[clamp(2rem,5vw,3.4rem)] leading-none">
                        {concept.name}
                      </span>
                      <span className="mt-2 block text-xs tracking-[0.14em] uppercase opacity-60">
                        {concept.industry}
                      </span>
                      <span className="mt-2 block text-sm opacity-55">{concept.tagline}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
            <div className="border-t" style={{ borderColor: "currentColor", opacity: 0.2 }} />
          </ul>

          <div className="relative min-h-[420px] overflow-hidden lg:sticky lg:top-28 lg:min-h-[70vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -16 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={current.previewImage}
                  alt={`${current.name} concept preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute right-5 bottom-5 left-5 text-white">
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase opacity-70">
                    Interactive style concept · {current.number} / 05
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed opacity-90">
                    {current.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
