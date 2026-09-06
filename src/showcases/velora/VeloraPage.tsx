"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ConceptCTA } from "@/components/portfolio/ConceptCTA";
import {
  aeroImage,
  aeroPoints,
  basePrice,
  cinemaImage,
  cinemaMetrics,
  configImage,
  driveLocations,
  exteriorImage,
  exteriorOptions,
  exteriorPoints,
  gallery,
  heroImage,
  interiorImage,
  interiorOptions,
  interiorPoints,
  performanceStats,
  specs,
  techFeatures,
  veloraMeta,
  wheelOptions,
} from "./data";
import "./velora.css";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  active,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  active: boolean;
}) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 });
  const display = useTransform(spring, (latest) =>
    latest.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );
  const [text, setText] = useState(
    value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (active) motionValue.set(value);
    else motionValue.set(0);
  }, [active, motionValue, value]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return unsub;
  }, [display]);

  return (
    <>
      <span>{text}</span>
      <span className="velora-stat__suffix">{suffix}</span>
    </>
  );
}

function CinemaSection({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=280%",
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".velora-cinema__glow", { opacity: 0.75, scale: 1.12, ease: "none" }, 0)
        .to(
          ".velora-cinema__vehicle img",
          {
            scale: 1,
            filter: "brightness(0.98) contrast(1.06)",
            ease: "none",
          },
          0,
        )
        .to(".velora-cinema__light", { opacity: 0.7, ease: "none" }, 0.05)
        .to(
          ".velora-cinema__metric",
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
          },
          0.2,
        )
        .to(".velora-cinema__caption", { opacity: 1, ease: "none" }, 0.45)
        .to(
          ".velora-cinema__vehicle",
          {
            filter: "drop-shadow(0 0 48px rgba(123,163,201,0.28))",
            ease: "none",
          },
          0.35,
        );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 200);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={`velora-cinema${reduced ? " velora-cinema--static" : ""}`}
      aria-label="VELORA cinematic performance"
    >
      <div className="velora-cinema__stage">
        <div className="velora-cinema__glow" aria-hidden />
        <div className="velora-cinema__vehicle">
          <Image
            src={cinemaImage}
            alt="VELORA GT Coupé centered in cinematic light"
            fill
            className="object-cover"
            sizes="(max-width: 960px) 90vw, 920px"
            priority={false}
          />
          <div className="velora-cinema__light" aria-hidden />
        </div>

        <div className="velora-cinema__metrics">
          {cinemaMetrics.map((m) => (
            <div key={m.id} className="velora-cinema__metric">
              <div className="velora-cinema__metric-value">
                {m.value.toLocaleString(undefined, {
                  minimumFractionDigits: m.decimals,
                  maximumFractionDigits: m.decimals,
                })}
                {m.suffix}
              </div>
              <div className="velora-cinema__metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        <p className="velora-cinema__caption">Scroll to reveal the machine</p>
      </div>
    </section>
  );
}

function PerformanceSection({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const active = reduced || inView;

  return (
    <section ref={ref} className="velora-section" id="performance">
      <div className="velora-container">
        <p className="velora-eyebrow">Performance</p>
        <h2 className="velora-display mt-4 text-[clamp(2.4rem,6vw,4.4rem)]">
          Numbers that stay quiet
          <br />
          until asked.
        </h2>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-[var(--velora-silver-dim)]">
          Hybrid assist fills the gaps. Carbon-ceramic stamina keeps the story consistent lap
          after lap.
        </p>

        <div className="velora-stat-grid mt-12">
          {performanceStats.map((stat) => (
            <div key={stat.label} className="velora-stat">
              <div className="velora-stat__value">
                <AnimatedCounter
                  value={stat.value}
                  decimals={String(stat.value).includes(".") ? 1 : 0}
                  suffix={stat.suffix}
                  active={active}
                />
              </div>
              <div className="velora-stat__label">{stat.label}</div>
              <p className="velora-stat__detail">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Configurator() {
  const [exteriorId, setExteriorId] = useState<(typeof exteriorOptions)[number]["id"]>(
    exteriorOptions[1].id,
  );
  const [interiorId, setInteriorId] = useState<(typeof interiorOptions)[number]["id"]>(
    interiorOptions[0].id,
  );
  const [wheelId, setWheelId] = useState<(typeof wheelOptions)[number]["id"]>(
    wheelOptions[0].id,
  );

  const exterior = exteriorOptions.find((o) => o.id === exteriorId) ?? exteriorOptions[0];
  const interior = interiorOptions.find((o) => o.id === interiorId) ?? interiorOptions[0];
  const wheel = wheelOptions.find((o) => o.id === wheelId) ?? wheelOptions[0];

  const price = useMemo(() => basePrice + wheel.priceDelta, [wheel.priceDelta]);

  return (
    <section className="velora-section" id="configure">
      <div className="velora-container">
        <p className="velora-eyebrow">Configurator</p>
        <h2 className="velora-display mt-4 text-[clamp(2.4rem,6vw,4.4rem)]">Compose your GT</h2>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-[var(--velora-silver-dim)]">
          Exterior, cabin, and wheelset update live. Every choice is a reaction—not a brochure
          checkbox.
        </p>

        <div className="velora-config mt-12">
          <div
            className="velora-config__preview"
            style={{ ["--config-glow" as string]: exterior.glow }}
          >
            <div className="velora-config__preview-glow" aria-hidden />
            <Image
              src={configImage}
              alt={`VELORA GT in ${exterior.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 960px) 100vw, 60vw"
              style={{ filter: exterior.filter, transform: `scale(${wheelId === "shadow22" ? 1.04 : 1.01})` }}
            />
            <div
              className="velora-config__wheel-ring"
              data-wheel={wheel.id}
              aria-hidden
            />
            <div className="velora-config__cabin">
              <span
                className="velora-config__cabin-swatch"
                style={{
                  background: `linear-gradient(135deg, ${interior.hex}, ${interior.accent})`,
                }}
              />
              <div>
                <p className="text-[0.65rem] tracking-[0.16em] uppercase text-[var(--velora-silver-dim)]">
                  Cabin
                </p>
                <p className="text-sm">{interior.name}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="velora-option-group">
              <p className="velora-option-group__label">Exterior</p>
              <div className="velora-swatches" role="group" aria-label="Exterior finish">
                {exteriorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="velora-swatch"
                    style={{ background: opt.hex }}
                    aria-label={opt.name}
                    aria-pressed={exteriorId === opt.id}
                    onClick={() => setExteriorId(opt.id)}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-[var(--velora-silver)]">{exterior.name}</p>
            </div>

            <div className="velora-option-group">
              <p className="velora-option-group__label">Interior</p>
              <div className="velora-swatches" role="group" aria-label="Interior material">
                {interiorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="velora-swatch"
                    style={{
                      background: `linear-gradient(145deg, ${opt.hex} 55%, ${opt.accent})`,
                    }}
                    aria-label={opt.name}
                    aria-pressed={interiorId === opt.id}
                    onClick={() => setInteriorId(opt.id)}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-[var(--velora-silver)]">{interior.description}</p>
            </div>

            <div className="velora-option-group">
              <p className="velora-option-group__label">Wheels</p>
              <div className="velora-wheel-list" role="group" aria-label="Wheel options">
                {wheelOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="velora-wheel-option"
                    aria-pressed={wheelId === opt.id}
                    onClick={() => setWheelId(opt.id)}
                  >
                    <span>
                      <span className="velora-wheel-option__name">{opt.name}</span>
                      <span className="velora-wheel-option__detail block">{opt.detail}</span>
                    </span>
                    <span className="text-xs tracking-[0.12em] uppercase text-[var(--velora-silver-dim)]">
                      {opt.priceDelta === 0
                        ? "Included"
                        : `+€${opt.priceDelta.toLocaleString()}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="velora-config__summary">
              <div>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-[var(--velora-silver-dim)]">
                  Build estimate
                </p>
                <p className="velora-config__price">€{price.toLocaleString()}</p>
                <p className="velora-config__build">
                  {exterior.name} · {interior.name} · {wheel.name}
                </p>
              </div>
              <a href="#drive" className="velora-btn velora-btn--solid">
                Reserve this build
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DriveForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="velora-section" id="drive">
      <div className="velora-container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="velora-eyebrow">Test drive</p>
            <h2 className="velora-display mt-4 text-[clamp(2.4rem,6vw,4.2rem)]">
              Feel the hush
              <br />
              at speed.
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--velora-silver-dim)]">
              Request a private session at a VELORA atelier. No showroom theater—just the road
              and the machine.
            </p>
          </div>

          <form className="velora-form" onSubmit={onSubmit}>
            <div className="velora-field">
              <label htmlFor="velora-name">Full name</label>
              <input id="velora-name" name="name" required autoComplete="name" />
            </div>
            <div className="velora-field">
              <label htmlFor="velora-email">Email</label>
              <input
                id="velora-email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="velora-field">
              <label htmlFor="velora-model">Preferred model</label>
              <select id="velora-model" name="model" defaultValue="GT Coupé">
                <option>GT Coupé</option>
                <option>GT Coupé Aero Pack</option>
                <option>GT Spyder (coming)</option>
              </select>
            </div>
            <div className="velora-field">
              <label htmlFor="velora-location">Atelier</label>
              <select id="velora-location" name="location" defaultValue={driveLocations[0]}>
                {driveLocations.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="velora-form__full">
              <button type="submit" className="velora-btn velora-btn--solid">
                Request a drive
                <span aria-hidden>→</span>
              </button>
              {submitted ? (
                <p className="velora-form__success" role="status">
                  Request received. A VELORA concierge will confirm your atelier session.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function VeloraPage() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    document.documentElement.classList.add("nav-theme-dark");
    return () => document.documentElement.classList.remove("nav-theme-dark");
  }, []);

  return (
    <div className="velora velora-shell">
      {/* Hero */}
      <section className="velora-hero" aria-label="VELORA hero">
        <div className="velora-hero__media">
          <Image
            src={heroImage}
            alt="VELORA GT Coupé in dramatic low light"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="velora-hero__veil" aria-hidden />
        <div className="velora-hero__grain" aria-hidden />

        <div className="velora-hero__content">
          <p className="velora-label mb-6">{veloraMeta.label}</p>
          <motion.h1
            className="velora-hero__brand"
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {veloraMeta.brand}
          </motion.h1>
          <motion.p
            className="velora-hero__headline"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {veloraMeta.heroHeadline}
          </motion.p>
          <motion.p
            className="velora-hero__support"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {veloraMeta.heroSupport}
          </motion.p>
          <motion.div
            className="velora-hero__actions"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#performance" className="velora-btn velora-btn--solid">
              Explore the GT
              <span aria-hidden>→</span>
            </a>
            <a href="#drive" className="velora-btn">
              Reserve a drive
            </a>
          </motion.div>
        </div>
      </section>

      {/* Model intro */}
      <section className="velora-section" id="model">
        <div className="velora-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div>
              <p className="velora-eyebrow">The GT Coupé</p>
              <h2 className="velora-display mt-4 text-[clamp(2.6rem,7vw,5rem)]">
                Proportion as
                <br />
                performance.
              </h2>
            </div>
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-[var(--velora-silver-dim)] lg:justify-self-end">
              VELORA builds grand tourers for drivers who want presence without noise. Long
              wheelbase. Low canopy. A silhouette that reads as velocity even when parked.
            </p>
          </div>
          <div className="velora-divider mt-14" />
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 text-[0.68rem] tracking-[0.18em] uppercase text-[var(--velora-silver-dim)]">
            <span>Rear-biased AWD</span>
            <span>612 hp hybrid</span>
            <span>Active aero</span>
            <span>2+2 grand tourer</span>
          </div>
        </div>
      </section>

      <CinemaSection reduced={reduced} />

      <PerformanceSection reduced={reduced} />

      {/* Exterior */}
      <section className="velora-section" id="exterior">
        <div className="velora-container">
          <div className="velora-split">
            <div className="velora-media-plane">
              <Image
                src={exteriorImage}
                alt="VELORA exterior sculpture on open road"
                fill
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="velora-eyebrow">Exterior</p>
              <h2 className="velora-display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
                Dark metal.
                <br />
                Clean edges.
              </h2>
              <div className="velora-point-list">
                {exteriorPoints.map((p) => (
                  <div key={p.title} className="velora-point">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aerodynamics */}
      <section className="velora-section" id="aero">
        <div className="velora-container">
          <div className="velora-split velora-split--reverse">
            <div className="velora-media-plane">
              <Image
                src={aeroImage}
                alt="VELORA rear aero and light signature"
                fill
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="velora-eyebrow">Aerodynamics</p>
              <h2 className="velora-display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
                Air managed.
                <br />
                Drama deferred.
              </h2>
              <div className="velora-point-list">
                {aeroPoints.map((p) => (
                  <div key={p.title} className="velora-point">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interior */}
      <section className="velora-section" id="interior">
        <div className="velora-container">
          <div className="velora-split">
            <div className="velora-media-plane">
              <Image
                src={interiorImage}
                alt="VELORA driver-focused cabin materials"
                fill
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="velora-eyebrow">Interior</p>
              <h2 className="velora-display mt-4 text-[clamp(2.2rem,5vw,3.6rem)]">
                Cabin as
                <br />
                instrument.
              </h2>
              <div className="velora-point-list">
                {interiorPoints.map((p) => (
                  <div key={p.title} className="velora-point">
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="velora-section" id="technology">
        <div className="velora-container">
          <p className="velora-eyebrow">Technology</p>
          <h2 className="velora-display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.2rem)]">
            Systems that stay out of the way.
          </h2>
          <div className="velora-tech-grid">
            {techFeatures.map((f, i) => (
              <motion.article
                key={f.title}
                className="velora-tech-item"
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Configurator />

      {/* Gallery */}
      <section className="velora-section" id="gallery">
        <div className="velora-container">
          <p className="velora-eyebrow">Gallery</p>
          <h2 className="velora-display mt-4 text-[clamp(2.4rem,6vw,4.2rem)]">Still frames</h2>
          <div className="velora-gallery mt-12">
            {gallery.map((shot) => (
              <figure key={shot.src} className="velora-gallery__item">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <figcaption className="velora-gallery__caption">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="velora-section" id="specs">
        <div className="velora-container">
          <p className="velora-eyebrow">Specifications</p>
          <h2 className="velora-display mt-4 text-[clamp(2.4rem,6vw,4.2rem)]">Technical brief</h2>
          <div className="velora-specs mt-12">
            {specs.map((group) => (
              <div key={group.group} className="velora-spec-group">
                <h3>{group.group}</h3>
                <dl>
                  {group.rows.map((row) => (
                    <div key={row.label} className="velora-spec-row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DriveForm />

      <ConceptCTA conceptName="Velora" tone="dark" />
    </div>
  );
}
