import { GuidePage, OptionItem } from "@/types/vastu";

export const languageOptions: OptionItem[] = [
  { label: "English", value: "English" },
  { label: "Telugu", value: "Telugu" },
  { label: "Hindi", value: "Hindi" },
];

export const directionOptions: OptionItem[] = [
  { label: "1. North", value: "North" },
  { label: "2. North-East", value: "North-East" },
  { label: "3. East", value: "East" },
  { label: "4. South-East", value: "South-East" },
  { label: "5. South", value: "South" },
  { label: "6. South-West", value: "South-West" },
  { label: "7. West", value: "West" },
  { label: "8. North-West", value: "North-West" },
];

export const padhamOptions: OptionItem[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export const nakshatramOptions: OptionItem[] = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
  "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
  "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana",
  "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
].map((item, index) => ({ label: `${index + 1}. ${item}`, value: item }));

export const varguOptions: OptionItem[] = [
  { label: "1 (a, aa, i, ee...)", value: "1" },
  { label: "2 (ka, kha, ga, gha...)", value: "2" },
  { label: "3 (cha, chha, ja, jha...)", value: "3" },
  { label: "4 (ta, tha, da, dha...)", value: "4" },
  { label: "5 (ta, tha, da, dha...)", value: "5" },
  { label: "6 (pa, pha, ba, bha...)", value: "6" },
  { label: "7 (ya, ra, la, va...)", value: "7" },
  { label: "8 (sha, sha, sa, ha...)", value: "8" },
];

