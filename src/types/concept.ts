export type ConceptSlug =
  | "aura"
  | "velora"
  | "monolith"
  | "nova"
  | "elan";

export type NavTheme = "dark" | "light" | "warm" | "navy";

export interface ConceptMeta {
  slug: ConceptSlug;
  number: string;
  name: string;
  industry: string;
  tagline: string;
  mood: string;
  href: string;
  navTheme: NavTheme;
  accent: string;
  previewImage: string;
  description: string;
}
