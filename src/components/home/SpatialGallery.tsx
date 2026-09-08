"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { CONCEPTS } from "@/data/concepts";
import type { ConceptSlug } from "@/types/concept";
import { cn } from "@/lib/cn";

type Props = {
  activeSlug: ConceptSlug;
  onActiveChange: (slug: ConceptSlug) => void;
};

function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

export function SpatialGallery({ activeSlug, onActiveChange }: Props) {
  const activeIndex = CONCEPTS.findIndex((c) => c.slug === activeSlug);
  const current = CONCEPTS[activeIndex] ?? CONCEPTS[0];
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; active: boolean }>({ x: 0, active: false });
  const [pending, setPending] = useState(false);

  const selectIndex = useCallback(
    (next: number) => {
      const idx = wrapIndex(next, CONCEPTS.length);
      onActiveChange(CONCEPTS[idx].slug);
    },
    [onActiveChange],
  );

  const go = useCallback(
    (delta: number) => {
      if (pending) return;
      setPending(true);
      selectIndex(activeIndex + delta);
      window.setTimeout(() => setPending(false), 780);
    },
    [activeIndex, pending, selectIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      const el = stageRef.current;
      if (!el || document.activeElement !== el) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const positions = useMemo(() => {
    return CONCEPTS.map((concept, index) => {
      let offset = index - activeIndex;
      if (offset > CONCEPTS.length / 2) offset -= CONCEPTS.length;
      if (offset < -CONCEPTS.length / 2) offset += CONCEPTS.length;
      return { concept, offset };
    });
  }, [activeIndex]);

  const onPointerDown = (e: ReactPointerEvent) => {
    dragRef.current = { x: e.clientX, active: true };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.active = false;
    if (Math.abs(dx) < 48) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      id="gallery"
      className="home-gallery home-section"
      aria-labelledby="home-gallery-title"
      style={{ ["--gallery-accent" as string]: current.accent }}
    >
      <div className="home-shell">
        <div className="home-gallery__head">
          <div>
            <p className="home-eyebrow">Style concepts · Not client projects</p>
            <h2 id="home-gallery-title" className="home-gallery__title">
              A gallery of directions
            </h2>
          </div>
          <p className="home-hero__lede" style={{ margin: 0 }}>
            Five interactive website concepts. Select one to explore its craft—then open
            the full experience.
          </p>
        </div>

        <div
          ref={stageRef}
          className="home-gallery__stage-wrap"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Website concept gallery"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragRef.current.active = false;
          }}
        >
          <div className="home-gallery__stage">
            <p className="home-gallery__backdrop-word" aria-hidden>
              {current.name}
            </p>
            <div className="home-gallery__orb home-gallery__orb--top" aria-hidden />
            <div className="home-gallery__rail">
              {positions.map(({ concept, offset }) => {
                const abs = Math.abs(offset);
                if (abs > 2) return null;
                const x = offset * 38;
                const z = abs === 0 ? 80 : 40 - abs * 55;
                const rotateY = offset * -22;
                const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.64;
                const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.28;
                const filter = abs === 0 ? "brightness(1)" : `brightness(${1 - abs * 0.22})`;

                return (
                  <button
                    key={concept.slug}
                    type="button"
                    className="home-gallery__item"
                    data-offset={offset}
                    aria-label={`${concept.name}, ${concept.industry}`}
                    aria-current={offset === 0 ? "true" : undefined}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      filter,
                      zIndex: 10 - abs,
                    }}
                    onClick={() => {
                      if (offset === 0) return;
                      onActiveChange(concept.slug);
                    }}
                  >
                    <div className="home-gallery__frame">
                      <div className="home-gallery__chrome" aria-hidden>
                        <span className="home-unfold__dot" />
                        <span className="home-unfold__dot" />
                        <span className="home-unfold__dot" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 top-[1.35rem]">
                        <Image
                          src={concept.previewImage}
                          alt=""
                          fill
                          sizes="(max-width: 700px) 70vw, 280px"
                          className="object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="home-gallery__floor" aria-hidden />
            <div className="home-gallery__orb home-gallery__orb--bottom" aria-hidden />
          </div>
        </div>

        <div className="home-gallery__controls">
          <div className="home-gallery__arrows">
            <button
              type="button"
              className="home-gallery__arrow"
              aria-label="Previous concept"
              onClick={() => go(-1)}
            >
              ←
            </button>
            <button
              type="button"
              className="home-gallery__arrow"
              aria-label="Next concept"
              onClick={() => go(1)}
            >
              →
            </button>
          </div>
          <p className="home-eyebrow" style={{ margin: 0 }}>
            {current.number} / {String(CONCEPTS.length).padStart(2, "0")}
          </p>
          <Link href={current.href} className="home-btn home-btn--solid" data-cursor="Open">
            Explore {current.name}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="home-gallery__meta" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="home-gallery__name">{current.name}</h3>
              <p className="home-eyebrow" style={{ marginTop: "0.45rem" }}>
                {current.industry}
              </p>
              <p className="home-gallery__desc">{current.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="home-gallery__dots" role="tablist" aria-label="Select concept">
          {CONCEPTS.map((c) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              className={cn("home-gallery__dot")}
              aria-label={c.name}
              aria-current={c.slug === activeSlug ? "true" : undefined}
              onClick={() => onActiveChange(c.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
