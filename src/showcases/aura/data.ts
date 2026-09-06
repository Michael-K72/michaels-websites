export type PropertyStatus = "Available" | "By appointment" | "Reserved";

export type AuraProperty = {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  canton: string;
  country: string;
  price: string;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  interiorSqm: number;
  terraceSqm?: number;
  plotSqm?: number;
  year: number;
  orientation: string;
  summary: string;
  narrative: string;
  image: string;
  features: string[];
};

export type AuraAmenity = {
  id: string;
  title: string;
  description: string;
};

export type AuraLocation = {
  id: string;
  name: string;
  region: string;
  travel: string;
  character: string;
  x: number;
  y: number;
};

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  aspect: "landscape" | "portrait" | "wide";
};

export const auraBrand = {
  name: "Aura",
  wordmark: "AURA",
  conceptLabel: "Interactive style concept · 01 / 05",
  industry: "Luxury Real Estate",
  tagline: "Residences composed for stillness.",
  intro:
    "Aura curates a discreet portfolio of private homes along the Alpine arc and Mediterranean edge—places where architecture withdraws, and light, proportion, and silence take the lead.",
  architecture:
    "Each residence is selected for its dialogue with landscape: limestone that holds the afternoon, timber that softens winter light, volumes that frame water rather than compete with it. We favour enduring materials, measured thresholds, and rooms that feel inevitable once entered.",
  viewingNote:
    "Viewings are arranged privately, by introduction or invitation. There are no open houses—only quiet appointments with the people who will live there.",
} as const;

export const properties: AuraProperty[] = [
  {
    id: "celeste",
    name: "Villa Céleste",
    subtitle: "Cap Ferrat · Sea terrace",
    location: "Saint-Jean-Cap-Ferrat",
    canton: "Alpes-Maritimes",
    country: "France",
    price: "Upon enquiry",
    status: "By appointment",
    bedrooms: 6,
    bathrooms: 7,
    interiorSqm: 780,
    terraceSqm: 240,
    plotSqm: 3200,
    year: 2019,
    orientation: "South · Mediterranean",
    summary:
      "A limestone pavilion set into the Cap, where infinity edges dissolve into the Baie des Fourmis and evening light arrives in long, unbroken bands.",
    narrative:
      "Céleste was conceived as a sequence of calm thresholds—courtyard, salon, terrace, sea. Walls of warm stone absorb the Riviera glare; bronze screens filter the mistral. The principal suite opens to a private garden of pines and lavender, while the lower level holds a spa that looks onto a still water court.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=80",
    features: [
      "Heated infinity pool with sea alignment",
      "Staff wing with separate entrance",
      "Wine cellar for 1,200 bottles",
      "Private landing for tender access",
    ],
  },
  {
    id: "lac",
    name: "Maison Lac",
    subtitle: "Lake Geneva · Waterfront",
    location: "Cologny",
    canton: "Geneva",
    country: "Switzerland",
    price: "CHF 28.5M",
    status: "Available",
    bedrooms: 5,
    bathrooms: 5,
    interiorSqm: 620,
    terraceSqm: 180,
    plotSqm: 2100,
    year: 2021,
    orientation: "West · Lake & Jura",
    summary:
      "A composed lakeside residence of glass and pale oak, oriented to the evening path of light across Lac Léman.",
    narrative:
      "Maison Lac sits behind a quiet lane in Cologny, its gardens stepping down to a private jetty. Interiors are restrained: wide oak boards, hand-finished plaster, and a single monumental fireplace anchoring the salon. Floor-to-ceiling glazing frames Mont Blanc on clear days; on others, mist becomes the architecture’s softest material.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80",
    features: [
      "Private jetty and boat berth",
      "Triple-height salon with lake axis",
      "Geothermal climate system",
      "Guest pavilion in the garden",
    ],
  },
  {
    id: "etoile",
    name: "Résidence Étoile",
    subtitle: "Monaco · High residence",
    location: "Larvotto",
    canton: "Monaco",
    country: "Monaco",
    price: "€42M",
    status: "Available",
    bedrooms: 4,
    bathrooms: 5,
    interiorSqm: 480,
    terraceSqm: 160,
    year: 2023,
    orientation: "South-East · Sea & Port",
    summary:
      "A full-floor residence above Larvotto, finished in travertine and brushed metal, with terraces that read as outdoor salons.",
    narrative:
      "Étoile is rare in Monaco: a single-level home with uninterrupted sea horizon and discreet street presence. The plan is radial—living spaces open to the Mediterranean, private rooms turn inward toward a quiet gallery. Service elevators, climate-controlled storage, and a dedicated chauffeur bay support a life conducted with absolute privacy.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    features: [
      "Full-floor privacy, one residence per level",
      "Concierge and 24-hour security",
      "Climate-controlled cellar room",
      "Two parking spaces with lift access",
    ],
  },
  {
    id: "meridian",
    name: "Chalet Meridian",
    subtitle: "Gstaad · Alpine estate",
    location: "Gstaad",
    canton: "Bern",
    country: "Switzerland",
    price: "CHF 19.8M",
    status: "By appointment",
    bedrooms: 7,
    bathrooms: 8,
    interiorSqm: 710,
    terraceSqm: 95,
    plotSqm: 4800,
    year: 2017,
    orientation: "South · Alpine panorama",
    summary:
      "A contemporary chalet of hand-hewn timber and local stone, composed for winter gatherings and long summer silence.",
    narrative:
      "Meridian rests above the village on a south-facing meadow. The architecture privileges mass and warmth: thick timber beams, deep window reveals, and a spa wing carved into the slope. From the upper salon, the Wispile ridge unfolds in a continuous panorama—ski-in access in season, wildflower pasture in July.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80",
    features: [
      "Ski-in access to Eggli slopes",
      "Underground garage for six cars",
      "Spa with hammam and plunge pool",
      "Separate staff and guest chalets",
    ],
  },
  {
    id: "atelier",
    name: "Atelier du Parc",
    subtitle: "Zürich · Park penthouse",
    location: "Enge",
    canton: "Zürich",
    country: "Switzerland",
    price: "CHF 14.2M",
    status: "Reserved",
    bedrooms: 3,
    bathrooms: 3,
    interiorSqm: 340,
    terraceSqm: 120,
    year: 2022,
    orientation: "South-West · Lake & city",
    summary:
      "A top-floor atelier overlooking the Arboretum—quiet urban living with the discipline of a gallery and the ease of a home.",
    narrative:
      "Atelier du Parc was designed for collectors who live with their work. Movable oak panels, museum lighting, and a double-height library define the principal volume. The wraparound terrace opens to lake breezes and the soft canopy of the park below—city presence without its noise.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
    features: [
      "Double-height library and gallery wall",
      "Museum-grade climate control",
      "Wraparound terrace with outdoor kitchen",
      "Private elevator landing",
    ],
  },
];

