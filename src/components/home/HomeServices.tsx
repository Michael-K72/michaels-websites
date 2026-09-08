import Link from "next/link";
import { SITE } from "@/data/concepts";

const services = [
  {
    title: "Direction",
    body: "Visual identity for the web—structure, tone, and a clear first impression that fits your brand.",
  },
  {
    title: "Interaction",
    body: "Motion and interface that guide attention without noise: galleries, configurators, and scroll storytelling.",
  },
  {
    title: "Build",
    body: "Production-ready Next.js sites with careful typography, performance, and maintainable front-end craft.",
  },
];

const steps = [
  {
    n: "01",
    title: "Brief",
    body: "Goals, audience, references, and constraints—so the direction is shared before pixels.",
  },
  {
    n: "02",
    title: "Concept",
    body: "A focused experience proposal: layout, motion, and the moments that sell the brand.",
  },
  {
    n: "03",
    title: "Design & build",
    body: "Iterative design into a working site—responsive, accessible, and ready to launch.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Polish, handoff, and support so the site feels finished under real traffic.",
  },
];

export function HomeServices() {
  return (
    <section className="home-content home-section" aria-labelledby="home-services-title">
      <div className="home-shell">
        <p className="home-eyebrow">Offer</p>
        <h2 id="home-services-title" className="home-content__title">
          Websites that feel intentional
        </h2>
        <p className="home-content__lede">
          I work as a solo designer and developer for companies that want a distinctive
          digital presence—not a template with extra steps.
        </p>

        <div className="home-services">
          {services.map((s) => (
            <article key={s.title} className="home-service">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>

        <p className="home-eyebrow" style={{ marginTop: "3.5rem" }}>
          Process
        </p>
        <h2 className="home-content__title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
          From brief to launch
        </h2>
        <div className="home-steps">
          {steps.map((step) => (
            <article key={step.n} className="home-step">
              <p className="home-step__n">{step.n}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>

        <div className="home-about">
          <div>
            <p className="home-eyebrow">About</p>
            <h2 className="home-content__title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
              {SITE.name}
            </h2>
          </div>
          <div>
            <p className="home-content__lede">
              The five showcases on this site are style concepts—demonstrations of how
              different industries can feel online. Your project would receive its own
              identity, structure, and interaction language.
            </p>
            <div className="home-about__actions" style={{ marginTop: "1.5rem" }}>
              <Link href="/contact" className="home-btn home-btn--solid">
                Start a project
                <span aria-hidden>→</span>
              </Link>
              <a href={`mailto:${SITE.email}`} className="home-btn home-btn--ghost">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
