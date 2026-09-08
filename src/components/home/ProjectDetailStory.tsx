"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { CONCEPTS } from "@/data/concepts";
import type { ConceptSlug } from "@/types/concept";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  activeSlug: ConceptSlug;
};

export function ProjectDetailStory({ activeSlug }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const current = useMemo(
    () => CONCEPTS.find((c) => c.slug === activeSlug) ?? CONCEPTS[0],
    [activeSlug],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".home-detail__visual",
        { y: 48, rotateY: -8, scale: 0.92, transformPerspective: 1200 },
        {
          y: 0,
          rotateY: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "center center",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        ".home-detail__panel > *",
        { y: 28, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "center 55%",
            scrub: 0.45,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [activeSlug]);

  return (
    <section
      ref={rootRef}
      className="home-detail home-section"
      aria-labelledby="home-detail-title"
      style={{ ["--gallery-accent" as string]: current.accent }}
    >
      <div className="home-detail__pin">
        <div className="home-shell home-detail__grid">
          <div className="home-detail__visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={current.detailImage}
                  alt={`${current.name} detail preview`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background: `linear-gradient(transparent, color-mix(in srgb, ${current.accent} 35%, #0b0d10))`,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="home-detail__panel">
            <p className="home-eyebrow">
              Selected · {current.number} / {String(CONCEPTS.length).padStart(2, "0")}
            </p>
            <h2 id="home-detail-title" className="home-gallery__title">
              {current.name}
            </h2>
            <p className="home-gallery__desc">{current.mood}</p>
            <ul className="home-detail__highlights">
              {current.highlights.map((item, i) => (
                <li key={item}>
                  <span>0{i + 1}</span>
                  <p style={{ margin: 0 }}>{item}</p>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href={current.href} className="home-btn home-btn--solid">
                Open full showcase
                <span aria-hidden>→</span>
              </Link>
              <a href="#gallery" className="home-btn home-btn--ghost">
                Back to gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
