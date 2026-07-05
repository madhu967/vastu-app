import { AppLanguage } from "@/context/AppLanguageContext";
import { GuidePage, OptionItem } from "@/types/vastu";
import { directionOptions, nakshatramOptions, varguOptions } from "@/constants/content";

type HomeStrings = {
  title: string;
  subtitle: string;
  languageLabel: string;
  languagePlaceholder: string;
  introTitle: string;
  introSubtitle: string;
  ownerInfoTitle: string;
  ownerInfoSubtitle: string;
  ownerNameLabel: string;
  ownerNamePlaceholder: string;
  varguLabel: string;
  varguPlaceholder: string;
  wifeInfoTitle: string;
  wifeInfoSubtitle: string;
  wifeNameLabel: string;
  wifeNamePlaceholder: string;
  wifeNakshatramLabel: string;
  wifeNakshatramPlaceholder: string;
  wifeVarguLabel: string;
  wifeVarguPlaceholder: string;
  propertyTitle: string;
  propertySubtitle: string;
  nakshatramLabel: string;
  nakshatramPlaceholder: string;
  directionLabel: string;
  directionPlaceholder: string;
  plotLengthTitle: string;
  plotLengthSubtitle: string;
  lengthFeetLabel: string;
  lengthInchLabel: string;
  lengthNulluLabel: string;
  plotWidthTitle: string;
  plotWidthSubtitle: string;
  widthFeetLabel: string;
  widthInchLabel: string;
  widthNulluLabel: string;
  suddhaTitle: string;
  suddhaSubtitle: string;
  suddhaPadhamLabel: string;
  suddhaPadhamPlaceholder: string;
  feetLabel: string;
  inchLabel: string;
  nulluLabel: string;
  padamTitle: string;
  padamSubtitle: string;
  firstSuddhaPadhamLabel: string;
  secondSuddhaPadhamLabel: string;
  calculate: string;
  results: string;
  downloadPdf: string;
};

type AppStrings = {
  homeRoute: string;
  home: HomeStrings;
  directions: OptionItem[];
  nakshatrams: OptionItem[];
  vargus: OptionItem[];
};

const englishStrings: AppStrings = {
  homeRoute: "Home",
  home: {
    title: "Viswakarma Vastu Sarvaswam",
    subtitle: "Premium Vastu Analysis",
    languageLabel: "Language",
    languagePlaceholder: "Choose language",
    introTitle: "Viswakarma Vastu Sarvaswam",
    introSubtitle: "Fill the inputs below to generate the full report and PDF.",
    ownerInfoTitle: "Owner Information (Yajamani)",
    ownerInfoSubtitle: "Language and owner name",
    ownerNameLabel: "Yajamani Name (English only)",
    ownerNamePlaceholder: "Enter owner name",
    varguLabel: "Vargu",
    varguPlaceholder: "Select Vargu",
    wifeInfoTitle: "Owner Wife Information (Yajamaniralu)",
    wifeInfoSubtitle: "Wife's details",
    wifeNameLabel: "Yajamaniralu Name (English only)",
    wifeNamePlaceholder: "Enter wife name",
    wifeNakshatramLabel: "Nakshatram",
    wifeNakshatramPlaceholder: "Select nakshatram",
    wifeVarguLabel: "Vargu",
    wifeVarguPlaceholder: "Select Vargu",
    propertyTitle: "Direction Details",
    propertySubtitle: "Direction property is facing",
    nakshatramLabel: "Nakshatram",
    nakshatramPlaceholder: "Select nakshatram",
    directionLabel: "Direction",
    directionPlaceholder: "Select direction",
    plotLengthTitle: "Plot Length",
    plotLengthSubtitle: "Enter the complete length in feet, inch, and nullu",
    plotWidthTitle: "Plot Width",
    plotWidthSubtitle: "Enter the complete width in feet, inch, and nullu",
    lengthFeetLabel: "Length (Feet)",
    lengthInchLabel: "Length (Inch)",
    lengthNulluLabel: "Length (Nullu)",
    widthFeetLabel: "Width (Feet)",
    widthInchLabel: "Width (Inch)",
    widthNulluLabel: "Width (Nullu)",
    suddhaTitle: "Suddha Padham",
    suddhaSubtitle: "Optional section shown when you want Table 3",
    padamTitle: "Padam With Star",
    padamSubtitle: "Use when Table 3 needs a star mapping",
    suddhaPadhamLabel: "Suddha Padham",
    suddhaPadhamPlaceholder: "Optional",
    feetLabel: "Feet",
    inchLabel: "Inch",
    nulluLabel: "Nullu",
    firstSuddhaPadhamLabel: "1st Suddha Padham",
    secondSuddhaPadhamLabel: "2nd Suddha Padham",
    calculate: "Calculate",
    results: "Results",
    downloadPdf: "Download PDF Report",
  },
  directions: directionOptions,
  nakshatrams: nakshatramOptions,
  vargus: varguOptions,
};

