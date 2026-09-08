import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="page-pad min-h-screen bg-[#0B0D10] text-[#F2EEE7]">
      <div className="mk-container py-14 md:py-20">
        <article className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5 text-[#B9A584]/90">Legal</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,3.75rem)] leading-[0.95] tracking-[-0.02em]">
            Impressum
          </h1>
          <div className="mt-10 space-y-8 border-t border-white/10 pt-10 text-[0.95rem] leading-[1.75] text-white/60">
            <p>
              This website is a personal portfolio demonstration by Michael Kalachin.
              Legal entity details are placeholders and should be configured before public
              commercial launch.
            </p>

            <section className="border-l border-[#B9A584]/35 pl-5">
              <h2 className="mb-3 font-sans text-[0.65rem] tracking-[0.18em] uppercase text-white/45">
                Responsible party
              </h2>
              <p className="text-[#F2EEE7]/90">
                Michael Kalachin
                <br />
                <span className="text-white/50">[Street / City — configure]</span>
                <br />
                Email:{" "}
                <a
                  href="mailto:hello@michaelkalachin.com"
                  className="text-[#B9A584] underline-offset-4 transition hover:underline"
                >
                  hello@michaelkalachin.com
                </a>
              </p>
            </section>

            <p className="border-t border-white/10 pt-8">
              All five brand experiences (Aura, Velora, Monolith, Nova, Élan) are fictional
              interactive style concepts created for demonstration purposes only.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
