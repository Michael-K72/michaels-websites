import Link from "next/link";

export function ConceptCTA({
  conceptName,
  tone = "dark",
}: {
  conceptName: string;
  tone?: "dark" | "light" | "warm" | "navy";
}) {
  const styles = {
    dark: "bg-[#0a0a0a] text-[#f4f1ec] border-white/10",
    light: "bg-[#f7f7f5] text-[#111] border-black/10",
    warm: "bg-[#f3eee5] text-[#1c1915] border-black/10",
    navy: "bg-[#07111f] text-[#e8eef8] border-white/10",
  }[tone];

  return (
    <section className={`border-t px-6 py-24 md:py-32 ${styles}`}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="concept-label mb-5">Style concept · Not a client project</p>
        <h2 className="font-display text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.95]">
          Like this direction?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed opacity-65 md:text-base">
          {conceptName} is a demonstration of craft. Your brand would receive its own
          identity, structure, and experience—designed uniquely for you.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 border px-7 py-3.5 text-xs tracking-[0.2em] uppercase transition-transform hover:-translate-y-0.5"
          style={{ borderColor: "currentColor" }}
        >
          Start a project
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
