import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="page-pad min-h-screen bg-[#0b0b0b] text-[#f4f1ec]">
      <div className="mk-container max-w-3xl py-16">
        <h1 className="font-display text-5xl">Impressum</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/65">
          <p>
            This website is a personal portfolio demonstration by Michael Kalachin.
            Legal entity details are placeholders and should be configured before public
            commercial launch.
          </p>
          <p>
            <strong className="text-white">Responsible party:</strong>
            <br />
            Michael Kalachin
            <br />
            [Street / City — configure]
            <br />
            Email: hello@michaelkalachin.com
          </p>
          <p>
            All five brand experiences (Aura, Velora, Monolith, Nova, Élan) are fictional
            interactive style concepts created for demonstration purposes only.
          </p>
        </div>
      </div>
    </div>
  );
}
