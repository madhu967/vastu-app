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
      "The main entrance of a home holds deep significance in Vastu Shastra. It is the primary gateway through which energy, light, and life enter the home. A well-positioned and well-maintained entrance invites prosperity, clarity, and calm into the household. The door should face a direction that complements the owner's birth star and the overall plot orientation, allowing the natural forces of the environment to work in harmony with the family's life rhythm.",
      "The entrance area should always be kept clean, uncluttered, and well-lit. Warm lighting at the threshold creates a welcoming atmosphere that psychologically and energetically signals comfort and safety. Avoid placing heavy objects, broken items, or dark decorative elements near the doorway, as these can create subconscious resistance and block the natural flow of positive energy through the space.",
      "The door itself should open smoothly and fully, without any creaking or resistance. A door that sticks or makes noise symbolises friction and delay in the progress of the household. The material, colour, and design of the main door should be chosen with care — solid wood with auspicious carvings or simple, clean lines is generally preferred. Keeping a small threshold lamp or a sacred symbol above the door enhances the sense of divine protection and invites grace into the home.",
    ],
  },
  {
    key: "living-room",
    title: "Living Room",
    subtitle: "The living room is the heart of the home — the space where family bonds are strengthened and guests are welcomed with warmth.",
    sections: [],
    paragraphs: [
      "The living room functions as the central energy zone of any home. According to Vastu principles, this space should be designed to encourage openness, ease of movement, and a sense of calm togetherness. Furniture should be arranged so that conversation is natural and there are no physical barriers between people when they sit together. The seating should ideally face a direction that promotes attentiveness and calm, ensuring that all members of the household feel at ease and connected.",
      "Natural light plays a critical role in the quality of energy within the living room. Large windows that allow morning or afternoon light to enter are highly beneficial, bringing vitality and warmth into daily life. The colours chosen for the walls and furnishings should be soft, grounding, and harmonious — earthy tones, warm whites, and muted golds create a space that feels both inviting and dignified. Avoid stark contrasts or overwhelming patterns that create visual noise and restlessness.",
      "The television and media unit should be placed on a stable, balanced wall, ideally facing the seating arrangement without dominating the entire space. Decor elements — artwork, plants, and lighting — should be chosen to feel light and intentional rather than crowded. A single centrepiece or focal point in the room, such as a meaningful painting or a small plant, creates visual harmony. Keep movement paths clear and open, so energy can flow freely through the space without feeling trapped or blocked.",
    ],
  },
  {
    key: "kitchen",
    title: "Kitchen",
    subtitle: "The kitchen is where nourishment is created — a space that connects the element of fire with the energy of abundance and health.",
    sections: [],
    paragraphs: [
      "In Vastu Shastra, the kitchen is governed by the fire element and holds a very important position in the health and prosperity of the household. The cooking area should be positioned so that the person cooking faces an auspicious direction, ideally with the fire source — the stove or burner — placed in a location that reflects the natural flow of the fire element within the home. This alignment ensures that meals are prepared with a calm and focused energy, which according to ancient wisdom, directly influences the wellbeing of those who consume the food.",
      "The placement of water and fire elements within the kitchen deserves careful attention. The sink, representing water, and the stove, representing fire, should not be directly adjacent or opposite to each other, as these opposing elements can create conflict and instability in the household's health and finances. A comfortable working distance between them, with adequate counter space in between, creates a natural buffer that allows both energies to coexist and complement rather than clash.",
      "Storage should be organised, accessible, and free of clutter. Frequently used items should be within easy reach, while the countertops should remain as clear as possible, giving the cook both physical and mental space to work with clarity and calm. Warm, grounding tones for the kitchen surfaces — such as cream, terracotta, or soft wood — promote a nurturing atmosphere. Avoid harsh, cold colours that can make the space feel clinical and unwelcoming. Good ventilation and clean exhaust systems are equally important, as they ensure the energy of cooked food and heat dissipates cleanly rather than accumulating and stagnating.",
    ],
  },
  {
    key: "bedroom",
    title: "Bedroom",
    subtitle: "The bedroom is your sanctuary of rest and renewal — where the body recovers, the mind quietens, and the spirit restores itself.",
    sections: [],
    paragraphs: [
      "The bedroom is the most personal space in any home, and its Vastu alignment directly influences the quality of sleep, health, and emotional wellbeing of its occupants. The bed should be positioned so that the head points in an auspicious direction during sleep — this alignment is believed to synchronise the body's magnetic field with the earth's natural magnetic energy, promoting deep, restorative rest. The bed should ideally be placed with a solid wall behind the headboard, giving a sense of support and security, and with walking space on at least two sides.",
      "Mirrors in the bedroom require thoughtful placement. A mirror that directly reflects the sleeping person is generally considered disruptive to rest and emotional equilibrium, as the reflective surface is believed to amplify energy in a way that disturbs deep sleep. Mirrors should be placed on side walls or inside wardrobe doors, where they serve a practical function without creating visual or energetic imbalance. Wardrobe units should be placed on stable walls and kept organised and clean, as cluttered storage spaces are said to represent mental and emotional overload.",
      "The colours, textures, and lighting of the bedroom should all contribute to a sense of calm, warmth, and intimacy. Soft earth tones, muted blues, warm greys, and gentle creams are ideal choices that promote relaxation without being dull. Avoid bright, stimulating colours or chaotic patterns that activate the mind rather than soothing it. Lighting should be layered — soft ambient light for evenings, and the ability to allow natural morning light without it being harsh. Removing electronic devices, or at minimum keeping them at a distance from the sleeping area, further supports the peaceful energy of this sacred resting space.",
    ],
  },
  {
    key: "bathroom",
    title: "Bathroom & Toilet",
    subtitle: "A well-planned bathroom supports cleanliness, clarity, and the smooth release of what is no longer needed — physically and energetically.",
    sections: [],
    paragraphs: [
      "The bathroom and toilet are spaces dedicated to cleansing and release, and their Vastu placement has a direct influence on the flow of health, finances, and emotional clarity within the home. According to traditional principles, these spaces should be positioned away from the more sacred or productive zones of the house — such as the kitchen, pooja room, or the main entrance area. The location of drainage and water release points should follow the natural slope and flow direction of the site, ensuring that water exits the property in a way that is clean, efficient, and energetically sound.",
      "Hygiene within the bathroom is paramount from both a physical and a Vastu perspective. Fixtures should be well-maintained, fully functional, and free of leaks or stagnation. A dripping tap or blocked drain is not simply a plumbing issue — it represents a continuous, uncontrolled loss of energy and resources that subtly affects the household's overall sense of abundance and control. Ventilation is equally important, as a well-ventilated bathroom ensures that stale, heavy energy is released quickly and replaced with fresh, light air.",
      "The visual environment of the bathroom should feel clean, bright, and private. Light colours on walls and tiles promote a sense of freshness and ease. Organising toiletries, towels, and personal items in an orderly way creates a space that functions efficiently and feels restful rather than chaotic. Even small improvements — a clean mirror, a neatly arranged towel, a single plant or candle — can significantly shift the energy of a bathroom from heavy and congested to light and renewing.",
    ],
  },
  {
    key: "pooja-room",
    title: "Pooja Room",
    subtitle: "The pooja room is the spiritual centre of the home — a dedicated space where daily rituals connect the household to divine grace and inner peace.",
    sections: [],
    paragraphs: [
      "The pooja room, or sacred prayer space, is the most spiritually significant room in any Indian home. According to Vastu Shastra, this space should be located in a direction that naturally supports the upward movement of spiritual energy and the clarity of prayer. The room should be quiet, clean, and entirely free of clutter — this is a space that deserves the same care and intentionality as a temple. Even a small, well-maintained pooja corner can carry the energy of a much larger sacred space if it is kept with consistency and devotion.",
      "The placement of idols, sacred images, and ritual items within the pooja room should be thoughtful and respectful. Idols should be placed at a comfortable eye level when seated for prayer — neither too high that they feel distant and imposing, nor too low that the gesture of reverence feels awkward. Avoid crowding the space with too many items; a few well-chosen, meaningful objects create a more focused and powerful sacred atmosphere than many decorative pieces without intention. The ritual shelf or altar should be kept clean and renewed regularly.",
      "Lighting in the pooja room deserves special attention. A soft, warm lamp — whether electric or oil-based — should be available for morning and evening prayers, creating a consistent ritual of light that anchors the household's spiritual life. The scent of incense, flowers, or sacred camphor used in daily rituals purifies the air and creates a sensory signal to the mind that this is a space for stillness, gratitude, and connection. The pooja room, when maintained with care, becomes the energetic anchor of the entire home — the place whose positive vibration radiates outward into every other room.",
    ],
  },
  {
    key: "dining-room",
    title: "Dining Room",
    subtitle: "The dining space is where the family gathers to share nourishment — a moment of daily communion that sustains both body and bond.",
    sections: [],
    paragraphs: [
      "The dining room holds a unique and important position in the Vastu framework of the home. It is the space where the family comes together to share the most fundamental act of daily life — the taking of nourishment. This gathering point should be designed to feel warm, comfortable, and inclusive. The dining table should be proportionate to the room, leaving adequate space for easy movement around all sides, so that the act of sitting down together feels generous and unhurried rather than cramped and pressured.",
      "The shape and material of the dining table carry subtle energetic significance. A rectangular or square table with clean, simple lines provides stability and balance, reflecting the grounding nature of the meal shared upon it. Round tables, while warm and egalitarian in their design, should be proportioned carefully to the room. The seating should be sturdy and comfortable — chairs that feel welcoming invite people to linger, converse, and enjoy the experience of eating together, rather than rushing away the moment the food is finished.",
      "The colour palette and lighting of the dining room should stimulate appetite and warmth without being jarring or overly stimulating. Soft ambers, warm ochres, cream, and natural wood tones are ideal choices. A central light source above the table — whether a pendant lamp or a chandelier — creates a sense of gathering and focus. Avoid harsh overhead lighting that flattens the atmosphere. Keep the dining zone free of visual clutter and unrelated objects, so that the ritual of the meal remains clear, intentional, and pleasurable.",
    ],
  },
  {
    key: "staircase",
    title: "Staircase",
    subtitle: "The staircase connects the floors of a home — its design and direction influence how energy rises and circulates through the living space.",
    sections: [],
    paragraphs: [
      "The staircase is a dynamic element within the Vastu energy map of a home, as it physically mediates the movement of energy between floors. Its placement, direction of ascent, and design all influence how vitality circulates through the upper and lower levels of the building. A staircase that is well-lit, open, and structurally stable promotes a confident, steady upward movement of energy, reflecting ambition, growth, and positive momentum in the lives of the residents.",
      "The steps themselves should be an odd number when counted in totality, as this is considered auspicious in traditional Vastu practice. Each step should be of an even, comfortable height and depth — awkward proportions make movement hesitant and can translate energetically into a sense of unsteadiness in life's progress. The railings should be solid, secure, and well-maintained, providing both physical safety and a visual sense of support and stability as one moves through the vertical space of the home.",
      "The space beneath the staircase is often underutilised or cluttered, and this area deserves intentional planning. Blocked or heavily stuffed under-stair spaces create a sense of visual and energetic density that can feel oppressive. This area is best used for organised, purposeful storage — or, better still, left open with good lighting and perhaps a small decorative element that maintains the sense of spaciousness. Avoid placing the kitchen, pooja area, or sleeping space directly beneath the staircase, as the overhead movement can disturb the energetic quality of these sensitive rooms.",
    ],
  },
  {
    key: "parking",
    title: "Parking / Garage",
    subtitle: "The parking and garage area reflects the home's relationship with movement, vehicles, and the practical flow of daily life.",
    sections: [],
    paragraphs: [
      "The parking and garage area, while often treated as purely functional, has its own Vastu significance as the zone of the home associated with vehicles, movement, and the external journeys of the household's members. According to traditional principles, the garage or parking zone should be positioned in a direction that supports easy, safe, and confident movement — both in the physical sense of driving in and out, and in the broader symbolic sense of the household's engagement with the outside world.",
      "The layout of the parking area should prioritise spaciousness and clarity. Turning radii should be generous, allowing vehicles to enter and exit without awkward manoeuvring that creates daily frustration. Obstacles, sharp corners, and poorly lit areas near vehicle paths are hazardous in both a practical and an energetic sense. Good lighting is essential for night-time use, and the approach to the gate should feel intuitive and welcoming rather than complicated and guarded.",
      "The gate itself — its design, direction of opening, and material — carries symbolic weight as the secondary gateway of the property. It should be well-maintained, functional, and proportionate to the overall design of the boundary wall. A gate that sticks, creaks, or is difficult to operate creates a subconscious daily friction that can accumulate over time. The space between the gate and the garage should ideally allow some breathing room, so that arriving home feels like a smooth, comfortable transition rather than an abrupt stop.",
    ],
  },
  {
    key: "borewell",
    title: "Borewell & Water Tank",
    subtitle: "Water is the element of abundance and flow — its source and storage within the property should be planned with care and precision.",
    sections: [],
    paragraphs: [
      "Water is one of the five fundamental elements in Vastu Shastra, and its presence, movement, and storage within a property have a profound influence on the overall health, prosperity, and emotional tone of the household. The borewell or underground water source should ideally be located in the zones of the plot associated with the water element, allowing the natural energy of the site to support and sustain the water supply. A well-positioned water source is said to ensure a consistent, abundant flow of resources — both literal and metaphorical — into the lives of the residents.",
      "Underground water tanks should be planned so that they are accessible for cleaning and maintenance without requiring major disruption to the surrounding structure. The pipes and pumping systems that feed the water through the property should run logically and cleanly, without crossing over fire or electrical zones in a way that creates conflict between elements. Overhead tanks, which sit above the roofline, should be positioned to allow gravity-fed flow in a direction that is energetically harmonious with the rest of the site.",
      "Any leaks, blockages, or stagnation in the water system of a property require prompt attention, as they represent a disruption in the natural flow of abundance and clarity within the household's life. Clean, freely flowing water is one of the most powerful Vastu assets a property can have — it reflects movement, renewal, and the continuous provision of what is needed. Regular inspection and maintenance of all water systems, from the borewell to the overhead tank to the distribution pipes, is an act of care toward the home's energetic wellbeing as much as its physical function.",
    ],
  },
  {
    key: "septic-tank",
    title: "Septic Tank",
    subtitle: "The septic system manages what the home releases — its placement ensures that the energetic and physical cleansing of the space is complete.",
    sections: [],
    paragraphs: [
      "The septic tank and waste disposal system represent the home's capacity to release what is no longer needed — both physically and energetically. In Vastu Shastra, the location of the septic tank is important because improper placement can symbolically and practically bring the energy of waste and stagnation too close to the living, cooking, or sacred zones of the property. Careful placement, following the natural drainage slope of the site and keeping the unit at an appropriate distance from the main living areas, ensures that release happens cleanly and completely.",
      "Accessibility is one of the most practically important aspects of septic tank placement. A tank that cannot be serviced without major disruption to the surrounding landscape or structure becomes a long-term maintenance challenge that can translate into significant household stress. Ensuring that the access point is clear, well-marked, and reachable allows for regular inspection and cleaning, keeping the system functioning efficiently and preventing the kind of failures that create both physical and energetic disturbance in the home.",
      "Beyond placement, the quality of the construction and materials used in the septic system determines its longevity and reliability. Proper sealing prevents leakage into the surrounding soil, which protects both the environment and the water table. Correct drainage design ensures that solids and liquids are processed in the right balance. From a Vastu perspective, a well-designed, properly functioning septic system is a sign of a household that manages its resources responsibly, closes its cycles cleanly, and maintains its relationship with the land with care and respect.",
    ],
  },
  {
    key: "garden",
    title: "Garden & Trees",
    subtitle: "The garden is the living boundary of the home — its plants, trees, and water features breathe life and beauty into the entire property.",
    sections: [],
    paragraphs: [
      "The garden surrounding a home is far more than a decorative feature — it is the living energetic boundary of the property, a space where the built environment meets the natural world. According to Vastu principles, the trees, plants, and landscaping elements in the garden should be selected and positioned with an understanding of how they interact with the directions, the elements, and the daily patterns of light and shadow on the plot. Plants that are healthy, well-tended, and appropriately sized for their positions bring vitality and beauty to the home's exterior environment.",
      "Certain plants carry specific Vastu significance. The Tulsi plant, regarded as sacred in Hindu tradition, should be given a clean, respectful position — ideally in the open, with good sunlight and easy access for daily watering and worship. Its placement reflects the household's connection to spiritual practice and its acknowledgment of the divine in everyday life. Large trees, while valuable for shade and beauty, should not be positioned in a way that causes their roots to disrupt the foundation of the structure, or their canopy to block essential light from reaching the home's primary living spaces.",
      "Water features in the garden — fountains, small ponds, or decorative water elements — can be powerful enhancers of the property's Vastu energy when placed in harmony with the water zones of the site. Moving water is particularly auspicious, as it represents the continuous flow of abundance and renewal. However, stagnant water — a neglected pond, a clogged fountain, or a waterlogged patch of garden — creates the opposite effect, symbolising blocked energy and potential ill-health. The garden, tended with regularity and love, becomes a living reflection of the household's relationship with nature, beauty, and the cycles of growth and renewal.",
    ],
  },
  {
    key: "plot-shapes",
    title: "Plot Shapes",
    subtitle: "The shape of the plot determines the foundation of your home's energy — a well-proportioned plot supports balance and long-term wellbeing.",
    sections: [],
    paragraphs: [
      "The shape of the plot on which a home is built is the foundational element of Vastu analysis. Before any structure is designed, the geometric form of the land itself determines how energy accumulates, flows, and is retained within the property. Square and rectangular plots, with clean right-angled corners and proportionate dimensions, are considered the most auspicious forms in Vastu Shastra, as their regularity allows for a balanced and even distribution of the five elemental energies across the site. Such plots are easier to divide according to Vastu zones and support stable, predictable outcomes for the household.",
      "Irregular or oddly shaped plots — those with missing corners, protruding angles, or non-perpendicular boundaries — present energetic challenges that require careful design solutions. A plot with a missing north-east corner, for example, is said to reduce the flow of light and prosperity into the home. Plots with acute angles or arrow-like projections can create pockets of intense or unstable energy that affect specific areas of life. These challenges are not insurmountable — skilled planning, strategic placement of structures, and the use of Vastu remedies such as boundary plants, water elements, or specific room allocations can mitigate the impact of an irregular plot significantly.",
      "Before purchasing or building on a plot, a thorough assessment of its shape, orientation, surrounding environment, and slope is essential. The direction in which the plot faces, the proportion of its length to breadth, the slope of the land, and the position of any natural water bodies or roadways nearby all contribute to the overall Vastu quality of the site. A plot that may appear undesirable on paper can become a powerful, harmonious foundation for a home when its challenges are understood and addressed with knowledge and intention. The shape of the land is the beginning of the story — what is built upon it continues that story for generations.",
    ],
  },
  {
    key: "faq",
    title: "FAQ",
    subtitle: "Common questions about the Sri Vastu app, how it works, and how to get the most from your Vastu analysis.",
    sections: [],
    paragraphs: [
      "The Sri Vastu calculator generates a precise Vastu analysis based on the measurements you provide for your plot — its width, depth, and relevant Vastu calculations including nakshatram, direction, and Suddha Padham values. The application processes these inputs through established Vastu Shastra formulas to produce a structured report that can be downloaded as a formatted PDF. To ensure the accuracy of your report, all measurements should be entered consistently in the same unit system — feet, inches, and nullu — as specified in the input fields.",
      "The guide section of the app provides room-by-room Vastu guidance for the main areas of the home. These pages are intended to complement the calculator's numerical output with qualitative, practical insights about how each space in the home functions within the broader Vastu framework. The guidance provided is based on classical Vastu principles interpreted for modern living, and is most valuable when read in conjunction with a professional Vastu assessment of your specific property and life circumstances.",
      "For the most accurate results, we recommend filling all relevant fields before generating each table. The three tables in the calculator correspond to different aspects of the Vastu analysis — width and depth calculations, Suddha Padham analysis, and Padam mapping with star reference. Each table can be generated and downloaded independently, allowing you to focus on the specific aspect of the analysis most relevant to your current needs. If you encounter any issues with the calculator output or the PDF generation, please use the contact page to reach the development team directly.",
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
    title: "About Sri Vastu",
    subtitle: "A premium Vastu analysis application built to bring the wisdom of an ancient science into the clarity of modern design.",
    sections: [],
    paragraphs: [
      "Sri Vastu is a professional-grade Vastu Shastra analysis application, designed to serve Vastu practitioners and their clients with precision, elegance, and ease. The application provides a structured calculation engine based on established Vastu formulas, a comprehensive room-by-room guidance library, and a formatted PDF report system that presents results in a professional, shareable format. Our goal is to honour the depth and integrity of Vastu Shastra as a living science while making its insights accessible and practical for modern households.",
      "The application has been built with a deep respect for the tradition it represents. Every aspect of the design — from the colour palette and typography to the structure of the calculator and the tone of the guidance content — has been chosen to reflect the seriousness and beauty of Vastu as a discipline. We believe that a tool built for an ancient science should itself carry a sense of quality, care, and reverence — not just functional efficiency, but aesthetic and spiritual alignment with the values it serves.",
      "Sri Vastu is an evolving product. As the formulas, guidelines, and PDF templates are refined and updated, those improvements will be reflected in future versions of the application. We are committed to keeping the calculation engine accurate and current, the guidance content relevant and thoughtful, and the overall user experience as seamless and dignified as the science it represents. We thank all practitioners and users who have placed their trust in this application and invite your continued feedback as we grow and improve together.",
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
];

export const drawerItems = [
  { label: "Home", key: "home" },
  ...guidePages.map((page) => ({ label: page.title, key: page.key })),
];
