import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="page-pad min-h-screen bg-[#0b0b0b] text-[#f4f1ec]">
      <div className="mk-container max-w-3xl py-16">
        <h1 className="font-display text-5xl">Privacy</h1>
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/65">
          <p>
            This portfolio currently collects contact form information only when you
            choose to submit an inquiry. No analytics or advertising trackers are enabled
            by default in this demonstration build.
          </p>
          <p>
            Submitted data is used solely to respond to your request. Configure a privacy
            policy with counsel before production launch if you process personal data.
          </p>
          <p>
            Contact: hello@michaelkalachin.com
          </p>
        </div>
      </div>
    </div>
  );
}
