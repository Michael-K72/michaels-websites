export type ElanRoom = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  size: string;
  view: string;
  sleeps: string;
  rate: string;
  description: string;
  amenities: string[];
  image: string;
  layout: "image-left" | "image-right";
};

export type MenuItem = {
  name: string;
  note: string;
  price: string;
};

export type Experience = {
  id: string;
  title: string;
  time: string;
  description: string;
  image: string;
};

export const ELAN = {
  label: "05 / 05 Hospitality style concept",
  name: "Élan",
  location: "Lake Como · Italy",
  tagline: "Where the day softens.",
  support:
    "A lakeside house of quiet rooms, unhurried meals, and evenings that ask nothing of you.",
  phone: "+39 031 000 0000",
  email: "stay@elan-house.com",
} as const;

export const rooms: ElanRoom[] = [
  {
    id: "terra",
    index: "01",
    name: "Suite Terra",
    subtitle: "Garden courtyard",
    size: "48 m²",
    view: "Herb garden & stone walls",
    sleeps: "2 guests",
    rate: "from €480",
    description:
      "Low light, linen in warm ochre, and a private courtyard where morning arrives slowly. Terra is for guests who prefer the hush of leaves to the glitter of the lake.",
    amenities: ["Courtyard terrace", "Deep soaking tub", "Fireplace", "King bed"],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80",
    layout: "image-left",
  },
  {
    id: "acqua",
    index: "02",
    name: "Suite Acqua",
    subtitle: "Lake edge",
    size: "62 m²",
    view: "Open water to the far shore",
    sleeps: "2 guests",
    rate: "from €620",
    description:
      "Floor-to-ceiling glass frames the water like a living painting. Acqua is all reflection and restraint—a room that teaches you how to watch the afternoon pass.",
    amenities: ["Private balcony", "Writing desk", "Rain shower", "Lake-facing lounge"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
    layout: "image-right",
  },
  {
    id: "selva",
    index: "03",
    name: "Suite Selva",
    subtitle: "Forest canopy",
    size: "55 m²",
    view: "Cypress & mountain ridge",
    sleeps: "2–3 guests",
    rate: "from €540",
    description:
      "Timber, wool, and filtered green light. Selva sits slightly apart from the main house—close enough for dinner, far enough to forget the rest of the world.",
    amenities: ["Daybed alcove", "Outdoor shower", "Reading nook", "Mini bar"],
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    layout: "image-left",
  },
  {
    id: "casa",
    index: "04",
    name: "Casa Élan",
    subtitle: "Whole residence",
    size: "210 m²",
    view: "Lake, garden & terrace",
    sleeps: "6 guests",
    rate: "from €1,850",
    description:
      "The original villa wing—three bedrooms, a long table, and a kitchen that opens to evening air. For families and friends who want the house to themselves.",
    amenities: ["Private chef option", "Wine cellar access", "Two terraces", "Butler kitchen"],
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=80",
    layout: "image-right",
  },
];

export const restaurant = {
  name: "Osteria Verde",
  hours: "Dinner · Wed–Sun · 19:00–22:30",
  chef: "Elena Rossi",
  description:
    "A single room lit by candles and the last light on the water. The menu follows the garden, the lake, and whatever the morning market still holds.",
  image:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
  menu: [
    {
      name: "Lake whitefish, lemon myrtle",
      note: "Charred fennel · brown butter",
      price: "28",
    },
    {
      name: "Handmade ravioli, sage",
      note: "Ricotta · walnut · garden greens",
      price: "24",
    },
    {
      name: "Slow lamb, rosemary smoke",
      note: "Polenta · black olive",
      price: "42",
    },
    {
      name: "Honey tart, thyme",
      note: "Crème fraîche · wildflower",
      price: "16",
    },
  ] satisfies MenuItem[],
};

export const wellness = {
  title: "The Bath House",
  description:
    "Steam, cool stone, and treatments paced to your breath. No spa lobby theatre—only rooms that restore what travel takes away.",
  rituals: [
    { name: "Lake stone massage", duration: "80 min", note: "Warm basalt · quiet music" },
    { name: "Forest soak", duration: "60 min", note: "Cedar tub · herbal steam" },
    { name: "Evening unwind", duration: "45 min", note: "Scalp ritual · linen wrap" },
  ],
  image:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
};

export const destination = {
  title: "The shore beyond the gate",
  description:
    "Élan sits on a quiet bend of Lake Como—villages within reach, but far enough that evenings stay yours. We arrange boats, guides, and the kind of itineraries that leave space to wander.",
  points: [
    { label: "Bellagio ferry", detail: "18 minutes by private launch" },
    { label: "Garden walks", detail: "Villa paths open at dawn" },
    { label: "Wine hills", detail: "Half-day with local cellars" },
    { label: "Market mornings", detail: "Saturday produce with the chef" },
  ],
  image:
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1600&q=80",
};

export const experiences: Experience[] = [
  {
    id: "dawn-boat",
    title: "Dawn on the water",
    time: "06:30",
    description: "A silent electric launch as mist lifts from the lake.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "table-garden",
    title: "Table in the garden",
    time: "13:00",
    description: "Lunch beneath the pergola—seasonal plates, unhurried wine.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "night-fire",
    title: "Night by the fire",
    time: "21:00",
    description: "Blankets, brandy, and the soft crack of olive wood.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  },
];

export const gallery = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    alt: "Élan lakeside terrace at dusk",
    caption: "Terrace · dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80",
    alt: "Hotel corridor with warm lighting",
    caption: "Corridor · evening",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
    alt: "Pool overlooking landscape",
    caption: "Pool · morning",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
    alt: "Luxury hotel bedroom interior",
    caption: "Room · linen",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    alt: "Hotel exterior with palms",
    caption: "Arrival · afternoon",
  },
  {
    src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1400&q=80",
    alt: "Candlelit dining table",
    caption: "Osteria · night",
  },
];

export const guestOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5+ guests"] as const;

export const reserveTimes = [
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const;
