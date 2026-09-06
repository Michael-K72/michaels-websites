export const veloraMeta = {
  brand: "VELORA",
  model: "GT Coupé",
  label: "Interactive style concept · 02 / 05",
  industry: "Premium Automotive",
  tagline: "Motion without compromise.",
  heroHeadline: "PURE MOTION.",
  heroSupport:
    "A grand touring coupe engineered for silence at speed and presence at rest.",
  accent: "#7BA3C9",
} as const;

export const cinemaMetrics = [
  { id: "power", label: "Peak power", value: 612, suffix: " hp", decimals: 0 },
  { id: "accel", label: "0–100 km/h", value: 3.2, suffix: " s", decimals: 1 },
  { id: "top", label: "Top speed", value: 318, suffix: " km/h", decimals: 0 },
  { id: "range", label: "Touring range", value: 640, suffix: " km", decimals: 0 },
] as const;

export const performanceStats = [
  { label: "System output", value: 612, suffix: "hp", detail: "Twin-turbo V8 hybrid assist" },
  { label: "Launch", value: 3.2, suffix: "s", detail: "0–100 with launch control" },
  { label: "Lateral grip", value: 1.1, suffix: "g", detail: "Active aero + sticky compound" },
  { label: "Brake fade", value: 0, suffix: "%", detail: "Carbon-ceramic endurance" },
] as const;

export const exteriorPoints = [
  {
    title: "Sculpted silence",
    body: "Long hood, short deck, and a continuous shoulder line that reads as one gesture.",
  },
  {
    title: "Signature light bar",
    body: "A single cool filament spans the stern—recognition without ornament.",
  },
  {
    title: "Graphite architecture",
    body: "Surfaces stay dark so reflections do the talking. Form before chrome.",
  },
] as const;

export const aeroPoints = [
  {
    title: "Active diffuser",
    body: "Deploys above 120 km/h to clean the wake and plant the rear axle.",
  },
  {
    title: "Flush canopy",
    body: "Continuous glass plane cuts turbulence while preserving cabin calm.",
  },
  {
    title: "Underbody channels",
    body: "Full-length venturi path manages pressure without visual clutter.",
  },
] as const;

export const interiorPoints = [
  {
    title: "Cockpit focus",
    body: "Driver axis first. Secondary controls retreat until summoned.",
  },
  {
    title: "Material honesty",
    body: "Brushed aluminum, open-pore ash, and hand-stitched hide—no faux carbon theater.",
  },
  {
    title: "Acoustic hush",
    body: "Laminated glass and active noise shaping keep highway conversation intact.",
  },
] as const;

export const techFeatures = [
  {
    title: "Horizon Drive",
    body: "Predictive chassis that reads road topology and preloads dampers before the crest.",
  },
  {
    title: "Arc Interface",
    body: "A curved 14\" OLED with haptic rails—eyes up, fingertips informed.",
  },
  {
    title: "Pulse Assist",
    body: "Hybrid torque fill that erases turbo lag without announcing itself.",
  },
  {
    title: "Night Lattice",
    body: "Adaptive matrix lighting with 1.2 million micromirrors for precise beam control.",
  },
] as const;

export const exteriorOptions = [
  {
    id: "obsidian",
    name: "Obsidian",
    hex: "#0c0c0c",
    glow: "rgba(80, 90, 100, 0.35)",
    filter: "brightness(0.85) contrast(1.08)",
  },
  {
    id: "graphite",
    name: "Graphite",
    hex: "#3a3d42",
    glow: "rgba(120, 130, 140, 0.4)",
    filter: "brightness(0.95) contrast(1.05) saturate(0.9)",
  },
  {
    id: "glacier",
    name: "Glacier Silver",
    hex: "#c5cad1",
    glow: "rgba(180, 195, 210, 0.45)",
    filter: "brightness(1.15) contrast(1.02) saturate(0.85)",
  },
  {
    id: "midnight",
    name: "Midnight Signal",
    hex: "#1a2a3a",
    glow: "rgba(123, 163, 201, 0.45)",
    filter: "brightness(0.9) hue-rotate(-8deg) saturate(1.1)",
  },
] as const;

export const interiorOptions = [
  {
    id: "noir",
    name: "Noir Leather",
    hex: "#1a1a1a",
    accent: "#8a8a8a",
    description: "Deep black hide, tonal stitching",
  },
  {
    id: "ash",
    name: "Ash Alcantara",
    hex: "#6e6a64",
    accent: "#b8b0a4",
    description: "Soft-touch suede, warm graphite",
  },
  {
    id: "glacier-cabin",
    name: "Glacier Stitch",
    hex: "#d8dde3",
    accent: "#7BA3C9",
    description: "Pale leather with cool-blue thread",
  },
] as const;

export const wheelOptions = [
  {
    id: "aero20",
    name: "Aero 20",
    detail: "Turbine face · low drag",
    priceDelta: 0,
  },
  {
    id: "track21",
    name: "Track 21",
    detail: "Forged Y-spoke · track bias",
    priceDelta: 4200,
  },
  {
    id: "shadow22",
    name: "Shadow 22",
    detail: "Deep dish · dark chrome lip",
    priceDelta: 6800,
  },
] as const;

export const basePrice = 186000;

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80",
    alt: "VELORA GT Coupé front three-quarter in low light",
    caption: "Arrival",
  },
  {
    src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1800&q=80",
    alt: "Grand tourer on an open coastal road",
    caption: "Touring line",
  },
  {
    src: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1800&q=80",
    alt: "Dark coupe rear profile at dusk",
    caption: "Stern signature",
  },
  {
    src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1800&q=80",
    alt: "Performance coupe side silhouette",
    caption: "Proportion",
  },
  {
    src: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1800&q=80",
    alt: "Precision mechanical detail under hood lighting",
    caption: "Machine",
  },
  {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1800&q=80",
    alt: "Night drive through urban reflections",
    caption: "After dark",
  },
] as const;

export const heroImage =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=85";

export const cinemaImage =
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2000&q=85";

export const exteriorImage =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1800&q=80";

export const aeroImage =
  "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1800&q=80";

export const interiorImage =
  "https://images.unsplash.com/photo-1493238792000-8113daa0c7b2?auto=format&fit=crop&w=1800&q=80";

export const configImage =
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80";

export const specs = [
  { group: "Powertrain", rows: [
    { label: "Architecture", value: "4.0L twin-turbo V8 + electric assist" },
    { label: "Combined output", value: "612 hp / 750 Nm" },
    { label: "Transmission", value: "8-speed dual-clutch" },
    { label: "Drive", value: "Rear-biased all-wheel torque vectoring" },
  ]},
  { group: "Chassis", rows: [
    { label: "Suspension", value: "Adaptive magnetic dampers" },
    { label: "Brakes", value: "410 / 390 mm carbon-ceramic" },
    { label: "Weight", value: "1,720 kg (DIN)" },
    { label: "Cd", value: "0.28 with aero pack active" },
  ]},
  { group: "Dimensions", rows: [
    { label: "Length / Width / Height", value: "4,780 / 1,940 / 1,320 mm" },
    { label: "Wheelbase", value: "2,850 mm" },
    { label: "Luggage", value: "380 L" },
    { label: "Seating", value: "2+2" },
  ]},
] as const;

export const driveLocations = [
  "Zurich Atelier",
  "Munich Pavilion",
  "Milan Studio",
  "Monaco Terrace",
] as const;
