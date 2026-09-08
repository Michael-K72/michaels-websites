import type { ConceptMeta } from "@/types/concept";

export const SITE = {
  name: "Michael Kalachin",
  monogram: "MK",
  title: "Michael Kalachin — Custom Websites for Brands",
  description:
    "I design and develop distinctive websites for companies—interactive concepts that show direction, craft, and how a collaboration could feel.",
  email: "hello@michaelkalachin.com",
  availability: "Available for projects",
} as const;

export const CONCEPTS: ConceptMeta[] = [
  {
    slug: "aura",
    number: "01",
    name: "Aura",
    industry: "Luxury Real Estate",
    tagline: "Quiet / Architectural / Refined",
    mood: "Quiet luxury editorial for private residences.",
    href: "/showcase/aura",
    navTheme: "warm",
    accent: "#C4A574",
    previewImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    description:
      "An editorial real-estate experience built around stillness, materiality, and private viewing.",
    highlights: [
      "Residence switcher with calm editorial pacing",
      "Private viewing inquiry with clear validation",
      "Material-led gallery and availability narrative",
    ],
  },
  {
    slug: "velora",
    number: "02",
    name: "Velora",
    industry: "Premium Automotive",
    tagline: "Cinematic / Performance / Technical",
    mood: "Dark cinematic performance storytelling.",
    href: "/showcase/velora",
    navTheme: "dark",
    accent: "#7BA3C9",
    previewImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    description:
      "A precision automotive brand experience with scroll cinema and configuration.",
    highlights: [
      "Scroll-driven cinema sequence",
      "Live exterior / interior / wheel configurator",
      "Performance metrics with technical restraint",
    ],
  },
  {
    slug: "monolith",
    number: "03",
    name: "Monolith",
    industry: "Architecture",
    tagline: "Minimal / Editorial / Spatial",
    mood: "Swiss-grid architecture and spatial restraint.",
    href: "/showcase/monolith",
    navTheme: "light",
    accent: "#E8E4DC",
    previewImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    description:
      "An architecture studio website defined by grid, type, and negative space.",
    highlights: [
      "Swiss editorial grid and measured typography",
      "Project index with immersive detail overlay",
      "Process narrative built from void and light",
    ],
  },
  {
    slug: "nova",
    number: "04",
    name: "Nova",
    industry: "Technology / AI",
    tagline: "Intelligent / Digital / Precise",
    mood: "Systems, data, and precise product clarity.",
    href: "/showcase/nova",
    navTheme: "navy",
    accent: "#5ED0E8",
    previewImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    description:
      "A technology platform identity with interactive systems and product depth.",
    highlights: [
      "Interactive system graph as product metaphor",
      "Pricing and FAQ with precise UI motion",
      "Navy product clarity for complex offerings",
    ],
  },
  {
    slug: "elan",
    number: "05",
    name: "Élan",
    industry: "Luxury Hospitality",
    tagline: "Warm / Elegant / Emotional",
    mood: "Warm hospitality with emotional editorial pacing.",
    href: "/showcase/elan",
    navTheme: "warm",
    accent: "#C4A484",
    previewImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    detailImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
    description:
      "A boutique hospitality experience centered on atmosphere, rooms, and booking.",
    highlights: [
      "Atmospheric hero with booking intent",
      "Room stories with emotional editorial pacing",
      "Warm hospitality palette and soft motion",
    ],
  },
];

export function getConcept(slug: string): ConceptMeta | undefined {
  return CONCEPTS.find((c) => c.slug === slug);
}