const teluguStrings: AppStrings = {
  homeRoute: "హోమ్",
  home: {
    title: "విశ్వకర్మ వాస్తు సర్వస్వం",
    subtitle: "ప్రీమియం వాస్తు విశ్లేషణ",
    languageLabel: "భాష",
    languagePlaceholder: "భాషను ఎంచుకోండి",
    introTitle: "విశ్వకర్మ వాస్తు సర్వస్వం",
    introSubtitle: "పూర్తి రిపోర్ట్ మరియు PDF కోసం దిగువ వివరాలు నమోదు చేయండి.",
    ownerInfoTitle: "యజమాని సమాచారం",
    ownerInfoSubtitle: "భాష మరియు యజమాని పేరు",
    ownerNameLabel: "యజమాని పేరు (ఇంగ్లీష్ మాత్రమే)",
    ownerNamePlaceholder: "యజమాని పేరును నమోదు చేయండి",
    varguLabel: "వర్గు",
    varguPlaceholder: "వర్గును ఎంచుకోండి",
    wifeInfoTitle: "యజమానురాలు సమాచారం",
    wifeInfoSubtitle: "యజమానురాలు వివరాలు",
    wifeNameLabel: "యజమానురాలు పేరు (ఇంగ్లీష్ మాత్రమే)",
    wifeNamePlaceholder: "యజమానురాలు పేరును నమోదు చేయండి",
    wifeNakshatramLabel: "నక్షత్రం",
    wifeNakshatramPlaceholder: "నక్షత్రాన్ని ఎంచుకోండి",
    wifeVarguLabel: "వర్గు",
    wifeVarguPlaceholder: "వర్గును ఎంచుకోండి",
    propertyTitle: "దిశ వివరాలు",
    propertySubtitle: "ఇంటి దిశ",
    nakshatramLabel: "నక్షత్రం",
    nakshatramPlaceholder: "నక్షత్రాన్ని ఎంచుకోండి",
    directionLabel: "దిశ",
    directionPlaceholder: "దిశను ఎంచుకోండి",
    plotLengthTitle: "ప్లాట్ పొడవు",
    plotLengthSubtitle: "అడుగులు, ఇంచ్, మరియు నులు లో పూర్తి పొడవు నమోదు చేయండి",
    plotWidthTitle: "ప్లాట్ వెడల్పు",
    plotWidthSubtitle: "అడుగులు, ఇంచ్, మరియు నులు లో పూర్తి వెడల్పు నమోదు చేయండి",
    lengthFeetLabel: "పొడవు (అడుగులు)",
    lengthInchLabel: "పొడవు (ఇంచ్)",
    lengthNulluLabel: "పొడవు (నులు)",
    widthFeetLabel: "వెడల్పు (అడుగులు)",
    widthInchLabel: "వెడల్పు (ఇంచ్)",
    widthNulluLabel: "వెడల్పు (నులు)",
    suddhaTitle: "శుద్ధ పాదం",
    suddhaSubtitle: "టేబుల్ 3 అవసరమైనప్పుడు చూపించే ఐచ్ఛిక విభాగం",
    padamTitle: "నక్షత్రంతో పాదం",
    padamSubtitle: "టేబుల్ 3 కి స్టార్ మ్యాపింగ్ అవసరమైనప్పుడు ఉపయోగించండి",
    suddhaPadhamLabel: "శుద్ధ పాదం",
    suddhaPadhamPlaceholder: "ఐచ్ఛికం",
    feetLabel: "అడుగులు",
    inchLabel: "ఇంచ్",
    nulluLabel: "నులు",
    firstSuddhaPadhamLabel: "1వ శుద్ధ పాదం",
    secondSuddhaPadhamLabel: "2వ శుద్ధ పాదం",
    calculate: "లెక్కించండి",
    results: "ఫలితాలు",
    downloadPdf: "PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి",
  },
  directions: [
    "ఉత్తరం", "ఈశాన్యం", "తూర్పు", "ఆగ్నేయం", "దక్షిణం", "నైరుతి", "పడమర", "వాయువ్యం"
  ].map(d => ({ label: d, value: d })),
  nakshatrams: [
    "అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆరుద్ర",
    "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వ ఫల్గుణి",
    "ఉత్తర ఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ",
    "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం",
    "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"
  ].map(n => ({ label: n, value: n })),
  vargus: [
    { label: "1 (అ, ఆ, ఇ, ఈ...)", value: "1" },
    { label: "2 (క, ఖ, గ, ఘ...)", value: "2" },
    { label: "3 (చ, ఛ, జ, ఝ...)", value: "3" },
    { label: "4 (ట, ఠ, డ, ఢ...)", value: "4" },
    { label: "5 (త, థ, ద, ధ...)", value: "5" },
    { label: "6 (ప, ఫ, బ, భ...)", value: "6" },
    { label: "7 (య, ర, ల, వ...)", value: "7" },
    { label: "8 (శ, ష, స, హ...)", value: "8" },
  ],
};

