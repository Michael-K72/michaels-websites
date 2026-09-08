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

const fieldClass =
  "w-full border border-white/15 bg-transparent px-4 py-3.5 text-[#F2EEE7] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/25 focus:border-[#B9A584]/70 focus:shadow-[0_0_0_1px_rgba(185,165,132,0.35)]";

const selectClass =
  "w-full border border-white/15 bg-[#0B0D10] px-4 py-3.5 text-[#F2EEE7] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[#B9A584]/70 focus:shadow-[0_0_0_1px_rgba(185,165,132,0.35)]";

const labelClass =
  "mb-2.5 block text-[0.65rem] tracking-[0.16em] uppercase text-white/45";

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
    <div className="page-pad min-h-screen bg-[#0B0D10] text-[#F2EEE7]">
      <div className="mk-container py-12 md:py-20">
        <header className="max-w-3xl">
          <p className="eyebrow mb-5 text-[#B9A584]/90">Contact</p>
          <h1 className="font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.92] tracking-[-0.03em]">
            Let&apos;s build
            <br />
            something worth
            <br />
            remembering.
          </h1>
          <p className="mt-7 max-w-lg text-[0.95rem] leading-[1.7] text-white/55 md:text-base">
            Tell me about your brand, the direction that resonates, and the experience you
            want to create. I reply personally.
          </p>
        </header>

        {sent ? (
          <div
            className="mt-14 max-w-2xl border border-[#B9A584]/35 bg-[#B9A584]/[0.06] p-8 md:mt-20 md:p-12"
            role="status"
            aria-live="polite"
          >
            <div className="mb-6 flex h-10 w-10 items-center justify-center border border-[#B9A584]/50 text-[#B9A584]">
              <span aria-hidden className="text-lg leading-none">
                ✓
              </span>
            </div>
            <p className="eyebrow mb-4 text-[#B9A584]">Inquiry noted</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05]">
              Thank you, {form.name}.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 md:text-[0.95rem]">
              Your details are ready on this page—this demo does not send email yet. I&apos;ll
              follow up at <span className="text-[#F2EEE7]">{form.email}</span>, or reach me
              directly at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-[#B9A584] underline-offset-4 transition hover:underline"
              >
                {SITE.email}
              </a>
              .
            </p>
            <button
              type="button"
              className="mt-10 border border-white/25 px-6 py-3.5 text-xs tracking-[0.18em] uppercase transition hover:border-[#B9A584]/60 hover:text-[#B9A584]"
              onClick={() => {
                setSent(false);
                setForm(initial);
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-12 grid w-full max-w-3xl gap-5 sm:gap-6 md:mt-16 md:grid-cols-2"
            noValidate
          >
            {(
              [
                ["name", "Name", "text"],
                ["email", "Email", "email"],
                ["company", "Company", "text"],
                ["websiteType", "Website type", "text"],
              ] as const
            ).map(([key, label, type]) => (
              <label key={key} className="block w-full text-sm">
                <span className={labelClass}>{label}</span>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  className={fieldClass}
                  autoComplete={
                    key === "name" ? "name" : key === "email" ? "email" : key === "company" ? "organization" : undefined
                  }
                />
                {errors[key] ? (
                  <span className="mt-2 block text-xs text-red-300/90">{errors[key]}</span>
                ) : null}
              </label>
            ))}

            <label className="block w-full text-sm">
              <span className={labelClass}>Industry</span>
              <select
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>

            <label className="block w-full text-sm">
              <span className={labelClass}>Preferred style</span>
              <select
                value={form.preferredStyle}
                onChange={(e) => update("preferredStyle", e.target.value)}
                className={selectClass}
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

            <label className="block w-full text-sm">
              <span className={labelClass}>Budget range</span>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block w-full text-sm">
              <span className={labelClass}>Timeline</span>
              <select
                value={form.timeline}
                onChange={(e) => update("timeline", e.target.value)}
                className={selectClass}
              >
                <option value="">Select</option>
                {timelines.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block w-full text-sm md:col-span-2">
              <span className={labelClass}>Message</span>
              <textarea
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${fieldClass} resize-y`}
              />
              {errors.message ? (
                <span className="mt-2 block text-xs text-red-300/90">{errors.message}</span>
              ) : null}
            </label>

            <div className="pt-2 md:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 border border-white/30 px-8 py-4 text-xs tracking-[0.2em] uppercase transition hover:-translate-y-0.5 hover:border-[#B9A584]/70 hover:text-[#B9A584] sm:w-auto"
              >
                Send inquiry
                <span aria-hidden>→</span>
              </button>
              <p className="mt-4 text-xs leading-relaxed text-white/35">
                Form validation runs locally. Email delivery is not connected in this demo.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
