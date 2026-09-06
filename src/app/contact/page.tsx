"use client";

import { FormEvent, useState } from "react";
import { CONCEPTS, SITE } from "@/data/concepts";

const industries = [
  "Real Estate",
  "Automotive",
  "Architecture",
  "Technology",
  "Hospitality",
  "Other",
];

const budgets = [
  "Under €10k",
  "€10k – €25k",
  "€25k – €50k",
  "€50k+",
  "Not sure yet",
];

const timelines = ["ASAP", "1–2 months", "3–6 months", "Flexible"];

type FormState = {
  name: string;
  email: string;
  company: string;
  industry: string;
  websiteType: string;
  preferredStyle: string;
  budget: string;
  timeline: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  industry: "",
  websiteType: "",
  preferredStyle: "",
  budget: "",
  timeline: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 12) {
      next.message = "Share a little more about your project.";
    }
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setSent(true);
  };

  return (
    <div className="page-pad min-h-screen bg-[#0b0b0b] text-[#f4f1ec]">
      <div className="mk-container py-10 md:py-16">
        <p className="eyebrow mb-6">Contact</p>
        <h1 className="font-display max-w-4xl text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.9] tracking-[-0.03em]">
          Let&apos;s build
          <br />
          something
          <br />
          worth remembering.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
          Tell me about your brand, the direction that resonates, and the experience you
          want to create. I reply personally.
        </p>

        {sent ? (
          <div className="mt-16 max-w-2xl border border-white/15 bg-white/[0.03] p-8 md:p-12">
            <p className="eyebrow mb-4 text-emerald-300/80">Message received</p>
            <h2 className="font-display text-4xl md:text-5xl">Thank you, {form.name}.</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              I&apos;ll review your note and respond at {form.email}. Meanwhile, explore the
              five directions or write again at {SITE.email}.
            </p>
            <button
              type="button"
              className="mt-8 border border-white/25 px-5 py-3 text-xs tracking-[0.18em] uppercase"
              onClick={() => {
                setSent(false);
                setForm(initial);
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-14 grid gap-6 md:grid-cols-2" noValidate>
            {(
              [
                ["name", "Name", "text"],
                ["email", "Email", "email"],
                ["company", "Company", "text"],
                ["websiteType", "Website type", "text"],
              ] as const
            ).map(([key, label, type]) => (
              <label key={key} className="block text-sm">
                <span className="mb-2 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                  {label}
                </span>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full border border-white/15 bg-transparent px-4 py-3 outline-none transition focus:border-white/45"
                />
                {errors[key] ? (
                  <span className="mt-2 block text-xs text-red-300">{errors[key]}</span>
                ) : null}
              </label>
            ))}

            <label className="block text-sm">
              <span className="mb-2 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                Industry
              </span>
              <select
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className="w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 outline-none"
              >
                <option value="">Select</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                Preferred style
              </span>
              <select
                value={form.preferredStyle}
                onChange={(e) => update("preferredStyle", e.target.value)}
                className="w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 outline-none"
              >
                <option value="">Select</option>
                {CONCEPTS.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name} — {c.industry}
                  </option>
                ))}
                <option value="Custom">Custom</option>
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                Budget range
              </span>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className="w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 outline-none"
              >
                <option value="">Select</option>
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                Timeline
              </span>
              <select
                value={form.timeline}
                onChange={(e) => update("timeline", e.target.value)}
                className="w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 outline-none"
              >
                <option value="">Select</option>
                {timelines.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm md:col-span-2">
              <span className="mb-2 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45">
                Message
              </span>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full resize-y border border-white/15 bg-transparent px-4 py-3 outline-none transition focus:border-white/45"
              />
              {errors.message ? (
                <span className="mt-2 block text-xs text-red-300">{errors.message}</span>
              ) : null}
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-3 border border-white/30 px-8 py-4 text-xs tracking-[0.2em] uppercase transition hover:-translate-y-0.5"
              >
                Send inquiry
                <span aria-hidden>→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