const hindiStrings: AppStrings = {
  homeRoute: "होम",
  home: {
    title: "विश्वकर्मा वास्तु सर्वस्वम",
    subtitle: "प्रीमियम वास्तु विश्लेषण",
    languageLabel: "भाषा",
    languagePlaceholder: "भाषा चुनें",
    introTitle: "विश्वकर्मा वास्तु सर्वस्वम",
    introSubtitle: "पूरा रिपोर्ट और PDF बनाने के लिए नीचे विवरण भरें।",
    ownerInfoTitle: "मालिक की जानकारी (यजमानी)",
    ownerInfoSubtitle: "भाषा और मालिक का नाम",
    ownerNameLabel: "मालिक का नाम (केवल अंग्रेज़ी)",
    ownerNamePlaceholder: "मालिक का नाम दर्ज करें",
    varguLabel: "वर्ग",
    varguPlaceholder: "वर्ग चुनें",
    wifeInfoTitle: "पत्नी की जानकारी (यजमानिरालु)",
    wifeInfoSubtitle: "पत्नी का विवरण",
    wifeNameLabel: "पत्नी का नाम (केवल अंग्रेज़ी)",
    wifeNamePlaceholder: "पत्नी का नाम दर्ज करें",
    wifeNakshatramLabel: "नक्षत्र",
    wifeNakshatramPlaceholder: "नक्षत्र चुनें",
    wifeVarguLabel: "वर्ग",
    wifeVarguPlaceholder: "वर्ग चुनें",
    propertyTitle: "दिशा विवरण",
    propertySubtitle: "घर की दिशा",
    nakshatramLabel: "नक्षत्र",
    nakshatramPlaceholder: "नक्षत्र चुनें",
    directionLabel: "दिशा",
    directionPlaceholder: "दिशा चुनें",
    plotLengthTitle: "प्लॉट लंबाई",
    plotLengthSubtitle: "फीट, इंच, और नुल्लु में पूरी लंबाई दर्ज करें",
    plotWidthTitle: "प्लॉट चौड़ाई",
    plotWidthSubtitle: "फीट, इंच, और नुल्लु में पूरी चौड़ाई दर्ज करें",
    lengthFeetLabel: "लंबाई (फीट)",
    lengthInchLabel: "लंबाई (इंच)",
    lengthNulluLabel: "लंबाई (नुल्लु)",
    widthFeetLabel: "चौड़ाई (फीट)",
    widthInchLabel: "चौड़ाई (इंच)",
    widthNulluLabel: "चौड़ाई (नुल्लु)",
    suddhaTitle: "शुद्ध पादम",
    suddhaSubtitle: "टेबल 3 के लिए दिखाई देने वाला वैकल्पिक भाग",
    padamTitle: "स्टार के साथ पादम",
    padamSubtitle: "जब टेबल 3 को स्टार मैपिंग की जरूरत हो तब उपयोग करें",
    suddhaPadhamLabel: "शुद्ध पादम",
    suddhaPadhamPlaceholder: "वैकल्पिक",
    feetLabel: "फीट",
    inchLabel: "इंच",
    nulluLabel: "नुल्लु",
    firstSuddhaPadhamLabel: "1वां शुद्ध पादम",
    secondSuddhaPadhamLabel: "2वां शुद्ध पादम",
    calculate: "गणना करें",
    results: "परिणाम",
    downloadPdf: "PDF रिपोर्ट डाउनलोड करें",
  },
  directions: [
    "उत्तर", "ईशान", "पूर्व", "आग्नेय", "दक्षिण", "नैऋत्य", "पश्चिम", "वायव्य"
  ].map(d => ({ label: d, value: d })),
  nakshatrams: [
    "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशीर्षा", "आर्द्रा",
    "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वा फाल्गुनी",
    "उत्तरा फाल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा",
    "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण",
    "धनिष्ठा", "शतभिषा", "पूर्वा भाद्रपद", "उत्तरा भाद्रपद", "रेवती"
  ].map(n => ({ label: n, value: n })),
  vargus: [
    { label: "1 (अ, आ, इ, ई...)", value: "1" },
    { label: "2 (क, ख, ग, घ...)", value: "2" },
    { label: "3 (च, छ, ज, झ...)", value: "3" },
    { label: "4 (ट, ठ, ड, ढ...)", value: "4" },
    { label: "5 (त, थ, द, ध...)", value: "5" },
    { label: "6 (प, फ, ब, भ...)", value: "6" },
    { label: "7 (य, र, ल, व...)", value: "7" },
    { label: "8 (श, ष, स, ह...)", value: "8" },
  ],
};

