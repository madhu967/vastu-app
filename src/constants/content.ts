import { GuidePage, OptionItem } from "@/types/vastu";

export const languageOptions: OptionItem[] = [
  { label: "English", value: "English" },
  { label: "Telugu", value: "Telugu" },
  { label: "Tamil", value: "Tamil" },
  { label: "Hindi", value: "Hindi" },
  { label: "Kannada", value: "Kannada" },
  { label: "Malayalam", value: "Malayalam" },
];

export const directionOptions: OptionItem[] = [
  { label: "North", value: "North" },
  { label: "North-East", value: "North-East" },
  { label: "East", value: "East" },
  { label: "South-East", value: "South-East" },
  { label: "South", value: "South" },
  { label: "South-West", value: "South-West" },
  { label: "West", value: "West" },
  { label: "North-West", value: "North-West" },
];

export const padhamOptions: OptionItem[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export const nakshatramOptions: OptionItem[] = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashirsha",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Moola",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
].map((item) => ({ label: item, value: item }));

export const guidePages: GuidePage[] = [
  {
    key: "main-entrance",
    title: "Main Entrance",
    subtitle:
      "Best entrance directions, practical do's and don'ts, and calm first impressions.",
    sections: [
      {
        title: "Favorable directions",
        points: [
          "Prefer clean, open, and well-lit entry zones.",
          "Keep the entry visually balanced and uncluttered.",
        ],
      },
      {
        title: "Do's",
        points: [
          "Use warm lighting and inviting colors.",
          "Keep the door smooth, clean, and easy to open.",
        ],
      },
      {
        title: "Don'ts",
        points: [
          "Avoid blocked entrances and dark corners.",
          "Avoid aggressive decor near the threshold.",
        ],
      },
    ],
  },
  {
    key: "living-room",
    title: "Living Room",
    subtitle:
      "Seating flow, TV placement, colors, windows, and subtle decor balance.",
    sections: [
      {
        title: "Seating",
        points: [
          "Arrange seating to support conversation and openness.",
          "Keep movement paths clear and soft.",
        ],
      },
      {
        title: "TV and decor",
        points: [
          "Place media units on a calm, stable wall.",
          "Choose decor that feels light, not crowded.",
        ],
      },
      {
        title: "Lighting",
        points: [
          "Layer natural and warm artificial light.",
          "Avoid harsh contrast around the room.",
        ],
      },
    ],
  },
  {
    key: "kitchen",
    title: "Kitchen",
    subtitle:
      "Cooking direction, stove, sink, refrigerator, storage, and color guidance.",
    sections: [
      {
        title: "Placement",
        points: [
          "Keep cooking and water zones visually separate.",
          "Support clean movement from storage to stove.",
        ],
      },
      {
        title: "Colors",
        points: [
          "Use warm, grounding tones with clean finishes.",
          "Avoid overly dark or dull surfaces.",
        ],
      },
      {
        title: "Storage",
        points: [
          "Keep frequently used items easy to reach.",
          "Maintain clear counters for a peaceful feel.",
        ],
      },
    ],
  },
  {
    key: "bedroom",
    title: "Bedroom",
    subtitle:
      "Sleep direction, bed placement, wardrobes, mirrors, and a quiet atmosphere.",
    sections: [
      {
        title: "Bed placement",
        points: [
          "Center the bed with a calm wall behind it.",
          "Allow comfortable walking space on both sides when possible.",
        ],
      },
      {
        title: "Mirrors",
        points: [
          "Avoid direct mirror reflections of the bed.",
          "Keep reflective surfaces visually soft.",
        ],
      },
      {
        title: "Wardrobe",
        points: [
          "Use sturdy wardrobes with simple lines.",
          "Keep the room visually restful.",
        ],
      },
    ],
  },
  {
    key: "bathroom",
    title: "Bathroom & Toilet",
    subtitle: "Ideal location, drainage, ventilation, and practical remedies.",
    sections: [
      {
        title: "Hygiene",
        points: [
          "Prioritize ventilation and easy cleaning.",
          "Keep fixtures well maintained.",
        ],
      },
      {
        title: "Drainage",
        points: [
          "Ensure water flows naturally and safely.",
          "Keep the room bright but private.",
        ],
      },
      {
        title: "Remedies",
        points: [
          "Use calm colors and orderly storage.",
          "Fix leaks and odors quickly.",
        ],
      },
    ],
  },
  {
    key: "pooja-room",
    title: "Pooja Room",
    subtitle: "A serene place for daily rituals, light, and storage.",
    sections: [
      {
        title: "Direction",
        points: [
          "Choose a quiet, clean, and uplifting corner.",
          "Keep the area spiritually and visually uncluttered.",
        ],
      },
      {
        title: "Idol placement",
        points: [
          "Keep idols at respectful eye level.",
          "Avoid crowded shelving and harsh glare.",
        ],
      },
      {
        title: "Daily use",
        points: [
          "Keep lighting soft and dependable.",
          "Reserve the space for peaceful routine.",
        ],
      },
    ],
  },
  {
    key: "dining-room",
    title: "Dining Room",
    subtitle:
      "Table placement, seating direction, wash basin location, and colors.",
    sections: [
      {
        title: "Dining table",
        points: [
          "Keep circulation around the table easy.",
          "Prefer a balanced, grounded shape.",
        ],
      },
      {
        title: "Seating",
        points: [
          "Allow comfortable movement and posture.",
          "Use chairs that feel sturdy and welcoming.",
        ],
      },
      {
        title: "Colors",
        points: [
          "Choose soft, appetite-friendly tones.",
          "Avoid visual clutter near the dining zone.",
        ],
      },
    ],
  },
  {
    key: "staircase",
    title: "Staircase",
    subtitle: "Direction, shape, movement, and common mistakes to avoid.",
    sections: [
      {
        title: "Structure",
        points: [
          "Keep the staircase well lit and stable.",
          "Avoid awkward turns and cramped landings.",
        ],
      },
      {
        title: "Movement",
        points: [
          "Use a natural, comfortable rhythm.",
          "Keep railings secure and clean.",
        ],
      },
      {
        title: "Mistakes",
        points: [
          "Avoid visual heaviness at the stair core.",
          "Avoid blocked access below the stairs.",
        ],
      },
    ],
  },
  {
    key: "parking",
    title: "Parking / Garage",
    subtitle: "Car, bike, garage, and gate positioning guidance.",
    sections: [
      {
        title: "Layout",
        points: [
          "Keep turning space generous and clear.",
          "Avoid sharp obstacles near vehicle paths.",
        ],
      },
      {
        title: "Gate position",
        points: [
          "Choose a gate that feels open and smooth.",
          "Keep arrival and exit areas intuitive.",
        ],
      },
      {
        title: "Lighting",
        points: [
          "Use bright, safe lighting for night use.",
          "Reduce blind corners and dark patches.",
        ],
      },
    ],
  },
  {
    key: "borewell",
    title: "Borewell & Water Tank",
    subtitle:
      "Water source, underground tank, overhead tank, and flow direction.",
    sections: [
      {
        title: "Water source",
        points: [
          "Keep water zones planned and accessible.",
          "Allow maintenance access without disruption.",
        ],
      },
      {
        title: "Tank placement",
        points: [
          "Balance load and service access.",
          "Keep plumbing simple and organized.",
        ],
      },
      {
        title: "Flow",
        points: [
          "Ensure water movement is efficient.",
          "Avoid leaks and blocked access.",
        ],
      },
    ],
  },
  {
    key: "septic-tank",
    title: "Septic Tank",
    subtitle: "Correct placement, wrong locations, and remedies.",
    sections: [
      {
        title: "Placement",
        points: [
          "Keep the tank serviceable and secure.",
          "Maintain hygienic access for repairs.",
        ],
      },
      {
        title: "Avoid",
        points: [
          "Avoid placing it where access is impossible.",
          "Avoid unplanned conflicts with utilities.",
        ],
      },
      {
        title: "Remedies",
        points: [
          "Prioritize clean engineering and maintenance.",
          "Use proper sealing and drainage.",
        ],
      },
    ],
  },
  {
    key: "garden",
    title: "Garden & Trees",
    subtitle: "Tree placement, tulsi, landscaping, and water features.",
    sections: [
      {
        title: "Trees and plants",
        points: [
          "Keep planting balanced and maintainable.",
          "Use greenery to soften the boundaries.",
        ],
      },
      {
        title: "Tulsi",
        points: [
          "Reserve a respectful, clean spot for sacred plants.",
          "Keep watering and sunlight practical.",
        ],
      },
      {
        title: "Water feature",
        points: [
          "Use water elements sparingly and neatly.",
          "Keep circulation around them safe.",
        ],
      },
    ],
  },
  {
    key: "plot-shapes",
    title: "Plot Shapes",
    subtitle:
      "Square, rectangle, irregular shapes, and how shape affects balance.",
    sections: [
      {
        title: "Good shapes",
        points: [
          "Prefer balanced forms with clean boundaries.",
          "Check usable area, not just total area.",
        ],
      },
      {
        title: "Irregular plots",
        points: [
          "Use geometry to recover practical layout.",
          "Keep circulation and light in mind.",
        ],
      },
      {
        title: "Assessment",
        points: [
          "Study the plot before designing rooms.",
          "Resolve awkward corners with planning.",
        ],
      },
    ],
  },
  {
    key: "faq",
    title: "FAQ",
    subtitle: "Common Vastu questions and practical answers in one place.",
    sections: [
      {
        title: "Calculator",
        points: [
          "Use the calculator to generate the main report.",
          "Keep the entered measurements consistent.",
        ],
      },
      {
        title: "Guidance",
        points: [
          "Use the guide pages for room-level planning.",
          "Combine the report with practical site observations.",
        ],
      },
      {
        title: "Support",
        points: [
          "Keep the app updated as the rules evolve.",
          "Connect the live formulas from your website when ready.",
        ],
      },
    ],
  },
  {
    key: "contact",
    title: "Contact Us",
    subtitle: "Phone, email, website, and office details.",
    sections: [
      {
        title: "Reach us",
        points: [
          "Add your phone number here.",
          "Add your email and website here.",
        ],
      },
      {
        title: "Office",
        points: [
          "Add office address and hours here.",
          "Use this page for support or inquiries.",
        ],
      },
      {
        title: "App support",
        points: [
          "Send feedback for calculator accuracy.",
          "Share PDF issues or template corrections.",
        ],
      },
    ],
  },
  {
    key: "about",
    title: "About",
    subtitle: "About the app, version details, developer, and disclaimer.",
    sections: [
      {
        title: "App goal",
        points: [
          "Premium Vastu calculator experience.",
          "Guided static content for common home areas.",
        ],
      },
      {
        title: "Disclaimer",
        points: [
          "This app should be used with professional judgment.",
          "Keep your source formulas and PDF template in sync.",
        ],
      },
      {
        title: "Version",
        points: [
          "Update versioning when you publish changes.",
          "Document formula and template updates clearly.",
        ],
      },
    ],
  },
];

export const drawerItems = [
  { label: "Home", key: "home" },
  ...guidePages.map((page) => ({ label: page.title, key: page.key })),
];
