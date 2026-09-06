"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { ConceptCTA } from "@/components/portfolio/ConceptCTA";
import {
  amenities,
  architecturePillars,
  auraBrand,
  availabilityNotes,
  gallery,
  locations,
  properties,
  signatureProperty,
  type AuraProperty,
} from "./data";
import "./aura.css";

const ease: Transition["ease"] = [0.16, 1, 0.3, 1];

type FormState = {
  name: string;
  email: string;
  phone: string;
  residence: string;
  date: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  residence: signatureProperty.id,
  date: "",
  message: "",
};

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please share your name.";
  if (!values.email.trim()) {
    errors.email = "An email is required to confirm the viewing.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.residence) errors.residence = "Select a residence of interest.";
  if (!values.message.trim() || values.message.trim().length < 12) {
    errors.message = "A brief note helps us prepare the appointment.";
  }
  return errors;
}

function formatArea(sqm: number) {
  return `${sqm.toLocaleString("en-CH")} m²`;
}

function PropertyMeta({ property }: { property: AuraProperty }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:grid-cols-4">
      {[
        { label: "Interior", value: formatArea(property.interiorSqm) },
        {
          label: "Terrace",
          value: property.terraceSqm ? formatArea(property.terraceSqm) : "—",
        },
        { label: "Bedrooms", value: String(property.bedrooms) },
        { label: "Completed", value: String(property.year) },
      ].map((item) => (
        <div key={item.label}>
          <dt className="aura-label mb-1.5">{item.label}</dt>
          <dd className="aura-serif text-xl tracking-normal">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function AuraPage() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(properties[0].id);
  const [mapId, setMapId] = useState(locations[0].id);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const active = properties.find((p) => p.id === activeId) ?? properties[0];
  const mapLocation = locations.find((l) => l.id === mapId) ?? locations[0];
  const fadeUp = reduceMotion
    ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
      };

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  }

  return (
    <div className="aura-root">
      {/* 01 Hero */}
      <section className="aura-hero" aria-label="Aura hero">
        <motion.div
          className="aura-hero__media"
          initial={reduceMotion ? false : { scale: 1 }}
          animate={reduceMotion ? undefined : { scale: 1.1 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"
            alt="Quiet luxury architectural residence at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="aura-hero__veil" />
        <div className="aura-hero__content">
          <div className="aura-container">
            <p className="aura-label mb-6 text-[rgba(246,241,232,0.65)]">
              {auraBrand.conceptLabel}
            </p>
            <motion.h1
              className="aura-display max-w-4xl text-[clamp(4.2rem,14vw,9.5rem)] text-[#f6f1e8]"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
            >
              {auraBrand.wordmark}
            </motion.h1>
            <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-base leading-relaxed text-[rgba(246,241,232,0.78)] md:text-lg">
                {auraBrand.tagline}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="#residences" className="aura-btn aura-btn--light">
                  View residences
                  <span aria-hidden>→</span>
                </a>
                <p className="aura-label text-[rgba(246,241,232,0.55)]">
                  Alpine · Riviera · Private
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Intro */}
      <section className="aura-section" aria-labelledby="aura-intro">
        <div className="aura-container">
          <motion.div
            {...fadeUp}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"
          >
            <div>
              <p className="aura-label mb-5">The house</p>
              <h2 id="aura-intro" className="aura-display text-[clamp(2.4rem,6vw,4.2rem)]">
                Architecture that knows when to be quiet.
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="aura-lede">{auraBrand.intro}</p>
              <hr className="aura-rule mt-10 mb-8" />
              <div className="flex flex-wrap gap-x-10 gap-y-3 text-xs tracking-[0.16em] uppercase text-[var(--aura-soft)]">
                <span>Switzerland</span>
                <span>Monaco</span>
                <span>Côte d’Azur</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 03 Featured Residences */}
      <section id="residences" className="aura-property-stage" aria-labelledby="aura-residences">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="aura-property-stage__image"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.75, ease }}
          >
            <Image
              src={active.image}
              alt={active.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="aura-property-stage__veil" />

        <div className="relative z-10 flex min-h-[min(88vh,920px)] flex-col justify-between px-[max(1.25rem,calc((100%-1180px)/2))] py-12 md:py-16">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="aura-label mb-3 text-[rgba(243,238,229,0.55)]">Featured residences</p>
              <h2 id="aura-residences" className="aura-display text-[clamp(2rem,5vw,3.4rem)]">
                A curated folio
              </h2>
            </div>
            <p className="hidden max-w-[14rem] text-right text-xs leading-relaxed text-[rgba(243,238,229,0.5)] md:block">
              Select a name to reveal the residence. No cards—only the house, its place, and its
              measure.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
            <ul className="space-y-0" role="tablist" aria-label="Residences">
              {properties.map((property, index) => {
                const isActive = property.id === active.id;
                return (
                  <li key={property.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveId(property.id)}
                      className="group flex w-full items-baseline gap-4 border-t border-[rgba(243,238,229,0.18)] py-4 text-left transition-opacity"
                      style={{ opacity: isActive ? 1 : 0.42 }}
                    >
                      <span className="w-8 shrink-0 text-[0.65rem] tracking-[0.18em] text-[rgba(243,238,229,0.45)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="aura-serif block text-[clamp(1.6rem,3.5vw,2.35rem)] leading-none tracking-[-0.02em]">
                          {property.name}
                        </span>
                        <span className="mt-2 block text-[0.68rem] tracking-[0.14em] uppercase text-[rgba(243,238,229,0.5)]">
                          {property.subtitle}
                        </span>
                      </span>
                      {isActive ? (
                        <span className="hidden text-[var(--aura-champagne)] sm:inline" aria-hidden>
                          —
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
              <div className="border-t border-[rgba(243,238,229,0.18)]" />
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-detail"}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease }}
                className="max-w-xl lg:justify-self-end"
              >
                <p className="aura-status mb-4">
                  <span className="aura-status__dot" />
                  {active.status}
                </p>
                <p className="text-sm leading-relaxed text-[rgba(243,238,229,0.78)] md:text-base">
                  {active.summary}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-5 border-t border-[rgba(243,238,229,0.18)] pt-6 text-sm">
                  <div>
                    <p className="aura-label mb-1 text-[rgba(243,238,229,0.45)]">Location</p>
                    <p>
                      {active.location}
                      <br />
                      <span className="text-[rgba(243,238,229,0.55)]">{active.country}</span>
                    </p>
                  </div>
                  <div>
                    <p className="aura-label mb-1 text-[rgba(243,238,229,0.45)]">Guide price</p>
                    <p className="aura-serif text-2xl tracking-normal">{active.price}</p>
                  </div>
                  <div>
                    <p className="aura-label mb-1 text-[rgba(243,238,229,0.45)]">Scale</p>
                    <p>{formatArea(active.interiorSqm)} interior</p>
                  </div>
                  <div>
                    <p className="aura-label mb-1 text-[rgba(243,238,229,0.45)]">Orientation</p>
                    <p>{active.orientation}</p>
                  </div>
                </div>
                <a href="#viewing" className="aura-btn aura-btn--light mt-8">
                  Request private viewing
                  <span aria-hidden>→</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 04 Signature Property */}
      <section className="aura-section" aria-labelledby="aura-signature">
        <div className="aura-container">
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="aura-label mb-4">Signature residence</p>
              <h2 id="aura-signature" className="aura-display text-[clamp(2.6rem,7vw,4.8rem)]">
                {signatureProperty.name}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--aura-muted)]">
              {signatureProperty.subtitle} · {signatureProperty.country}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[16/11] lg:aspect-auto lg:min-h-[640px]">
              <Image
                src={signatureProperty.image}
                alt={`${signatureProperty.name} exterior`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="aura-status mb-6">
                <span className="aura-status__dot" />
                {signatureProperty.status} · {signatureProperty.price}
              </p>
              <p className="aura-serif text-[clamp(1.35rem,2.5vw,1.75rem)] leading-[1.45] tracking-normal text-[var(--aura-ink)]">
                {signatureProperty.narrative}
              </p>
              <ul className="mt-10 space-y-3 border-t border-[var(--aura-line)] pt-8">
                {signatureProperty.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--aura-muted)]"
                  >
                    <span className="mt-2 h-px w-4 shrink-0 bg-[var(--aura-champagne)]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 Specs */}
      <section className="aura-section--tight border-y border-[var(--aura-line)] bg-[var(--aura-cream)]" aria-labelledby="aura-specs">
        <div className="aura-container py-16 md:py-20">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="aura-label mb-3">Specifications</p>
              <h2 id="aura-specs" className="aura-display text-[clamp(2rem,5vw,3.2rem)]">
                Measured, not marketed
              </h2>
            </div>
            <p className="max-w-xs text-sm text-[var(--aura-muted)]">
              Figures for {signatureProperty.name}. Full surveys available under confidentiality.
            </p>
          </div>
          <PropertyMeta property={signatureProperty} />
          <div className="mt-12 grid gap-6 border-t border-[var(--aura-line)] pt-10 md:grid-cols-3">
            {[
              {
                label: "Plot",
                value: signatureProperty.plotSqm
                  ? formatArea(signatureProperty.plotSqm)
                  : "Shared grounds",
              },
              { label: "Bathrooms", value: String(signatureProperty.bathrooms) },
              { label: "Orientation", value: signatureProperty.orientation },
            ].map((item) => (
              <div key={item.label}>
                <p className="aura-label mb-2">{item.label}</p>
                <p className="aura-serif text-2xl tracking-normal md:text-3xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 Architecture story */}
      <section className="aura-section" aria-labelledby="aura-architecture">
        <div className="aura-container">
          <motion.div
            {...fadeUp}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="aura-label mb-5">Architecture</p>
            <h2
              id="aura-architecture"
              className="aura-display max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)]"
            >
              Stillness as a design brief.
            </h2>
            <p className="aura-lede mt-8">{auraBrand.architecture}</p>
          </motion.div>

          <div className="mt-16 grid gap-0 border-t border-[var(--aura-line)] md:grid-cols-3">
            {architecturePillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="border-[var(--aura-line)] py-10 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <p className="aura-label mb-5">0{index + 1}</p>
                <h3 className="aura-serif text-2xl leading-snug tracking-normal md:text-[1.65rem]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--aura-muted)]">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 Location */}
      <section className="aura-section bg-[var(--aura-warm)]" aria-labelledby="aura-location">
        <div className="aura-container">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="aura-label mb-4">Geography</p>
              <h2 id="aura-location" className="aura-display text-[clamp(2.3rem,5.5vw,3.8rem)]">
                An arc of private places
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--aura-muted)] lg:justify-self-end">
              From Geneva’s west light to Cap Ferrat’s pines—Aura’s map is intentional, not
              exhaustive. Each pin marks a climate of living, not a market listing.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="aura-map min-h-[380px] md:min-h-[460px]" role="img" aria-label="Stylized map of Aura locations">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  className="aura-map__pin"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  data-active={loc.id === mapId}
                  aria-label={loc.name}
                  aria-pressed={loc.id === mapId}
                  onClick={() => setMapId(loc.id)}
                />
              ))}
              <div className="absolute right-5 bottom-5 left-5 z-10 flex items-end justify-between gap-4">
                <p className="aura-label">Aura territories</p>
                <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[var(--aura-soft)]">
                  Schematic · not to scale
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-[var(--aura-line)] bg-[var(--aura-ivory)] p-7 md:p-9">
              <div>
                <p className="aura-label mb-3">{mapLocation.region}</p>
                <h3 className="aura-serif text-3xl tracking-normal md:text-4xl">{mapLocation.name}</h3>
                <p className="mt-5 text-sm leading-relaxed text-[var(--aura-muted)]">
                  {mapLocation.character}
                </p>
              </div>
              <div className="mt-10 border-t border-[var(--aura-line)] pt-6">
                <p className="aura-label mb-2">Access</p>
                <p className="text-sm">{mapLocation.travel}</p>
                <ul className="mt-8 space-y-2">
                  {locations.map((loc) => (
                    <li key={loc.id}>
                      <button
                        type="button"
                        onClick={() => setMapId(loc.id)}
                        className="flex w-full items-center justify-between border-b border-[var(--aura-line)] py-2.5 text-left text-sm transition-opacity"
                        style={{ opacity: loc.id === mapId ? 1 : 0.45 }}
                      >
                        <span>{loc.name}</span>
                        <span className="text-xs tracking-[0.12em] uppercase text-[var(--aura-soft)]">
                          {loc.region}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 Amenities */}
      <section className="aura-section" aria-labelledby="aura-amenities">
        <div className="aura-container">
          <div className="mb-14 max-w-2xl">
            <p className="aura-label mb-4">Stewardship</p>
            <h2 id="aura-amenities" className="aura-display text-[clamp(2.3rem,5.5vw,3.8rem)]">
              Beyond the keys
            </h2>
            <p className="aura-lede mt-6">
              Ownership with Aura includes a quiet infrastructure of care—so the residence remains
              as composed in year ten as on the day of arrival.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((item, index) => (
              <article key={item.id} className="border-t border-[var(--aura-line)] pt-6">
                <p className="aura-label mb-4">0{index + 1}</p>
                <h3 className="aura-serif text-2xl tracking-normal">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--aura-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 09 Gallery */}
      <section className="aura-section--tight pb-24 md:pb-32" aria-labelledby="aura-gallery">
        <div className="aura-container-wide">
          <div className="aura-container mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="aura-label mb-3">Material study</p>
              <h2 id="aura-gallery" className="aura-display text-[clamp(2.2rem,5vw,3.5rem)]">
                Light, stone, silence
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="aura-btn aura-btn--ghost px-4 py-3"
                aria-label="Previous gallery image"
                onClick={() =>
                  setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)
                }
              >
                ←
              </button>
              <p className="aura-label min-w-[4.5rem] text-center">
                {String(galleryIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                className="aura-btn aura-btn--ghost px-4 py-3"
                aria-label="Next gallery image"
                onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
              >
                →
              </button>
            </div>
          </div>

          <div className="relative mb-8 aspect-[16/10] overflow-hidden md:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={gallery[galleryIndex].id}
                className="absolute inset-0"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <Image
                  src={gallery[galleryIndex].src}
                  alt={gallery[galleryIndex].caption}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(28,25,21,0.55)] to-transparent p-6 md:p-8">
              <p className="text-sm text-[#f6f1e8]">{gallery[galleryIndex].caption}</p>
            </div>
          </div>

          <div className="aura-gallery-grid">
            {gallery.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGalleryIndex(index)}
                className={`aura-gallery-grid__item--${item.aspect} group relative aspect-[4/3] overflow-hidden`}
                aria-label={`Show: ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span
                  className="absolute inset-0 bg-[rgba(28,25,21,0.15)] transition-opacity"
                  style={{ opacity: galleryIndex === index ? 0 : 0.28 }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Availability */}
      <section
        className="border-y border-[var(--aura-line)] bg-[var(--aura-charcoal)] text-[var(--aura-ivory)]"
        aria-labelledby="aura-availability"
      >
        <div className="aura-container py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="aura-label mb-5 text-[rgba(239,232,220,0.5)]">Availability</p>
              <h2 id="aura-availability" className="aura-display text-[clamp(2.4rem,6vw,4rem)]">
                Few homes.
                <br />
                Fewer introductions.
              </h2>
              <p className="mt-7 max-w-md text-sm leading-relaxed text-[rgba(239,232,220,0.62)] md:text-base">
                {auraBrand.viewingNote}
              </p>
            </div>
            <dl className="space-y-0 self-end">
              {availabilityNotes.map((note) => (
                <div
                  key={note.label}
                  className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-[rgba(239,232,220,0.14)] py-5 md:grid-cols-[11rem_1fr]"
                >
                  <dt className="aura-label text-[rgba(239,232,220,0.45)]">{note.label}</dt>
                  <dd className="text-sm leading-relaxed md:text-base">{note.value}</dd>
                </div>
              ))}
              <div className="border-t border-[rgba(239,232,220,0.14)]" />
            </dl>
          </div>
        </div>
      </section>

      {/* 11 Private viewing form */}
      <section id="viewing" className="aura-section" aria-labelledby="aura-viewing">
        <div className="aura-container">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="aura-label mb-4">Private viewing</p>
              <h2 id="aura-viewing" className="aura-display text-[clamp(2.4rem,6vw,4rem)]">
                Arrange an introduction
              </h2>
              <p className="aura-lede mt-6">
                Share a few particulars. A principal advisor responds within one business day—never
                a generic mailbox.
              </p>
              <p className="mt-8 text-xs leading-relaxed tracking-[0.04em] text-[var(--aura-soft)]">
                Demonstration form for this style concept. Submissions stay on this page and are
                not transmitted.
              </p>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[var(--aura-line)] bg-[var(--aura-cream)] px-8 py-12 md:px-10"
                >
                  <p className="aura-label mb-4 text-[var(--aura-champagne)]">Request received</p>
                  <h3 className="aura-serif text-3xl tracking-normal">Thank you, {form.name.trim()}.</h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--aura-muted)]">
                    In a live engagement, your viewing request for{" "}
                    {properties.find((p) => p.id === form.residence)?.name ?? "the selected residence"}{" "}
                    would be confirmed privately by email. This concept ends the journey here—with
                    composure intact.
                  </p>
                  <button
                    type="button"
                    className="aura-btn aura-btn--ghost mt-10"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                      setErrors({});
                    }}
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label htmlFor="aura-name" className="aura-label mb-2 block">
                        Full name
                      </label>
                      <input
                        id="aura-name"
                        name="name"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={`aura-field ${errors.name ? "aura-field--error" : ""}`}
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "aura-name-error" : undefined}
                      />
                      {errors.name ? (
                        <p id="aura-name-error" className="aura-error">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label htmlFor="aura-email" className="aura-label mb-2 block">
                        Email
                      </label>
                      <input
                        id="aura-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={`aura-field ${errors.email ? "aura-field--error" : ""}`}
                        placeholder="you@atelier.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "aura-email-error" : undefined}
                      />
                      {errors.email ? (
                        <p id="aura-email-error" className="aura-error">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label htmlFor="aura-phone" className="aura-label mb-2 block">
                        Telephone <span className="normal-case tracking-normal opacity-60">(optional)</span>
                      </label>
                      <input
                        id="aura-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="aura-field"
                        placeholder="+41 …"
                      />
                    </div>
                    <div>
                      <label htmlFor="aura-date" className="aura-label mb-2 block">
                        Preferred date <span className="normal-case tracking-normal opacity-60">(optional)</span>
                      </label>
                      <input
                        id="aura-date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={(e) => updateField("date", e.target.value)}
                        className="aura-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="aura-residence" className="aura-label mb-2 block">
                      Residence of interest
                    </label>
                    <select
                      id="aura-residence"
                      name="residence"
                      value={form.residence}
                      onChange={(e) => updateField("residence", e.target.value)}
                      className={`aura-field ${errors.residence ? "aura-field--error" : ""}`}
                      aria-invalid={Boolean(errors.residence)}
                    >
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.location}
                        </option>
                      ))}
                    </select>
                    {errors.residence ? (
                      <p className="aura-error">{errors.residence}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="aura-message" className="aura-label mb-2 block">
                      Note to the advisor
                    </label>
                    <textarea
                      id="aura-message"
                      name="message"
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={`aura-field aura-textarea ${errors.message ? "aura-field--error" : ""}`}
                      placeholder="Timing, privacy preferences, or questions about the residence…"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "aura-message-error" : undefined}
                    />
                    {errors.message ? (
                      <p id="aura-message-error" className="aura-error">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <button type="submit" className="aura-btn">
                      Request viewing
                      <span aria-hidden>→</span>
                    </button>
                    <Link
                      href="/contact"
                      className="text-xs tracking-[0.16em] uppercase text-[var(--aura-muted)] underline-offset-4 hover:underline"
                    >
                      Or contact Michael directly
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 12 Concept CTA */}
      <ConceptCTA conceptName="Aura" tone="warm" />
    </div>
  );
}