const guideTranslations: Record<
  AppLanguage,
  Record<
    string,
    { title: string; subtitle: string; paragraphs: string[] }
  >
> = {
  English: {},
  Telugu: {
    "main-entrance": {
      title: "ముఖ్య ద్వారం",
      subtitle:
        "ఉత్తమ ద్వార దిశలు, చేయాల్సినవి మరియు చేయకూడనివి, శుభ్రమైన మొదటి భావన.",
      paragraphs: [
        "గృహ ప్రవేశ ద్వారం ఇంటికి ముఖం లాంటిది — ఇది ఇల్లు అంతటా ప్రవహించే శక్తికి ప్రధాన ద్వారం. వాస్తు శాస్త్రం ప్రకారం ప్రవేశ ద్వారం స్థానం మరియు అమరిక ఇంటి అదృష్టాన్ని నిర్ణయిస్తుంది.",
        "ప్రవేశ ప్రాంతాన్ని ఎల్లప్పుడూ శుభ్రంగా, ప్రకాశవంతంగా ఉంచాలి. గుమ్మం దగ్గర వెచ్చని లైటింగ్ ఆహ్వానించే వాతావరణాన్ని సృష్టిస్తుంది. చెత్త, విరిగిన వస్తువులు లేదా చీకటి అలంకరణలు ప్రవేశ ద్వారం వద్ద ఉంచకూడదు, ఇవి సానుకూల శక్తి ప్రవాహాన్ని అడ్డుకుంటాయి.",
        "తలుపు ఎలాంటి శబ్దం లేకుండా సులభంగా తెరుచుకోవాలి. తలుపు శబ్దం చేయడం లేదా బిగుతుగా ఉండటం ఇంట్లో పురోగతికి ఆటంకం కలిగిస్తుందని నమ్ముతారు. ప్రధాన ద్వారం కలపతో, అందమైన అలంకరణలతో ఉండటం శుభప్రదం."
      ],
    },
    "living-room": {
      title: "లివింగ్ రూమ్",
      subtitle:
        "లివింగ్ రూమ్ ఇంటికి గుండె లాంటిది — ఇక్కడే కుటుంబ సభ్యులు కలుసుకుంటారు మరియు అతిథులను ఆదరిస్తారు.",
      paragraphs: [
        "లివింగ్ రూమ్ ఇంట్లో ప్రధాన శక్తి కేంద్రం. వాస్తు ప్రకారం, ఈ ప్రదేశం విశాలంగా, ప్రశాంతంగా ఉండాలి. కుటుంబ సభ్యులు సులభంగా మాట్లాడుకునేలా ఫర్నిచర్ అమర్చాలి, మధ్యలో అడ్డంకులు ఉండకూడదు.",
        "గదిలోకి సహజ కాంతి మరియు గాలి ధారాళంగా రావాలి. గోడలకు లేత రంగులు — క్రీమ్, లేత పసుపు లేదా తెలుపు రంగులు వాడటం వల్ల గదిలో ప్రశాంత వాతావరణం నెలకొంటుంది. ఎక్కువ డార్క్ రంగులు లేదా భారీ డిజైన్లు వాడకూడదు.",
        "టీవీ మరియు ఇతర ఎలక్ట్రానిక్ వస్తువులను స్థిరమైన గోడ వద్ద ఉంచాలి. గదిలో వస్తువులను అతిగా నింపకుండా, కదలికలకు తగినంత స్థలం ఉంచడం వల్ల శక్తి స్వేచ్ఛగా ప్రవహిస్తుంది. ఇండోర్ మొక్కలు లేదా ఒక అందమైన పెయింటింగ్ గదికి మరింత సానుకూలతను ఇస్తాయి."
      ],
    },
  },
  Hindi: {
    "main-entrance": {
      title: "मुख्य प्रवेश",
      subtitle: "उत्तम प्रवेश दिशा, करने योग्य बातें, और साफ पहला प्रभाव।",
      paragraphs: [
        "मुख्य द्वार घर का चेहरा है — यह पूरे घर में प्रवाहित होने वाली ऊर्जा का प्रवेश द्वार है। वास्तु शास्त्र में मुख्य द्वार का स्थान और रखरखाव बहुत महत्व रखता है।",
        "प्रवेश क्षेत्र को हमेशा साफ, खुला और अच्छी रोशनी वाला रखना चाहिए। द्वार के पास गर्म रोशनी एक स्वागत करने वाला माहौल बनाती है। प्रवेश द्वार के पास टूटी हुई चीजें या भारी सजावट रखने से बचें, क्योंकि ये ऊर्जा के प्रवाह को रोकते हैं।",
        "दरवाजा आसानी से और बिना किसी आवाज के खुलना चाहिए। दरवाजे से आवाज आना घर की प्रगति में रुकावट का प्रतीक माना जाता है। मुख्य द्वार लकड़ी का और सादे या शुभ डिजाइन वाला होना चाहिए।"
      ],
    },
    "living-room": {
      title: "लिविंग रूम",
      subtitle:
        "लिविंग रूम घर का दिल है — जहां परिवार के रिश्ते मजबूत होते हैं और मेहमानों का स्वागत होता है।",
      paragraphs: [
        "लिविंग रूम घर का मुख्य ऊर्जा केंद्र है। वास्तु के अनुसार, इसे इस तरह से डिजाइन किया जाना चाहिए कि बैठने की व्यवस्था के बीच बातचीत आसानी से हो सके और चलने-फिरने के लिए पर्याप्त जगह हो।",
        "कमरे में प्राकृतिक रोशनी का आना बहुत फायदेमंद होता है। दीवारों के लिए हल्के और शांत रंगों का उपयोग करें, जैसे कि क्रीम या हल्का पीला। बहुत गहरे रंगों या भारी डिजाइन से बचना चाहिए।",
        "टीवी और अन्य मीडिया उपकरणों को एक स्थिर दीवार पर रखना चाहिए। कमरे में बहुत अधिक सजावटी सामान न भरें। एक शांत पेंटिंग या एक छोटा पौधा कमरे के वातावरण को संतुलित और सुखद बनाता है।"
      ],
    },
  },
};

export const getAppStrings = (language: AppLanguage): AppStrings => {
  if (language === "Telugu") {
    return teluguStrings;
  }

  if (language === "Hindi") {
    return hindiStrings;
  }

  return englishStrings;
};

export const getLocalizedGuidePages = (
  language: AppLanguage,
  basePages: GuidePage[],
): GuidePage[] => {
  if (language === "English") {
    return basePages;
  }

  const localizedPages = guideTranslations[language];

  return basePages.map((page) => {
    const localized = localizedPages[page.key];

    if (!localized) {
      return page;
    }

    return {
      ...page,
      title: localized.title,
      subtitle: localized.subtitle,
      paragraphs: localized.paragraphs || page.paragraphs,
    };
  });
};
