"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ConceptCTA } from "@/components/portfolio/ConceptCTA";
import {
  heroImage,
  MONOLITH,
  overlapSequence,
  philosophy,
  processSteps,
  projects,
  services,
  studio,
  type MonolithProject,
} from "./data";
import "./monolith.css";

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-8% 0px" },
    transition: { duration: 0.8, ease, delay },
  };
}

export default function MonolithPage() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<MonolithProject | null>(null);
  const [preview, setPreview] = useState<MonolithProject | null>(null);
  const previewEnabled = useRef(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 180, damping: 24, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 180, damping: 24, mass: 0.4 });

  const selected = useMemo(() => projects.slice(0, 3), []);
  const architecture = useMemo(
    () => projects.filter((p) => p.category === "architecture"),
    [],
  );
  const interiors = useMemo(
    () => projects.filter((p) => p.category === "interiors"),
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 900px)");
    const sync = () => {
      previewEnabled.current = mq.matches;
      if (!mq.matches) setPreview(null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const onIndexMove = useCallback(
    (e: MouseEvent<HTMLElement>, project: MonolithProject) => {
      if (!previewEnabled.current) return;
      setPreview(project);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY],
  );

  const onIndexLeave = useCallback(() => {
    setPreview(null);
  }, []);

  const openProject = useCallback((project: MonolithProject) => {
    setPreview(null);
    setActive(project);
  }, []);

  return (
    <div className="monolith">
      {/* Hero */}
      <section className="monolith-shell monolith-hero" aria-label="Hero">
        <div className="monolith-hero-top">
          <p className="monolith-label">{MONOLITH.label}</p>
          <p className="monolith-caption">{MONOLITH.city}</p>
        </div>

        <div>
          <motion.h1
            className="monolith-hero-title"
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            We shape
            <br />
            space.
          </motion.h1>

          <motion.div
            className="monolith-hero-media"
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
          >
            <Image
              src={heroImage}
              alt="Monolith architecture — concrete volume in soft light"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 52vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="monolith-hero-foot">
          <p className="monolith-body" style={{ margin: 0 }}>
            Architecture and interiors reduced to grid, type, and measured voids.
          </p>
          <p className="monolith-caption">Est. {MONOLITH.founded}</p>
        </div>
      </section>

      {/* Selected projects */}
      <section className="monolith-shell monolith-section" aria-labelledby="mo-selected">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="monolith-caption mb-3">Selected</p>
            <h2 id="mo-selected" className="monolith-h2">
              Projects
            </h2>
          </div>
          <p className="monolith-body" style={{ margin: 0 }}>
            Three recent works. Open any project for full notes.
          </p>
        </div>

        <div className="monolith-selected-grid">
          {selected.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              className="monolith-selected-card"
              onClick={() => openProject(project)}
              data-cursor="View"
              {...fadeUp(i * 0.08)}
            >
              <figure>
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </figure>
              <div className="monolith-selected-meta">
                <span className="monolith-caption">{project.index}</span>
                <span className="text-left">
                  <span className="block text-sm font-medium tracking-tight">{project.name}</span>
                  <span className="monolith-caption mt-1 block">{project.location}</span>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="monolith-shell monolith-section-tight" aria-labelledby="mo-philosophy">
        <hr className="monolith-rule mb-16" />
        <motion.div className="monolith-philosophy" {...fadeUp()}>
          <p className="monolith-caption">Philosophy</p>
          <div>
            <h2 id="mo-philosophy" className="monolith-h2 mb-6">
              {philosophy.heading}
            </h2>
            <p className="monolith-body">{philosophy.body}</p>
          </div>
        </motion.div>
      </section>

      {/* Editorial overlapping scroll */}
      <section className="monolith-shell monolith-overlap" aria-label="Editorial sequence">
        {overlapSequence.map((item) => (
          <article key={item.caption} className="monolith-overlap-item">
            <motion.div className="monolith-overlap-sticky" {...fadeUp(0.05)}>
              <div className="monolith-overlap-media">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div className="monolith-overlap-copy" {...fadeUp(0.12)}>
              <p className="monolith-caption mb-4">{item.caption}</p>
              <h3 className="monolith-h3 mb-5">{item.title}</h3>
              <p className="monolith-body">{item.text}</p>
            </motion.div>
          </article>
        ))}
      </section>

      {/* Architecture */}
      <section className="monolith-shell monolith-section" aria-labelledby="mo-arch">
        <div className="monolith-discipline">
          <div>
            <p className="monolith-caption mb-3">Discipline</p>
            <h2 id="mo-arch" className="monolith-h2">
              Architecture
            </h2>
            <p className="monolith-body mt-5">
              New volumes and conversions. Plans drawn for light first, elevation second.
            </p>
          </div>
          <ul className="monolith-discipline-list">
            {architecture.map((project) => (
              <li key={project.id}>
                <span className="monolith-caption">{project.index}</span>
                <button type="button" onClick={() => openProject(project)} data-cursor="Open">
                  {project.name}
                </button>
                <span className="monolith-caption">{project.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interiors */}
      <section className="monolith-shell monolith-section-tight" aria-labelledby="mo-int">
        <div className="monolith-discipline">
          <div>
            <p className="monolith-caption mb-3">Discipline</p>
            <h2 id="mo-int" className="monolith-h2">
              Interiors
            </h2>
            <p className="monolith-body mt-5">
              Rooms as continuous surface. Joinery, acoustics, and daylight as one system.
            </p>
          </div>
          <ul className="monolith-discipline-list">
            {interiors.map((project) => (
              <li key={project.id}>
                <span className="monolith-caption">{project.index}</span>
                <button type="button" onClick={() => openProject(project)} data-cursor="Open">
                  {project.name}
                </button>
                <span className="monolith-caption">{project.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="monolith-shell monolith-section" aria-labelledby="mo-process">
        <div className="mb-10">
          <p className="monolith-caption mb-3">Method</p>
          <h2 id="mo-process" className="monolith-h2">
            Process
          </h2>
        </div>
        <div className="monolith-process">
          {processSteps.map((step, i) => (
            <motion.div key={step.step} className="monolith-process-step" {...fadeUp(i * 0.06)}>
              <p className="monolith-caption mb-4">{step.step}</p>
              <h3 className="monolith-h3 mb-3" style={{ fontSize: "1.35rem" }}>
                {step.title}
              </h3>
              <p className="monolith-body" style={{ margin: 0, maxWidth: "16rem" }}>
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project index */}
      <section
        className="monolith-shell monolith-section monolith-index"
        aria-labelledby="mo-index"
        onMouseLeave={onIndexLeave}
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="monolith-caption mb-3">Index</p>
            <h2 id="mo-index" className="monolith-h2">
              All projects
            </h2>
          </div>
          <p className="monolith-body" style={{ margin: 0 }}>
            Hover for preview · tap or click to open
          </p>
        </div>

        <div>
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="monolith-index-row"
              onClick={() => openProject(project)}
              onMouseEnter={(e) => onIndexMove(e, project)}
              onMouseMove={(e) => onIndexMove(e, project)}
              data-cursor="Open"
            >
              <span className="monolith-caption pt-1">{project.index}</span>
              <span className="monolith-index-name">{project.name}</span>
              <span className="monolith-index-meta">{project.location}</span>
              <span className="monolith-index-meta">{project.type}</span>
              <span className="monolith-index-meta">{project.year}</span>
            </button>
          ))}
          <hr className="monolith-rule" />
        </div>

        <motion.div
          className={`monolith-preview${preview ? " is-visible" : ""}`}
          style={{ left: springX, top: springY }}
          aria-hidden
        >
          {preview ? (
            <Image
              src={preview.image}
              alt=""
              fill
              sizes="280px"
              className="object-cover"
            />
          ) : null}
        </motion.div>
      </section>

      {/* Studio */}
      <section className="monolith-shell monolith-section-tight" aria-labelledby="mo-studio">
        <hr className="monolith-rule mb-16" />
        <div className="monolith-studio-grid">
          <motion.div {...fadeUp()}>
            <p className="monolith-caption mb-3">Studio</p>
            <h2 id="mo-studio" className="monolith-h2 mb-6">
              {studio.heading}
            </h2>
            <p className="monolith-body">{studio.body}</p>
          </motion.div>
          <motion.ul className="monolith-people" {...fadeUp(0.1)}>
            {studio.people.map((person) => (
              <li key={person.role}>
                <span className="monolith-caption">{person.role}</span>
                <span>{person.name}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Services */}
      <section className="monolith-shell monolith-section" aria-labelledby="mo-services">
        <div className="mb-10">
          <p className="monolith-caption mb-3">Offer</p>
          <h2 id="mo-services" className="monolith-h2">
            Services
          </h2>
        </div>
        <div className="monolith-services">
          {services.map((service, i) => (
            <motion.article key={service.title} className="monolith-service" {...fadeUp(i * 0.05)}>
              <h3 className="monolith-h3 mb-3" style={{ fontSize: "1.5rem" }}>
                {service.title}
              </h3>
              <p className="monolith-body" style={{ margin: 0 }}>
                {service.text}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <ConceptCTA conceptName="Monolith" tone="light" />

      {/* Project detail overlay */}
      <AnimatePresence>
        {active ? (
          <motion.div
            className="monolith-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mo-detail-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="monolith-overlay-panel"
              initial={reduceMotion ? false : { y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="monolith-overlay-head">
                <div>
                  <p className="monolith-caption mb-2">
                    {active.index} · {active.type}
                  </p>
                  <h2 id="mo-detail-title" className="monolith-h3">
                    {active.name}
                  </h2>
                </div>
                <button
                  type="button"
                  className="monolith-overlay-close"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>

              <div className="monolith-overlay-body">
                <div className="monolith-overlay-hero">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>

                <div>
                  <dl className="monolith-facts">
                    <div className="monolith-fact">
                      <dt>Location</dt>
                      <dd>{active.location}</dd>
                    </div>
                    <div className="monolith-fact">
                      <dt>Year</dt>
                      <dd>{active.year}</dd>
                    </div>
                    <div className="monolith-fact">
                      <dt>Type</dt>
                      <dd>{active.type}</dd>
                    </div>
                    <div className="monolith-fact">
                      <dt>Area</dt>
                      <dd>{active.area}</dd>
                    </div>
                  </dl>

                  <p className="monolith-caption mb-2">Concept</p>
                  <p className="monolith-body mb-6">{active.concept}</p>

                  <p className="monolith-caption mb-2">Materials</p>
                  <p className="text-sm tracking-tight">{active.materials.join(" · ")}</p>

                  <div className="monolith-gallery">
                    {active.gallery.map((src, i) => (
                      <figure key={src}>
                        <Image
                          src={src}
                          alt={`${active.name} gallery ${i + 1}`}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
