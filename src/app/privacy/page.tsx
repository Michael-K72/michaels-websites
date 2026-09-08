import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="page-pad min-h-screen bg-[#0B0D10] text-[#F2EEE7]">
      <div className="mk-container py-14 md:py-20">
        <article className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5 text-[#B9A584]/90">Legal</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[0.95] tracking-[-0.02em]">
            Privacy
          </h1>
          <div className="mt-10 space-y-8 border-t border-white/10 pt-10 text-[0.95rem] leading-[1.75] text-white/60">
            <p>
              This portfolio currently collects contact form information only when you
              choose to submit an inquiry. No analytics or advertising trackers are enabled
              by default in this demonstration build.
            </p>

            <section className="border border-white/10 bg-white/[0.02] px-5 py-6 md:px-6">
              <h2 className="mb-3 font-sans text-[0.65rem] tracking-[0.18em] uppercase text-white/45">
                How data is used
              </h2>
              <p>
                Submitted data is used solely to respond to your request. Configure a privacy
                policy with counsel before production launch if you process personal data.
              </p>
            </section>

            <p className="border-t border-white/10 pt-8">
              Contact:{" "}
              <a
                href="mailto:hello@michaelkalachin.com"
                className="text-[#B9A584] underline-offset-4 transition hover:underline"
              >
                hello@michaelkalachin.com
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
