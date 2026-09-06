import type { Metadata } from "next";
import {
  fontAuraSans,
  fontAuraSerif,
  fontBody,
  fontDisplay,
  fontElan,
  fontSans,
  fontVelora,
} from "@/lib/fonts";
import { ConceptNav } from "@/components/portfolio/ConceptNav";
import { PortfolioFooter } from "@/components/portfolio/PortfolioFooter";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { PageTransition } from "@/components/portfolio/PageTransition";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { SITE } from "@/data/concepts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://michaelkalachin.com"),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        fontDisplay.variable,
        fontSans.variable,
        fontBody.variable,
        fontAuraSerif.variable,
        fontAuraSans.variable,
        fontVelora.variable,
        fontElan.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col bg-[var(--mk-bg)] text-[var(--mk-fg)]">
        <SmoothScroll>
          <CustomCursor />
          <ConceptNav />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <PortfolioFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
