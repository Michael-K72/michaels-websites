import Link from "next/link";
import { SITE } from "@/data/concepts";

export function HomeHero() {
  return (
    <section className="home-hero home-section" aria-labelledby="home-hero-title">
      <div className="home-shell home-hero__grid">
        <div>
          <p className="home-eyebrow">{SITE.availability}</p>
          <h1 id="home-hero-title" className="home-hero__title">
            Michael
            <br />
            Kalachin
          </h1>
        </div>
        <div>
          <p className="home-hero__lede">
            I design and develop distinctive websites for companies—experiences that
            feel considered, interactive, and ready for real brands.
          </p>
          <div className="home-hero__actions">
            <a href="#gallery" className="home-btn home-btn--solid">
              View projects
              <span aria-hidden>→</span>
            </a>
            <Link href="/contact" className="home-btn home-btn--ghost">
              Inquire
            </Link>
          </div>
          <div className="home-hero__meta">
            <span>Web design</span>
            <span>Development</span>
            <span>Motion</span>
            <span>Interaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