export const signatureProperty = properties[1];

export const amenities: AuraAmenity[] = [
  {
    id: "concierge",
    title: "Private concierge",
    description:
      "A dedicated desk for travel, household staffing, and discreet logistics—available before and after acquisition.",
  },
  {
    id: "stewardship",
    title: "Estate stewardship",
    description:
      "Seasonal care for gardens, pools, and alpine roofs, coordinated with trusted local ateliers.",
  },
  {
    id: "provenance",
    title: "Architectural provenance",
    description:
      "Full documentation of materials, craftspeople, and renovations—clarity that travels with the residence.",
  },
  {
    id: "introductions",
    title: "Quiet introductions",
    description:
      "Access to family offices, private banks, and legal counsel accustomed to cross-border ownership.",
  },
  {
    id: "staging",
    title: "Lived-in staging",
    description:
      "Interiors prepared with restraint: linen, stone, and light—never spectacle—for private showings.",
  },
  {
    id: "legacy",
    title: "Legacy planning",
    description:
      "Guidance on succession, holding structures, and long-horizon care for multi-generational homes.",
  },
];

export const locations: AuraLocation[] = [
  {
    id: "geneva",
    name: "Geneva lakeshore",
    region: "Switzerland",
    travel: "GVA · 18 min",
    character: "Diplomatic calm, west light, private jetties",
    x: 28,
    y: 42,
  },
  {
    id: "zurich",
    name: "Zürich Enge",
    region: "Switzerland",
    travel: "ZRH · 22 min",
    character: "Park canopy, lake edge, collector residences",
    x: 48,
    y: 28,
  },
  {
    id: "gstaad",
    name: "Gstaad plateau",
    region: "Switzerland",
    travel: "GVA · 2h · private",
    character: "Alpine meadow, winter access, timber mass",
    x: 42,
    y: 58,
  },
  {
    id: "monaco",
    name: "Monaco Larvotto",
    region: "Principality",
    travel: "NCE · 35 min",
    character: "Sea horizon, full-floor privacy, stone & metal",
    x: 68,
    y: 72,
  },
  {
    id: "ferrat",
    name: "Cap Ferrat",
    region: "France",
    travel: "NCE · 28 min",
    character: "Pine shade, limestone pavilions, tender access",
    x: 72,
    y: 78,
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    caption: "Morning light across pale oak and stone",
    aspect: "landscape",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    caption: "A terrace held between sky and water",
    aspect: "portrait",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=80",
    caption: "Circulation as a quiet gallery",
    aspect: "wide",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=80",
    caption: "Material honesty in timber and plaster",
    aspect: "landscape",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
    caption: "Evening rooms oriented to the horizon",
    aspect: "portrait",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    caption: "Thresholds that slow the arrival",
    aspect: "landscape",
  },
];

export const architecturePillars = [
  {
    title: "Proportion before ornament",
    body: "Rooms are sized for human pace—not spectacle. Ceiling heights, window rhythms, and axial views do the work that decoration cannot.",
  },
  {
    title: "Materials that age with grace",
    body: "Limestone, oak, bronze, and linen soften with use. We avoid finishes that announce themselves in year one and tire in year five.",
  },
  {
    title: "Landscape as co-author",
    body: "Every Aura residence is chosen for its site: a lake path of light, a pine windbreak, a meadow that holds winter snow with dignity.",
  },
] as const;

export const availabilityNotes = [
  {
    label: "Portfolio rhythm",
    value: "Eight to twelve residences held at any time",
  },
  {
    label: "Introduction",
    value: "By referral, private bank, or direct enquiry",
  },
  {
    label: "Viewing window",
    value: "Tuesday–Saturday · by confirmed appointment",
  },
  {
    label: "Documentation",
    value: "Plans, surveys, and provenance shared under NDA",
  },
] as const;