export const guidePages: GuidePage[] = [
  {
    key: "soil-testing",
    title: "Soil Testing",
    subtitle: "Soil testing should be done to ensure the land is auspicious for construction.",
    sections: [],
    paragraphs: [
      "Soil testing should be done in 4 ways:"
    ],
    bottomContent: [
      { heading: "1. Color Test", text: "Land with white, red, yellow, and black colors is suitable for all types of construction." },
      { heading: "2. Smell Test", text: "Land with a pleasant fragrance and delightful environment is auspicious." },
      { heading: "3. Taste Test", text: "Land with sweet, sour, or astringent taste is favorable." },
      { heading: "4. Touch Test", text: "The chosen land is auspicious if it feels soft, light, or heavy when touched." },
      { heading: "Prohibited Land", text: "1. Graveyard land\n2. Place where a temple existed (and was removed)\n3. Temple encroached lands\n4. Land with anthills\n5. Land where water always stagnates (muddy land)\n6. Saline / Barren land\n7. Land containing bones, charcoal, or ash\n8. Land with potter's kilns\n9. Land with oil mills\n10. Land filled over ponds/lakes" },
      { heading: "", text: "Such lands should be avoided for all constructions.\n\nFor complete details, please consult a Siddhanti (Vastu expert)." }
    ]
  },
  {
    key: "vargu",
    title: "Vargu Nirnayam",
    subtitle: "Determine your Vargu based on the first letter of your name to check compatibility with directions.",
    sections: [],
    paragraphs: [
      "The Vargu should be determined based on the first letter of the name (Namadyaksharam)."
    ],
    multiColumnTables: [
      {
        headers: ["S.No", "Direction", "Vargu", "Starting Letters"],
        rows: [
          ["1", "East", "'a'", "a, aa, i, ee, u, oo, ru, roo, e, ae, ai, o, oa, au"],
          ["2", "South-East", "'ka'", "ka, kha, ga, gha, nga"],
          ["3", "South", "'cha'", "cha, chha, ja, jha, nya"],
          ["4", "South-West", "'ta'", "ta, tha, da, dha, na (retroflex)"],
          ["5", "West", "'ta'", "ta, tha, da, dha, na (dental)"],
          ["6", "North-West", "'pa'", "pa, pha, ba, bha, ma"],
          ["7", "North", "'ya'", "ya, ra, la, va"],
          ["8", "North-East", "'sha'", "sha, sha, sa, ha"]
        ]
      }
    ],
    bottomContent: [
      { heading: "Important Rules", text: "The Vargu containing the first letter of the name is called 'Swavargu' and is highly favorable, strong, and excellent.\n\nIn the case of conjunct consonants, the last consonant should be considered. Ex: Sri = Sa + ri  = 'ya' vargu.\n\nThe 5th Vargu from the Swavargu is the enemy vargu (Shatruvargu). It causes deathly suffering, ill health, losses, and financial difficulties. It must be avoided.\n\n③ The remaining friendly vargus (Mitra Vargu) yield positive results, bringing friendship and financial gain." },
      { heading: "Direction Groupings", text: "East, South-East — Considered as East direction\nSouth, South-West — Considered as South direction\nWest, North-West — Considered as West direction\nNorth, North-East — Considered as North direction" },
      { heading: "", text: "For complete details, please consult a Siddhanti (Vastu expert)." }
    ]
  },
  {
    key: "plot-shapes",
    title: "Plot Shapes",
    subtitle: "The shape of the plot determines the foundation of your home's energy — a well-proportioned plot supports balance and long-term wellbeing.",
    sections: [],
    paragraphs: [
      "'Chaturashre Dhanagamam, Aayatham Siddhiyaha' — 'Vruttham Pushti Ruchyathe'. According to Vishwakarma.",
      "Squares (Chaturasram), Rectangles (Deergha Chaturasram), and Circular (Vuttakara) plots should be selected for all house and building constructions."
    ],
    multiColumnTables: [
      {
        headers: ["Number - Letter", "Plot Name / Direction", "Road Details"],
        rows: [
          ["1. A", "East Plot", "Having West Road"],
          ["2. Ka", "South-East Plot", "Having North-West Road"],
          ["3. Cha", "South Plot", "Having North Road"],
          ["4. Ta", "South-West Plot", "Having North-East Road"],
          ["5. Tha", "West Plot", "Having East Road"],
          ["6. Pa", "North-West Plot", "Having South-East Road"],
          ["7. Ya", "North Plot", "Having South Road"],
          ["8. Sha", "North-East Plot", "Having South-West Road"]
        ]
      }
    ],
    bottomContent: [
      { text: "People of respective vargas should select plots of their own varga (Swavargu) or friendly vargas for house construction. Enemy varga (Shatruvargu) plots must be avoided. For complete details, please consult a Siddhanti (Vastu expert)." }
    ]
  },
  {
    key: "veedi-potlu",
    title: "Veedi Potlu",
    subtitle: "Veedi Potlu (road hits/impacts) play a prominent role in determining the auspiciousness and inauspiciousness of a site.",
    sections: [],
    paragraphs: [
      "Veedi Potlu (road hits/impacts) play a prominent role in determining the auspiciousness and inauspiciousness of a site.",
      "Sites with road-hits (Potlu) coming from the North, North-East, or West directions are considered favorable and bring many advantages.",
      "Road-hits coming from the East, West, South-East, North-West, or South-West directions cause health problems and financial losses."
    ],
  },
  {
    key: "shanku-sthapana",
    title: "Shanku Sthapana",
    subtitle: "Important ritual performed at the navel (nabhi) of Vastu Purusha",
    sections: [],
    paragraphs: [
      "According to Vishwakarma Prakashika and other Vastu Shastras, 'Shanku Sthapana' should be performed at the navel (nabhi) of Vastu Purusha. In current times it is being done in the North-East. Establishing the Shanku (post/peg) is called Shanku Sthapana. Performing only the Prathamestika Nyasam with bricks is NOT Shanku Sthapana.",
      "Shanku Construction: For all house and building constructions, the Shanku should be made according to Shilpa Shastra. It should be crafted from wood — 6x6 inches square and 12 inches in height. The bottom portion has 4 sides 4 inches high, above it 8 sides 4 inches high, and the topmost portion 4 inches high. The tip of the Shanku points to the navel of Vastu Purusha.",
      "Shanku Sthapana Procedure: The house owner along with his wife, dressed in new clothes and ornaments, should perform Swasti Punyahavachanam, worship the Ashta Dikpalakas (eight direction guardians) and Navagrahas (nine planets) according to shastras, apply turmeric and kumkum to the Shanku, offer sandalwood, flowers, and akshathas, place it on a heap of grains, perform Shodasopachara (sixteen-step) pooja, bathe it with Panchamruta (five sacred substances), various fruit juices and water, decorate with new clothes, and while auspicious instruments are played, establish the Shanku along with Navaratnas (nine gems) and Panchalohas (five metals) in the pit determined at the navel of Vastu Purusha, worship with Vastu Purusha dhyanam, and offer dhupa (incense), deepa (lamp), and naivedyam (offerings). The owner who performs Shanku Sthapana in this scriptural manner shall receive the compassionate grace of Vastu Purusha."
    ],
    multiColumnTables: [
      {
        title: "Month Determination for Shanku Sthapana",
        headers: ["No.", "Month", "Monthly Result", "Recommended Main Doors", "Doors to Avoid"],
        rows: [
          ["1", "Phalguna", "Growth of Wealth (Lakshmi Vruddhi)", "East, North", "West, South"],
          ["2", "Chaitra", "Fear of Disease", "East, North", "West, South"],
          ["3", "Vaishakha", "Gain of Wealth and Gems", "East, North", "West, South"],
          ["4", "Jyeshtha", "Death", "East, South", "West, North"],
          ["5", "Ashadha", "Gain of Servants", "East, South", "West, North"],
          ["6", "Shravana", "Gain of Friends", "East, South", "West, North"],
          ["7", "Bhadrapada", "Harm / Loss", "West, South", "East, North"],
          ["8", "Ashwayuja", "Fear of War", "West, South", "East, North"],
          ["9", "Karthika", "Gain of Wealth and Grains", "West, South", "East, North"],
          ["10", "Margashira", "Wealth Growth", "West, North", "East, South"],
          ["11", "Pushya", "Fear of Thieves", "West, North", "East, South"],
          ["12", "Magha", "Fear of Fire", "West, North", "East, South"]
        ]
      }
    ],
    bottomContent: [
      { heading: "", text: "For Shankus made according to scriptures, please contact us." }
    ]
  },
  {
    key: "main-entrance",
    title: "Main Entrance",
    subtitle: "The main entrance is the face of your home — it sets the first tone of energy that flows through your entire living space.",
    sections: [],
    paragraphs: [
      "'Simhadwaram' means a door like a lion — majestic and grand. It is the primary door through which the owners come and go. Radiating royalty and reflecting a royal lifestyle, it welcomes virtuous people, great gurus, esteemed persons, and dear relatives and friends — adding more glory to the house. It should be larger in height and width than all other doors in the construction, and brings all auspiciousness to the owners."
    ],
    multiColumnTables: [
      {
        headers: ["First Letter of Name", "Vargu", "Direction", "Suitable Main Entrance", "Unsuitable Main Entrance"],
        rows: [
          ["1. a to ah (vowels)", "A", "East", "West, North, South", "East"],
          ["2. ka, kha, ga, gha, nga", "Ka", "South-East", "West, North, South", "East"],
          ["3. cha, chha, ja, jha, nya", "Cha", "South", "North, East, West", "South"],
          ["4. ta, tha, da, dha, na (retroflex)", "Ta", "South-West", "North, East, West", "South"],
          ["5. ta, tha, da, dha, na (dental)", "Tha", "West", "East, North, South", "West"],
          ["6. pa, pha, ba, bha, ma", "Pa", "North-West", "East, North, South", "West"],
          ["7. ya, ra, la, va", "Ya", "North", "South, East, West", "North"],
          ["8. sha, sha, sa, ha", "Sha", "North-East", "South, East, West", "North"]
        ]
      }
    ]
  },
  {
    key: "bedroom",
    title: "Bed rooms",
    subtitle: "Bed room layout",
    sections: [],
    paragraphs: [
      "In a house, bedrooms should be located in the South, South-West, West, and North-West directions. The master bedroom should always be in the South-West direction.",
      "Children's bedrooms should be in the West, South, and North-West directions. Guest bedrooms can also be in the South-East.",
      "Bedrooms should never be in the North-East."
    ],
  },
  {
    key: "bathroom",
    title: "Bathrooms & Toilets",
    subtitle: "Bathrooms and Toilets according to Vastu Shastra",
    sections: [],
    paragraphs: [
      "According to Vastu, toilets should be located in the South-West, North-West, West, or South directions. However, since attached bathrooms are often necessary, they can be set up attached to bedrooms in the South, South-West, West, and North-West directions.",
      "Bathrooms (without toilets) can also be located in the East and North directions."
    ],
  },
  {
    key: "kitchen",
    title: "Kitchen",
    subtitle: "Kitchen layout",
    sections: [],
    paragraphs: [
      "In all constructions, the kitchen should be set up in the South-East corner, which is the place of fire (Agni).",
      
      "If the South-East is not possible, the kitchen can be set up in the South, South-West, or East directions."
    ],
  },
  {
    key: "pooja-room",
    title: "Pooja Room",
    subtitle: "Pooja Room layout",
    sections: [],
    paragraphs: [
      "The Pooja room or Pooja mandir should be set up in the North-East of the house. It can also be set up in the East or North directions.",
      "The deity's peetham (altar) should face West or South so that we face East or North while performing pooja.",
      "The Pooja room should be filled with pictures of deities and divine items, enhancing spiritual radiance and bringing peace to the mind. Old items, leftover materials, and other heavy objects should not be kept in the Pooja room."
    ],
  },
  {
    key: "dining-room",
    title: "Dining Room",
    subtitle: "Dining table layout",
    sections: [],
    paragraphs: [
      "According to Vastu Shastras like Vishwakarma Prakashika, the dining room should be set up in the West. Therefore, it is best to set up the dining room in the West direction.",
      "Depending on the requirement, the dining room can also be set up in the East, South, South-East, or North-East directions."
    ],
  },
  {
    key: "staircase",
    title: "Staircase & Lifts",
    subtitle: "Staircase layout",
    sections: [],
    paragraphs: [
      "It is mandatory to set up a staircase to go to the upper floor. It is beneficial if the stairs go upward in a clockwise direction (Pradakshina order).",
      "Depending on the direction of the construction, the staircase should be set up in the South-East, South-West, or North-West directions.",
      "If setting up a lift, it should be placed in the South-East or North-West directions. A lift should not be set up in the South-West."
    ],
  },
  {
    key: "parking",
    title: "Parking",
    subtitle: "Parking layout",
    sections: [],
    paragraphs: [
      "Parking is an essential space for vehicles. For every construction, parking should be set up in the East or North parts.",
      "When it comes to providing underground parking, it is beneficial to avoid an entrance from the South-West."
    ],
  },
  {
    key: "borewell",
    title: "Water Tank & Borewell",
    subtitle: "Water tank & Borewell layout",
    sections: [],
    paragraphs: [
      "Generally, a Borewell and Tap should be set up in the North-East part.",
      "Water filling in the North-East and being drawn out from the North-East is a very healthy Vastu feature.",
      "Only in the case of an OHT (Over Head Tank), depending on the weight and size, the O.H Tank should be set up on top of the house in the South-West, South, or West directions."
    ],
  },
  {
    key: "septic-tank",
    title: "Septic Tank",
    subtitle: "Septic tank layout",
    sections: [],
    paragraphs: [
      "The septic tank is a cause of ill health, and its placement is considered carefully in modern Vastu. Because it involves digging a pit, the North-West portion is favorable in all respects. Depending on the need, it can also be set up in the North, East, or South-East parts.",
      "Under no circumstances should a Septic tank be set up in the South-West, West, South, or North-East directions."
    ],
  },
  {
    key: "trees",
    title: "Trees",
    subtitle: "Trees and plants Vastu guidelines",
    sections: [],
    paragraphs: [
      "Gardens and small shrubs should be arranged in the East and North directions of the compound. They can also be arranged to a suitable extent in the South and West directions.",
      "Strong trees should be ensured to remain in the South-West, South and West directions. It is not favorable to have strong trees and plants in the East, North-East and North directions."
    ],
  },
  {
    key: "about",
    title: "Vishwakarma Vastu Sarvasvam",
    subtitle: "About Vishwakarma Vastu Sarvaswam",
    sections: [],
    paragraphs: [
      "This 'Vishwakarma Vastu Sarvasvam' App has been developed in a very simple style, extracting secret and special scientific details from ancient Vastu Shastra texts like Vishwakarma Prakashika, Mayamatam, Aparajita Pruccha, Samarangana Sutradharam, and Manushyalaya Chandrika, so as to be useful to common people, Siddhantis (experts), and Vastu Shastra researchers.",
      "With the objective of protecting traditional Vastu practices, Indian culture, and traditions, the book 'Vishwakarma Vastu Sarvasvam' is being launched soon.",
      "For your invaluable suggestions, advice, and consultations, please feel free to contact us."
    ],
  },
  {
    key: "nava-vargu-ganitha-kramamu",
    title: "Nava Vargu Ganitha Sasthra",
    subtitle: "Vastu calculation formulas and analysis details",
    sections: [],
    tableData: [
      { label: "Padam", formula: "Length \u00D7 Width \u00F7 9" },
      { label: "Dhanam", formula: "Padam \u00D7 8 \u00F7 12" },
      { label: "Runam", formula: "Padam \u00D7 3 \u00F7 8" },
      { label: "Tithi", formula: "Padam \u00D7 6 \u00F7 30" },
      { label: "Vaaram", formula: "Padam \u00D7 9 \u00F7 7" },
      { label: "Nakshatram", formula: "Padam \u00D7 8 \u00F7 27" },
      { label: "Aayam", formula: "Padam \u00D7 9 \u00F7 8" },
      { label: "Ayurdayam", formula: "Padam \u00D7 9 \u00F7 120" },
      { label: "Amsam", formula: "Padam \u00D7 6 \u00F7 9" },
      { label: "Dikruthi", formula: "Padam \u00D7 9 \u00F7 8" },
    ],
    bottomContent: [
      { heading: "Calculation Result Determination", text: "" },
      { heading: "1. Dhanam (Wealth)", text: "Total dhanams are 12. The remainder should be greater than the remainder in Runam." },
      { heading: "2. Runam (Debt)", text: "Total runams are 8. The remainder should be less than the remainder in Dhanam." },
      { heading: "3. Tithi", text: "Total tithis are 30. Remainders 1, 4, 9, 19, 24, 29, 30 are inauspicious. The rest are auspicious." },
      { heading: "4. Vaaram (Day)", text: "Total days are 7. The 3rd day (Tuesday) is prohibited. 1,7 are average. 2,4,5,6 are auspicious." },
      { heading: "5. Nakshatram (Star)", text: "Total nakshatras are 27. The resulting nakshatram must have Tarabalam for the owners." },
      { heading: "6. Aayam", text: "Total aayams are 8. Here 2,4,6,8 give inauspicious results. 1,3,5,7 give auspicious results. According to Main Door: East 3,5,7; West 1,3,7; North 1,3,5; South 1,5,7." },
      { heading: "7. Ayurdayam (Longevity)", text: "Out of 120 years, it should be at least 60 years or above." },
      { heading: "8. Amsa", text: "Total amsas are 9. Excluding 1, 4, 5, 6; the numbers 2,3,7,8,9 give auspicious results." },
      { heading: "9. Dikpati (Direction Lord)", text: "There are 8 lords for the 8 directions. The numbers 2, 4, 6, 8 should not appear; the numbers 1, 3, 5, 7 should come. (Note: The same numbers that appear in Aayam do NOT count here.)" }
    ],
  },
  {
    key: "tara-chandra-chakra",
    title: "Tara & Chandra Bala Chakra",
    subtitle: "Day Lords, Tarabalam, and Chandrabalam Calculation Table",
    sections: [],
    paragraphs: [
      "👉 Arrow pointing right (→) indicates the Nakshatram in Panchanga (Daily Nakshatram).\n👇 Arrow pointing down (↓) indicates your Birth (Janma) or Name Nakshatram.",
      "Day Lords (Dinadhipathi) - The ruling lord changes as the day's star (Dina Nakshatram) or birth star (Janma Nakshatram) changes."
    ],
    multiColumnTables: [
      {
        title: "Day Lords, Tara & Chandra Bala Calculation Table",
        headers: [
          "Birth \\ Daily Star",
          "Ashwini / Magha / Moola",
          "Bharani / P.Phalguni / P.Ashadha",
          "Krittika / U.Phalguni / U.Ashadha",
          "Rohini / Hasta / Shravana",
          "Mrigashirsha / Chitra / Dhanishta",
          "Ardra / Swati / Shatabhisha",
          "Punarvasu / Vishakha / P.Bhadrapada",
          "Pushya / Anuradha / U.Bhadrapada",
          "Ashlesha / Jyeshtha / Revati"
        ],
        rows: [
          ["Ashwini / Magha / Moola", "Sun 1", "Mercury 2", "Rahu 3", "Jupiter 4", "Ketu 5", "Moon 6", "Saturn 7", "Venus 8", "Mars 9"],
          ["Bharani / P.Phalguni / P.Ashadha", "Mars 9", "Sun 1", "Mercury 2", "Rahu 3", "Jupiter 4", "Ketu 5", "Moon 6", "Saturn 7", "Venus 8"],
          ["Krittika / U.Phalguni / U.Ashadha", "Venus 8", "Mars 9", "Sun 1", "Mercury 2", "Rahu 3", "Jupiter 4", "Ketu 5", "Moon 6", "Saturn 7"],
          ["Rohini / Hasta / Shravana", "Saturn 7", "Venus 8", "Mars 9", "Sun 1", "Mercury 2", "Rahu 3", "Jupiter 4", "Ketu 5", "Moon 6"],
          ["Mrigashirsha / Chitra / Dhanishta", "Moon 6", "Saturn 7", "Venus 8", "Mars 9", "Sun 1", "Mercury 2", "Rahu 3", "Jupiter 4", "Ketu 5"],
          ["Ardra / Swati / Shatabhisha", "Ketu 5", "Moon 6", "Saturn 7", "Venus 8", "Mars 9", "Sun 1", "Mercury 2", "Rahu 3", "Jupiter 4"],
          ["Punarvasu / Vishakha / P.Bhadrapada", "Jupiter 4", "Ketu 5", "Moon 6", "Saturn 7", "Venus 8", "Mars 9", "Sun 1", "Mercury 2", "Rahu 3"],
          ["Pushya / Anuradha / U.Bhadrapada", "Rahu 3", "Jupiter 4", "Ketu 5", "Moon 6", "Saturn 7", "Venus 8", "Mars 9", "Sun 1", "Mercury 2"],
          ["Ashlesha / Jyeshtha / Revati", "Mercury 2", "Rahu 3", "Jupiter 4", "Ketu 5", "Moon 6", "Saturn 7", "Venus 8", "Mars 9", "Sun 1"]
        ]
      }
    ],
    bottomContent: [
      { heading: "Tarabalam Table", text: "1) Janma Tara (Inauspicious), 2) Sampat Tara (Auspicious), 3) Vipat Tara (Inauspicious), 4) Kshema Tara (Auspicious), 5) Pratyak Tara (Inauspicious), 6) Sadhana Tara (Auspicious), 7) Naidhana Tara (Inauspicious), 8) Mitra Tara (Auspicious), 9) Parama Mitra Tara (Auspicious)." },
      { heading: "Chandrabalam Rules", text: "• Shukla Paksha: Moon in 2, 5, 9 houses from your Janma Rasi is good.\n• Krishna Paksha: Moon in 4, 8, 12 houses from your Janma Rasi is good.\n• Both Pakshas: Moon in 1, 3, 6, 7, 10, 11 houses is highly favorable." }
    ]
  },
  {
    key: "faq",
    title: "FAQ",
    subtitle: "Frequently asked questions about Viswakarma Vastu Sarvaswam and how it works.",
    sections: [],
    paragraphs: [
      "Viswakarma Vastu Sarvaswam is a professional Vastu Shastra analysis application.",
      "The app calculates the Nava Vargu (9-factor) Vastu analysis based on plot dimensions, direction, owner's Nakshatram and Vargu.",
      "The PDF report is generated in the selected language (Telugu, Hindi, or English) and can be shared or printed.",
      "For complete Vastu consultation, please contact a qualified Siddhanthi (Vastu expert)."
    ],
  },
  {
    key: "contact",
    title: "Contact",
    subtitle: "Contact the Viswakarma Vastu Sarvaswam team for support or consultation.",
    sections: [],
    paragraphs: [
      "We welcome all inquiries about the Viswakarma Vastu Sarvaswam application, whether they relate to the calculator functionality or the PDF report system. Our team is committed to providing accurate responses.",
      "For professional Vastu consultation services, our team of experienced Vastu practitioners is available for personal appointments. A professional consultation takes into account the full complexity of your site.",
      "Our contact details are listed below. You can easily reach us. We are always ready to support you."
    ],
  },
  {
    key: "gruharambham",
    title: "Gruharambham",
    subtitle: "Auspicious timing and rituals for starting house construction.",
    sections: [],
    paragraphs: [
      "Gruharambham or Shankusthapana is the formal ceremony of laying the foundation stone before initiating the construction of a new house.",
      "It must be performed during auspicious Muhurtham to ensure prosperity, peace, and longevity of the building."
    ],
  },
  {
    key: "gruhapravesam",
    title: "Gruhapravesam",
    subtitle: "The sacred housewarming ceremony when entering a new home.",
    sections: [],
    paragraphs: [
      "Gruhapravesam is a sacred Hindu housewarming ceremony performed before occupying a newly built house or a renovated home.",
      "Performing proper Vastu Puja, Kalasa Pooja, and boiling milk ensures that positive energy flows throughout the new house."
    ],
  },
];

export const drawerItems = [
  { label: "Home", key: "home" },
  ...guidePages.map((page) => ({ label: page.title, key: page.key })),
];
