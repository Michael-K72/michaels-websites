export type MonolithProject = {
  id: string;
  index: string;
  name: string;
  location: string;
  year: string;
  type: string;
  area: string;
  concept: string;
  materials: string[];
  category: "architecture" | "interiors";
  image: string;
  gallery: string[];
};

export const MONOLITH = {
  label: "03 / 05 Architecture style concept",
  studio: "Monolith",
  tagline: "We shape space.",
  city: "Zürich · Berlin · Lisbon",
  founded: "2014",
} as const;

export const projects: MonolithProject[] = [
  {
    id: "haus-nord",
    index: "01",
    name: "Haus Nord",
    location: "Berlin, DE",
    year: "2024",
    type: "Private residence",
    area: "420 m²",
    concept:
      "A courtyard house reduced to mass, light, and measured openings. Circulation wraps a silent core; rooms face north light with deliberate restraint.",
    materials: ["Exposed concrete", "Oak", "Steel"],
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "atelier-frame",
    index: "02",
    name: "Atelier Frame",
    location: "Lisbon, PT",
    year: "2023",
    type: "Gallery / studio",
    area: "680 m²",
    concept:
      "A working gallery carved from an industrial shell. Structural bays remain visible; partitions are temporary, light is permanent.",
    materials: ["Raw plaster", "Limestone", "Black steel"],
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "courtyard-nine",
    index: "03",
    name: "Courtyard Nine",
    location: "Kyoto, JP",
    year: "2022",
    type: "Guest residence",
    area: "310 m²",
    concept:
      "Nine rooms arranged around a single void. Thresholds are thickened; the garden is the only ornament.",
    materials: ["Tamped earth", "Cedar", "Paper"],
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8b99d40030?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "quiet-volume",
    index: "04",
    name: "Quiet Volume",
    location: "Copenhagen, DK",
    year: "2024",
    type: "Interior loft",
    area: "185 m²",
    concept:
      "An interior as continuous surface. Joinery absorbs storage; daylight is graded through deep reveals.",
    materials: ["White oak", "Wool", "Brushed aluminum"],
    category: "interiors",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1615529182904-14819c35d7a0?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "concrete-archive",
    index: "05",
    name: "Concrete Archive",
    location: "Zürich, CH",
    year: "2021",
    type: "Cultural pavilion",
    area: "1,240 m²",
    concept:
      "A public room for objects and silence. Massive walls hold climate; the plan is one clear diagonal.",
    materials: ["In-situ concrete", "Glass", "Bronze"],
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1479831176448-7a9eaa3b5a5b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "line-house",
    index: "06",
    name: "Line House",
    location: "Melbourne, AU",
    year: "2023",
    type: "Pavilion residence",
    area: "265 m²",
    concept:
      "A single horizontal line under a wide sky. Living spaces slide past each other; landscape moves through the plan.",
    materials: ["Board-formed concrete", "Blackbutt", "Stone"],
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "studio-void",
    index: "07",
    name: "Studio Void",
    location: "Antwerp, BE",
    year: "2022",
    type: "Workspace interior",
    area: "520 m²",
    concept:
      "Desks as furniture, walls as light. Acoustic soft rooms punctuate an otherwise open field.",
    materials: ["Linoleum", "Plywood", "Felt"],
    category: "interiors",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "ridge-retreat",
    index: "08",
    name: "Ridge Retreat",
    location: "Valais, CH",
    year: "2025",
    type: "Alpine dwelling",
    area: "198 m²",
    concept:
      "A compact volume set into the slope. Glazing faces the valley; the rear wall holds earth and heat.",
    materials: ["Local stone", "Larch", "Copper"],
    category: "architecture",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

export const philosophy = {
  heading: "Space before style.",
  body: "We begin with proportion, light, and use. Decoration arrive late. Every project is a calibrated void—measured, quiet, and exact.",
};

export const processSteps = [
  { step: "01", title: "Brief", text: "Program, site, and constraints mapped as facts—not moods." },
  { step: "02", title: "Massing", text: "Volume studies until circulation and light resolve." },
  { step: "03", title: "Detail", text: "Joints, thresholds, and material meetings drawn at 1:5." },
  { step: "04", title: "Build", text: "Site presence through construction; drawings stay open." },
];

export const services = [
  { title: "Architecture", text: "New builds, conversions, and public rooms." },
  { title: "Interiors", text: "Residential and workplace interiors as continuous space." },
  { title: "Masterplan", text: "Campus and courtyard frameworks at urban scale." },
  { title: "Research", text: "Material studies and light models for ongoing work." },
];

export const studio = {
  heading: "A small studio. Large rooms.",
  body: "Monolith is a fictional architecture practice used to demonstrate a Swiss editorial digital identity—grid, type, and spatial restraint.",
  people: [
    { role: "Principal", name: "A. Keller" },
    { role: "Design lead", name: "M. Sato" },
    { role: "Interiors", name: "L. Berg" },
    { role: "Project", name: "Team of 11" },
  ],
};

export const heroImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80";

export const overlapSequence = [
  {
    caption: "01 — Mass",
    title: "Weight before ornament",
    text: "Structure is the first finish. Surfaces stay honest to how they are made.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
  },
  {
    caption: "02 — Light",
    title: "Openings as instruments",
    text: "Windows are placed for work, rest, and silence—not for elevation drawings alone.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    caption: "03 — Void",
    title: "Empty as material",
    text: "Negative space carries equal weight. Plans leave room to breathe.",
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80",
  },
];
