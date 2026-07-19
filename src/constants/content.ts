import { GuidePage, OptionItem } from "@/types/vastu";

export const languageOptions: OptionItem[] = [
  { label: "English", value: "English" },
  { label: "Telugu", value: "Telugu" },
  { label: "Hindi", value: "Hindi" },
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
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
  "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
  "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana",
  "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
].map((item) => ({ label: item, value: item }));

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
    key: "main-entrance",
    title: "Main Entrance",
    subtitle: "The main entrance is the face of your home — it sets the first tone of energy that flows through your entire living space.",
    sections: [],
    paragraphs: [
      "సింహద్వారము అనగా సింహము వంటి సింహ ద్వారము అనగా ద్వారము అని అర్ధము. యజమానులు రాక పోకలు చేయు ప్రధాన ద్వారము, రాజవీధిని చూస్తూ, రాజ జీవిత ఉట్టిపడు చూ, సద్గుణ సంపన్నులు సద్గురువులు, మహనీయులు, బంధు వులను ఆహ్వానించు సింహ ద్వారము ఇంటికి మరింత శోభను చేకూర్చును.",
      "నిర్మాణము లోని మిగిలిన అన్ని ద్వార ముల కన్నా ఎత్తు, వెడల్పుల పెద్దదై సకల యజమానులకు సకల శుభాలను చేకూర్చును."
    ],
    multiColumnTables: [
      {
                                headers: ["పేరులోని మొదటి అక్షరం", "వర్గు", "దిక్కు", "సరిపోవు సింహద్వారం", "సరిపడని సింహద్వారం"],
        rows: [
          ["1. అ నుండి అః వరకు", "అ", "తూర్పు", "పడమర, ఉత్తరం, దక్షిణం", "తూర్పు"],
          ["2. క, ఖ, గ, ఘ, ఙ", "క", "ఆగ్నేయం", "పడమర, ఉత్తరం, దక్షిణం", "తూర్పు"],
          ["3. చ, ఛ, జ, ఝ, ఞ", "చ", "దక్షిణం", "ఉత్తరం, తూర్పు, పడమర", "దక్షిణం"],
          ["4. ట, ఠ, డ, ఢ, ణ", "ట", "నైరుతి", "ఉత్తరం, తూర్పు, పడమర", "దక్షిణం"],
          ["5. త, థ, ద, ధ, న", "త", "పడమర", "తూర్పు, ఉత్తరం, దక్షిణం", "పడమర"],
          ["6. ప, ఫ, బ, భ, మ", "ప", "వాయువ్యం", "తూర్పు, ఉత్తరం, దక్షిణం", "పడమర"],
          ["7. య, ర, ల, వ", "య", "ఉత్తరం", "దక్షిణం, తూర్పు, పడమర", "ఉత్తరం"],
          ["8. శ, ష, స, హ", "శ", "ఈశాన్యం", "దక్షిణం, తూర్పు, పడమర", "ఉత్తరం"]
        ]
      }
    ]
  },
  {
    key: "kitchen",
    title: "Kitchen",
    subtitle: "Kitchen layout",
    sections: [],
    paragraphs: [
      "In all constructions, the kitchen should be set up in the South-East corner, which is the place of fire (Agni).",
      "A kitchen should never be set up in the North-West, which is considered the enemy position to the South-East.",
      "If the South-East is not possible, the kitchen can be set up in the South, South-West, or East directions."
    ],
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
    key: "plot-shapes",
    title: "Plot Shapes",
    subtitle: "The shape of the plot determines the foundation of your home's energy — a well-proportioned plot supports balance and long-term wellbeing.",
    sections: [],
    paragraphs: [
      "'చతురత్రే ధనాగమం', ఆయతం సిద్దియ:",
      "స్వరాక్ష: \"కృతం పుష్టి రుచ్యతే . అను -  విశ్వకర్మముననుసరించి.",
      "చతురస్రం, దీర్ఘ చతురస్రం, వుత్తాకార సలాలను సకలగృహ, భవన నిర్మాణముల లటే ఎన్ను కొన వలయును.  విశేషము"
    ],
    multiColumnTables: [
      {
        headers: ["సంఖ్య - అక్షరం", "స్థలం పేరు / దిశ", "రోడ్డు వివరాలు"],
        rows: [
          ["1. అ", "తూర్పు స్తలం", "పడమర రోడ్డు గలది"],
          ["2. క", "ఆగ్నేయ స్తలం", "ఆగ్నేయ రోడ్డు గలది"],
          ["3. చ", "రక్షికాస్తుం", "దక్షిణం రోడ్డు గలది"],
          ["4. ట", "-", "నైరుతి రోడ్డు గలది"],
          ["5. త", "వాడమ్మాసనం", "పడమర రోడ్డు గలది"],
          ["6. ప", "వాయువ్వం స్తలం", "వాయువ్యం రోడ్డు గలది"],
          ["7. య", "ఉత్తరం స్థలం", "ఉత్తరం రోడ్డు గలది"],
          ["8. శ", "ఈశాన్యం స్థలం", "ఈశాన్యం రోడ్డు గలది"]
        ]
      }
    ],
    bottomContent: [
      { text: "ఆయా వర్గుల వాళ్ళు తమ స్వవర్గు మిత్ర వర్గు స్థలములను ఎన్నుకొని నిర్మాణములు చేసుకొనవలెను. శత్రువర్గ నిలములను విసర్జించ వలెను.  పూర్తి వివరములను సిద్ధాంతిగారిని సంప్రదించండి." }
    ]
  },
  {
    key: "veedi-potlu",
    title: "Veedi Potlu",
    subtitle: "Veedi potlu play a prominent role in determining the auspiciousness and inauspiciousness of a site.",
    sections: [],
    paragraphs: [
      "Veedi potlu play a prominent role in determining the auspiciousness and inauspiciousness of a site.",
      "(Potlu) This site is favorable in all ways. Sites with potlu (hits) bring many advantages acting as centers in North, North-East, and West.",
      "Those acting as centers in East, West, South-East, North-West, and South-West cause health issues and financial losses."
    ],
  },
  {
    key: "faq",
    title: "FAQ",
    subtitle: "Common questions about the Sri Vastu app, how it works, and how to get the most from your Vastu analysis.",
    sections: [],
    paragraphs: [
      "ఆ విశ్వకర్మ శాస్త్ర సర్వస్వం ఒక ప్రొఫెషనల్ వాస్తు శాస్త్ర విశ్లేషణ అప్లికేషన్."
    ],
  },
  {
    key: "contact",
    title: "Contact Us",
    subtitle: "Reach out to the Sri Vastu team for support, professional consultation, or any questions about the application.",
    sections: [],
    paragraphs: [
      "We welcome all inquiries about the Sri Vastu application, whether they relate to the calculator's functionality, the guide content, or the PDF report system. Our team is committed to providing accurate, thoughtful responses to every message we receive, and to continuously improving the application based on the feedback and needs of our users. You can reach us through the contact details provided below, and we aim to respond to all inquiries within a reasonable timeframe.",
      "For professional Vastu consultation services beyond the scope of the application, our team of experienced Vastu practitioners is available for personal appointments — both in-person and remote. A professional consultation takes into account the full complexity of your site, your family's birth charts, and your specific life goals in a way that goes beyond what any application can provide. We believe deeply in the value of this ancient science and are honoured to share it with those who seek its guidance.",
      "Please update this page with your specific contact details — phone number, email address, office location, and consultation hours — so that your clients can reach you easily and confidently. If you have a website or social media presence, adding those links here creates a complete point of contact that reflects the professional quality of the service you offer. We are here to support you and your clients in every way we can.",
    ],
  },
  {
    key: "about",
    title: "Vishwakarma Vastu Sarvasvam",
    subtitle: "About Vishwakarma Vastu Sarvasvam",
    sections: [],
    paragraphs: [
      "This \"Vishwakarma Vastu Sarvasvam\" App has been developed in a very simple style, extracting secret and special scientific details from ancient Vastu Shastra texts like Vishwakarma Prakashika, Mayamatam, Aparajita Pruccha, Samarangana Sutradharam, and Manushyalaya Chandrika, so as to be useful to common people, Siddhantis (experts), and Vastu Shastra researchers.",
      "With the objective of protecting traditional Vastu practices, Indian culture, and traditions, the book \"Vishwakarma Vastu Sarvasvam\" is being launched soon.",
      "For suggestions, advice, and contact | To contact the Vastu Siddhantis needed to enhance the author's talent..."
    ],
  },
  {
    key: "nava-vargu-ganitha-kramamu",
    title: "Nava Vargu Ganitha Kramamu",
    subtitle: "Vastu calculation formulas and analysis details",
    sections: [],
    tableData: [
      { label: "Padam", formula: "Length × Width ÷ 9" },
      { label: "Dhanam", formula: "Padam × 8 ÷ 12" },
      { label: "Runam", formula: "Padam × 3 ÷ 8" },
      { label: "Tithi", formula: "Padam × 6 ÷ 30" },
      { label: "Vaaram", formula: "Padam × 9 ÷ 7" },
      { label: "Nakshatram", formula: "Padam × 8 ÷ 27" },
      { label: "Aayam", formula: "Padam × 9 ÷ 8" },
      { label: "Ayurdayam", formula: "Padam × 9 ÷ 120" },
      { label: "Amsam", formula: "Padam × 6 ÷ 9" },
      { label: "Dikruthi", formula: "Padam × 9 ÷ 8" },
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
      { heading: "9. Dikruthi", text: "There are 8 lords for directions. Here 2,4,6,8 should not come, and 1,3,5,7 should come." }
    ],
  },
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
      { heading: "Prohibited Land", text: "1. Graveyard land\n2. Place where a temple existed (and was removed)\n3. Land with anthills\n4. Land where water always stagnates (muddy land)\n5. Saline / Barren land\n6. Land containing bones, charcoal, or ash\n7. Land with potter's kilns\n8. Land with oil mills\n9. Land filled over ponds/lakes" },
      { heading: "", text: "Such lands should be avoided for all constructions.\n\nFor complete details, please consult a Siddhanti (Vastu expert)." }
    ]
  },
        {
    key: "vargu",
    title: "Vargu",
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
      { heading: "Important Rules", text: "The Vargu containing the first letter of the name is called 'Swavargu' and is highly favorable, strong, and excellent.\n\nIn the case of conjunct consonants, the last consonant should be considered. Ex: Sri - S + r + i - 'ya' vargu.\n\nThe 5th Vargu from the Swavargu is the enemy vargu (Shatruvargu). It causes deathly suffering, ill health, losses, and financial difficulties. It must be avoided.\n\n③ The remaining friendly vargus (Mitra Vargu) yield positive results, bringing friendship and financial gain." },
      { heading: "Direction Groupings", text: "East, South-East — Considered as East direction\nSouth, South-West — Considered as South direction\nWest, North-West — Considered as West direction\nNorth, North-East — Considered as North direction" },
      { heading: "", text: "For complete details, please consult a Siddhanti (Vastu expert)." }
    ]
  },
  {
    key: "shanku-sthapana",
    title: "శంఖుస్థాపన",
    subtitle: "వాస్తు పురుషుని నాభి ప్రదేశమందు చేయు ముఖ్యమైన విధి",
    sections: [],
    paragraphs: [
      "విశ్వకర్మ ప్రకాశికాది వాస్తు శాస్త్రానుసారం \"శంఖు స్థాపన\" వాస్తు పురుషుని నాభి ప్రదేశమందు చేయు వలెను. ప్రస్తుత కాలమందు ఈశాన్యమున చేయుచున్నారు. శంఖువును స్థాపించుటయే శంఖుస్థాపన. ఇటుకలతో చేయునది ప్రథమేష్టి కాన్యాసము మాత్రమే శంఖుస్థాపన కానీరదు.",
      "శంకు నిర్మాణము: సకల గృహభవన నిర్మాణములకు శిల్ప శాస్త్రానుసారం శంకును తయారుచేసి స్థాపించవలెను. 6x6 అంగుళంలు చతురము 12 అంగుళములు ఎత్తు గల దారువుతో శంకును తయారుచేయవలెను. క్రింద 4 భుజములు 4 అంగుళములు ఎత్తు, దానిపై 8 భుజములు 4 అంగుళములు ఎత్తు దానిపై 4 అంగుళములు ఎత్తుతో శంకు నిర్మాణము చేయవలెను. శంకువు పై కొన వాస్తుపురుషుని నాభిస్థానమునకు సూచిక.",
      "శంకు స్థాపన విధి: గృహ యజమాని భార్యతోకూడి వస్త్రాభరణాద్యలంకారంబులను ధరించిన వాడై స్వస్తి పుణ్యాహావాచనము ఆచరించి అష్టదిక్పాలకులను, నవగ్రహాదులను శాస్త్రోక్తముగా అర్చించి శంకువునకు పసుపువ్రాసి కుంకుమబొట్లుంచి గంధపుష్పాక్షతలొసంగి ధాన్యపు రాశిపై నుంచి షోడశోపచారపూజలు చేసి పంచామృతములు వివిధ ఫలరసంబులు, నీటితో అభిషేకించి నూతన వస్త్రములతో అలంకరించి మంగళవాయిద్యములు మ్రోయగా శంకువును నవరత్నములు పంచలోహాదులతో సహ వాస్తు పురుషుని నాభిస్థానమున నిర్ణయించిన అగడ్త యందు స్థాపించి వాస్తుపురుష ధ్యానంబులతో అర్చించి ధూపదీప నైవేధ్యములు అర్పించవలెను. ఇట్లు శాస్త్రోక్తముగా శంకుస్థాపన చేయు యజమాని వాస్తు పురుషుని కరుణా కటాక్షములకు పాత్రుడగును."
    ],
    multiColumnTables: [
      {
        title: "గృహనిర్మాణమునకు మాసములు",
        headers: ["వ.నెం", "నెల", "ఫలితం"],
        rows: [
          ["1", "చైత్రము", "~~ధనక్షయము~~ ధనము"],
          ["2", "వైశాఖము", "సంపద"],
          ["3", "జ్యేష్ఠము", "మృత్యుప్రదము"],
          ["4", "ఆషాఢము", "సిరి సంపదలు నాశంబు"],
          ["5", "శ్రావణము", "ధనము"],
          ["6", "భాద్రపదము", "రోగభయము"],
          ["7", "ఆశ్వయుజము", "కలహములు"],
          ["8", "కార్తీకము", "ధన యోగము"],
          ["9", "మార్గశిరము", "ధాన్యము"],
          ["10", "పుష్యము", "పశునాశనము"],
          ["11", "మాఘము", "వంశాభివృద్ధి"],
          ["12", "ఫాల్గుణము", "ధనలాభం"]
        ]
      },
      {
        title: "శంఖుస్థాపనకు మాస నిర్ణయము",
        headers: ["నెం", "నెల", "మాస ఫలము", "చేయవలసిన సింహద్వారములు", "చేయకూడని సింహద్వారములు"],
        rows: [
          ["1", "ఫాల్గుణ మాసము", "లక్ష్మీవృద్ధి", "తూర్పు, ఉత్తరం", "పడమర, దక్షిణం"],
          ["2", "చైత్ర మాసము", "వ్యాధి భయం", "తూర్పు, ఉత్తరం", "పడమర, దక్షిణం"],
          ["3", "వైశాఖ మాసము", "ధన, రత్న లాభము", "తూర్పు, ఉత్తరం", "పడమర, దక్షిణం"],
          ["4", "జ్యేష్ఠ మాసము", "మరణము", "తూర్పు, దక్షిణం", "పడమర, ఉత్తరం"],
          ["5", "ఆషాఢ మాసము", "భృత్యు లాభము", "తూర్పు, దక్షిణం", "పడమర, ఉత్తరం"],
          ["6", "శ్రావణ మాసము", "మిత్ర లాభము", "తూర్పు, దక్షిణం", "పడమర, ఉత్తరం"],
          ["7", "భాద్రపద మాసము", "హాని", "పడమర, దక్షిణం", "తూర్పు, ఉత్తరం"],
          ["8", "ఆశ్వయుజ మాసము", "యుద్ధ భయము", "పడమర, దక్షిణం", "తూర్పు, ఉత్తరం"],
          ["9", "కార్తీక మాసము", "ధన, ధాన్య లాభము", "పడమర, దక్షిణం", "తూర్పు, ఉత్తరం"],
          ["10", "మార్గశిర మాసము", "ధనవృద్ధి", "పడమర, ఉత్తరం", "తూర్పు, దక్షిణం"],
          ["11", "పుష్య మాసము", "చోర భయము", "పడమర, ఉత్తరం", "తూర్పు, దక్షిణం"],
          ["12", "మాఘ మాసము", "అగ్ని భయము", "పడమర, ఉత్తరం", "తూర్పు, దక్షిణం"]
        ]
      }
    ]
  }
];

export const drawerItems = [
  { label: "Home", key: "home" },
  ...guidePages.map((page) => ({ label: page.title, key: page.key })),
];
