"use client";

import Image from "next/image";
import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ConceptCTA } from "@/components/portfolio/ConceptCTA";
import {
  ELAN,
  destination,
  experiences,
  gallery,
  guestOptions,
  reserveTimes,
  restaurant,
  rooms,
  wellness,
} from "./data";
import "./elan.css";

const ease = [0.16, 1, 0.3, 1] as const;

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function plusDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDisplayDate(value: string) {
  if (!value) return "Select date";
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function ElanPage() {
  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(plusDaysISO(3));
  const [guests, setGuests] = useState<string>(guestOptions[1]);
  const [reserveDate, setReserveDate] = useState(plusDaysISO(1));
  const [reserveTime, setReserveTime] = useState<string>(reserveTimes[2]);
  const [party, setParty] = useState("2");
  const [toast, setToast] = useState<string | null>(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 140]);
  const heroScale = useTransform(scrollY, [0, 800], [1.08, 1.18]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const minCheckout = useMemo(() => {
    const d = new Date(`${checkIn}T12:00:00`);
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, [checkIn]);

  function showToast(message: string) {
    setToast(message);
  }

  function onSearchStay(e: FormEvent) {
    e.preventDefault();
    if (checkOut <= checkIn) {
      showToast("Please choose a check-out after check-in.");
      return;
    }
    showToast(`Searching availability · ${guests}`);
  }

  function onReserveTable(e: FormEvent) {
    e.preventDefault();
    showToast(`Table request sent · ${party} · ${reserveTime}`);
  }

  return (
    <div className="elan-root">
      <p className="elan-label elan-container" style={{ paddingTop: "7rem", marginBottom: 0 }}>
        {ELAN.label}
      </p>

      <section className="elan-hero" aria-label="Élan hero">
        <motion.div className="elan-hero__media" style={{ y: heroY }}>
          <motion.div
            className="elan-hero__scale"
            style={{ scale: heroScale }}
          >
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=80"
              alt="Élan lakeside terrace bathed in late afternoon light"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        <div className="elan-hero__veil" aria-hidden />

        <div className="elan-hero__content">
          <motion.p
            className="elan-label"
            style={{ color: "rgba(250,247,242,0.7)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            {ELAN.location}
          </motion.p>

          <motion.h1
            className="elan-hero__brand"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.12, ease }}
          >
            Élan
          </motion.h1>

          <motion.p
            className="elan-hero__headline"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.28, ease }}
          >
            Where the day softens.
          </motion.p>

          <motion.p
            className="elan-hero__support"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.42, ease }}
          >
            {ELAN.support}
          </motion.p>

          <motion.div
            className="elan-hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            <a href="#rooms" className="elan-btn elan-btn--solid" data-cursor="Rooms">
              Explore rooms
            </a>
            <a href="#stay" className="elan-btn elan-btn--ghost" data-cursor="Stay">
              Reserve a stay
            </a>
          </motion.div>
        </div>
      </section>

      <div className="elan-booking elan-container">
        <form
          className="elan-booking__bar"
          onSubmit={onSearchStay}
          aria-label="Search room availability"
        >
          <label className="elan-field">
            <span className="elan-field__label">Check-in</span>
            <input
              className="elan-field__control"
              type="date"
              name="check-in"
              value={checkIn}
              min={todayISO()}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut <= e.target.value) {
                  const next = new Date(`${e.target.value}T12:00:00`);
                  next.setDate(next.getDate() + 2);
                  setCheckOut(next.toISOString().slice(0, 10));
                }
              }}
              aria-label={`Check-in date, currently ${formatDisplayDate(checkIn)}`}
              required
            />
          </label>

          <label className="elan-field">
            <span className="elan-field__label">Check-out</span>
            <input
              className="elan-field__control"
              type="date"
              name="check-out"
              value={checkOut}
              min={minCheckout}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </label>

          <label className="elan-field">
            <span className="elan-field__label">Guests</span>
            <select
              className="elan-field__control"
              name="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              aria-label="Number of guests"
            >
              {guestOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="elan-booking__submit">
            <button type="submit" className="elan-btn elan-btn--forest" data-cursor="Search">
              Search
              <span aria-hidden>→</span>
            </button>
          </div>
        </form>
      </div>

      <section className="elan-section" aria-labelledby="elan-intro-title">
        <div className="elan-container">
          <Reveal className="elan-section__head">
            <p className="elan-label">The house</p>
            <h2 id="elan-intro-title" className="elan-section__title">
              Built for long evenings and soft mornings.
            </h2>
            <p className="elan-section__text">
              Élan is a lakeside residence where hospitality feels personal—stone floors,
              garden herbs, and staff who know when to appear and when to disappear.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="rooms" className="elan-section !pt-0" aria-labelledby="rooms-title">
        <div className="elan-container">
          <Reveal className="elan-section__head">
            <p className="elan-label">Rooms & suites</p>
            <h2 id="rooms-title" className="elan-section__title">
              Spaces with their own weather.
            </h2>
            <p className="elan-section__text">
              Four residences—each oriented to a different light, each finished with linen,
              timber, and the quiet of the lake.
            </p>
          </Reveal>

          {rooms.map((room) => (
            <article
              key={room.id}
              className={`elan-room${room.layout === "image-right" ? " elan-room--flip" : ""}`}
            >
              <Reveal className="elan-room__media" delay={0.05}>
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.2, ease }}
                >
                  <Image
                    src={room.image}
                    alt={`${room.name} — ${room.subtitle}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 960px) 100vw, 55vw"
                  />
                </motion.div>
              </Reveal>

              <Reveal className="elan-room__copy" delay={0.12}>
                <p className="elan-room__index">
                  {room.index} / 0{rooms.length}
                </p>
                <h3 className="elan-room__name">{room.name}</h3>
                <p className="elan-room__subtitle">{room.subtitle}</p>

                <dl className="elan-room__meta">
                  <div>
                    <dt>Size</dt>
                    <dd>{room.size}</dd>
                  </div>
                  <div>
                    <dt>Sleeps</dt>
                    <dd>{room.sleeps}</dd>
                  </div>
                  <div>
                    <dt>View</dt>
                    <dd>{room.view}</dd>
                  </div>
                  <div>
                    <dt>Rate</dt>
                    <dd>{room.rate}</dd>
                  </div>
                </dl>

                <p className="elan-room__desc">{room.description}</p>
                <ul className="elan-room__amenities">
                  {room.amenities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="#stay"
                    className="elan-btn elan-btn--forest"
                    data-cursor="Book"
                    style={{ minHeight: "2.75rem" }}
                  >
                    Inquire for {room.name}
                  </a>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section
        id="restaurant"
        className="elan-section"
        style={{ background: "var(--elan-white)" }}
        aria-labelledby="restaurant-title"
      >
        <div className="elan-container elan-restaurant">
          <Reveal>
            <div className="elan-restaurant__media">
              <Image
                src={restaurant.image}
                alt="Candlelit dining at Osteria Verde"
                fill
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="elan-label">Dining</p>
            <h2 id="restaurant-title" className="elan-section__title mt-3">
              {restaurant.name}
            </h2>
            <p className="mt-3 text-sm tracking-[0.14em] uppercase" style={{ color: "var(--elan-gold)" }}>
              {restaurant.hours} · Chef {restaurant.chef}
            </p>
            <p className="elan-section__text mt-5 !max-w-none">{restaurant.description}</p>

            <div className="elan-menu" role="list" aria-label="Menu preview">
              {restaurant.menu.map((item) => (
                <div className="elan-menu__item" role="listitem" key={item.name}>
                  <p className="elan-menu__name">{item.name}</p>
                  <p className="elan-menu__price">€{item.price}</p>
                  <p className="elan-menu__note">{item.note}</p>
                </div>
              ))}
            </div>

            <form className="elan-reserve" onSubmit={onReserveTable} aria-label="Reserve a table">
              <h3 className="elan-reserve__title">Reserve a table</h3>
              <div className="elan-reserve__grid">
                <label className="elan-field">
                  <span className="elan-field__label">Evening</span>
                  <input
                    className="elan-field__control"
                    type="date"
                    value={reserveDate}
                    min={todayISO()}
                    onChange={(e) => setReserveDate(e.target.value)}
                    required
                  />
                </label>
                <label className="elan-field">
                  <span className="elan-field__label">Time</span>
                  <select
                    className="elan-field__control"
                    value={reserveTime}
                    onChange={(e) => setReserveTime(e.target.value)}
                  >
                    {reserveTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="elan-field">
                  <span className="elan-field__label">Party</span>
                  <select
                    className="elan-field__control"
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    aria-label="Party size"
                  >
                    {["1", "2", "3", "4", "5", "6"].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === "1" ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </label>
                <button type="submit" className="elan-btn elan-btn--forest" data-cursor="Reserve">
                  Request table
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section
        id="wellness"
        className="elan-section elan-section--forest"
        aria-labelledby="wellness-title"
      >
        <div className="elan-container elan-wellness">
          <Reveal>
            <p className="elan-label">Wellness</p>
            <h2 id="wellness-title" className="elan-section__title mt-3">
              {wellness.title}
            </h2>
            <p className="elan-section__text mt-5">{wellness.description}</p>

            <div className="mt-8">
              {wellness.rituals.map((ritual) => (
                <div className="elan-ritual" key={ritual.name}>
                  <p className="elan-ritual__name">{ritual.name}</p>
                  <p className="elan-ritual__duration">{ritual.duration}</p>
                  <p className="elan-ritual__note">{ritual.note}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="elan-restaurant__media" style={{ aspectRatio: "4 / 5" }}>
              <Image
                src={wellness.image}
                alt="Quiet stone bath house at Élan"
                fill
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="destination"
        className="elan-section"
        aria-labelledby="destination-title"
      >
        <div className="elan-container elan-destination">
          <Reveal>
            <p className="elan-label">Destination</p>
            <h2 id="destination-title" className="elan-section__title mt-3">
              {destination.title}
            </h2>
            <p className="elan-section__text mt-5">{destination.description}</p>
            <ul className="elan-destination__points">
              {destination.points.map((point) => (
                <li key={point.label}>
                  <strong>{point.label}</strong>
                  <span>{point.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="elan-restaurant__media" style={{ aspectRatio: "5 / 6" }}>
              <Image
                src={destination.image}
                alt="Lake Como shoreline near Élan"
                fill
                className="object-cover"
                sizes="(max-width: 960px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="experiences"
        className="elan-section elan-section--ink"
        aria-labelledby="experiences-title"
      >
        <div className="elan-container">
          <Reveal className="elan-section__head">
            <p className="elan-label">A day at Élan</p>
            <h2 id="experiences-title" className="elan-section__title">
              Moments that ask for nothing.
            </h2>
            <p className="elan-section__text">
              Optional rhythms—kept light so your stay can wander.
            </p>
          </Reveal>

          <div className="elan-experiences">
            {experiences.map((item, i) => (
              <Reveal key={item.id} delay={0.08 * i} className="elan-experience">
                <div className="elan-experience__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <p className="elan-experience__time">{item.time}</p>
                  <h3 className="elan-experience__title">{item.title}</h3>
                  <p className="elan-experience__desc">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="elan-section" aria-labelledby="gallery-title">
        <div className="elan-container">
          <Reveal className="elan-section__head">
            <p className="elan-label">Atmosphere</p>
            <h2 id="gallery-title" className="elan-section__title">
              Immersive gallery
            </h2>
            <p className="elan-section__text">
              Light across stone, linen, water—fragments of a slower day.
            </p>
          </Reveal>

          <div className="elan-gallery">
            {gallery.map((shot, i) => (
              <Reveal key={shot.src} delay={0.04 * i} className="elan-gallery__item">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.1, ease }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <span className="elan-gallery__caption">{shot.caption}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="stay" className="elan-section elan-section--forest" aria-labelledby="stay-title">
        <div className="elan-container">
          <Reveal className="elan-stay">
            <p className="elan-label">Reservations</p>
            <h2 id="stay-title" className="elan-stay__title mt-4">
              Come when the lake is quiet.
            </h2>
            <p className="elan-stay__text">
              Share your dates and we will hold a room with care—confirmation within a day,
              no pressure, no noise.
            </p>
            <div className="elan-stay__actions">
              <a href="#rooms" className="elan-btn elan-btn--solid" data-cursor="Rooms">
                View rooms
              </a>
              <a
                href={`mailto:${ELAN.email}?subject=Stay%20inquiry%20—%20Élan`}
                className="elan-btn elan-btn--ghost"
                data-cursor="Write"
              >
                Write to Élan
              </a>
            </div>
            <p className="mt-8 text-xs tracking-[0.16em] uppercase opacity-55">
              {ELAN.phone} · {ELAN.email}
            </p>
          </Reveal>
        </div>
      </section>

      <ConceptCTA conceptName="Élan" tone="warm" />

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="elan-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
