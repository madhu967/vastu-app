import { AppLanguage } from "@/context/AppLanguageContext";
import { GuidePage, OptionItem } from "@/types/vastu";
import { directionOptions, nakshatramOptions } from "@/constants/content";

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
  propertyTitle: string;
  propertySubtitle: string;
  nakshatramLabel: string;
  nakshatramPlaceholder: string;
  directionLabel: string;
  directionPlaceholder: string;
  plotWidthTitle: string;
  plotWidthSubtitle: string;
  widthFeetLabel: string;
  widthInchLabel: string;
  widthNulluLabel: string;
  plotDepthTitle: string;
  plotDepthSubtitle: string;
  depthFeetLabel: string;
  depthInchLabel: string;
  depthNulluLabel: string;
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
};

const englishStrings: AppStrings = {
  homeRoute: "Home",
  home: {
    title: "Vastu Analysis",
    subtitle: "Only the calculator and report flow",
    languageLabel: "Language",
    languagePlaceholder: "Choose language",
    introTitle: "Vastu Analysis",
    introSubtitle: "Fill the inputs below to generate the full report and PDF.",
    ownerInfoTitle: "Owner Information",
    ownerInfoSubtitle: "Language and owner name",
    propertyTitle: "Property Details",
    propertySubtitle: "Nakshatram and direction",
    plotWidthTitle: "Plot Width",
    plotWidthSubtitle: "Enter the complete width in feet, inch, and nullu",
    plotDepthTitle: "Plot Depth",
    plotDepthSubtitle: "Enter the complete depth in feet, inch, and nullu",
    suddhaTitle: "Suddha Padham",
    suddhaSubtitle: "Optional section shown when you want Table 3",
    padamTitle: "Padam With Star",
    padamSubtitle: "Use when Table 3 needs a star mapping",
    ownerNameLabel: "Owner Name (English only)",
    ownerNamePlaceholder: "Enter owner name",
    nakshatramLabel: "Nakshatram",
    nakshatramPlaceholder: "Select nakshatram",
    directionLabel: "Direction",
    directionPlaceholder: "Select direction",
    widthFeetLabel: "Width (Feet)",
    widthInchLabel: "Width (Inch)",
    widthNulluLabel: "Width (Nullu)",
    depthFeetLabel: "Depth (Feet)",
    depthInchLabel: "Depth (Inch)",
    depthNulluLabel: "Depth (Nullu)",
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
};

const teluguStrings: AppStrings = {
  homeRoute: "హోమ్",
  home: {
    title: "వాస్తు విశ్లేషణ",
    subtitle: "క్యాలిక్యులేటర్ మరియు రిపోర్ట్ మాత్రమే",
    languageLabel: "భాష",
    languagePlaceholder: "భాషను ఎంచుకోండి",
    introTitle: "వాస్తు విశ్లేషణ",
    introSubtitle: "పూర్తి రిపోర్ట్ మరియు PDF కోసం దిగువ వివరాలు నమోదు చేయండి.",
    ownerInfoTitle: "యజమాని సమాచారం",
    ownerInfoSubtitle: "భాష మరియు యజమాని పేరు",
    propertyTitle: "ఆస్తి వివరాలు",
    propertySubtitle: "నక్షత్రం మరియు దిశ",
    plotWidthTitle: "ప్లాట్ వెడల్పు",
    plotWidthSubtitle:
      "అడుగులు, ఇంచ్, మరియు నులు లో పూర్తి వెడల్పు నమోదు చేయండి",
    plotDepthTitle: "ప్లాట్ లోతు",
    plotDepthSubtitle: "అడుగులు, ఇంచ్, మరియు నులు లో పూర్తి లోతు నమోదు చేయండి",
    suddhaTitle: "శుద్ధ పాదం",
    suddhaSubtitle: "టేబుల్ 3 అవసరమైనప్పుడు చూపించే ఐచ్ఛిక విభాగం",
    padamTitle: "నక్షత్రంతో పాదం",
    padamSubtitle: "టేబుల్ 3 కి స్టార్ మ్యాపింగ్ అవసరమైనప్పుడు ఉపయోగించండి",
    ownerNameLabel: "యజమాని పేరు (ఇంగ్లీష్ మాత్రమే)",
    ownerNamePlaceholder: "యజమాని పేరును నమోదు చేయండి",
    nakshatramLabel: "నక్షత్రం",
    nakshatramPlaceholder: "నక్షత్రాన్ని ఎంచుకోండి",
    directionLabel: "దిశ",
    directionPlaceholder: "దిశను ఎంచుకోండి",
    widthFeetLabel: "వెడల్పు (అడుగులు)",
    widthInchLabel: "వెడల్పు (ఇంచ్)",
    widthNulluLabel: "వెడల్పు (నులు)",
    depthFeetLabel: "లోతు (అడుగులు)",
    depthInchLabel: "లోతు (ఇంచ్)",
    depthNulluLabel: "లోతు (నులు)",
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
};

const hindiStrings: AppStrings = {
  homeRoute: "होम",
  home: {
    title: "वास्तु विश्लेषण",
    subtitle: "केवल कैलकुलेटर और रिपोर्ट प्रवाह",
    languageLabel: "भाषा",
    languagePlaceholder: "भाषा चुनें",
    introTitle: "वास्तु विश्लेषण",
    introSubtitle: "पूरा रिपोर्ट और PDF बनाने के लिए नीचे विवरण भरें।",
    ownerInfoTitle: "मालिक की जानकारी",
    ownerInfoSubtitle: "भाषा और मालिक का नाम",
    propertyTitle: "संपत्ति विवरण",
    propertySubtitle: "नक्षत्र और दिशा",
    plotWidthTitle: "प्लॉट चौड़ाई",
    plotWidthSubtitle: "फीट, इंच, और नुल्लु में पूरी चौड़ाई दर्ज करें",
    plotDepthTitle: "प्लॉट गहराई",
    plotDepthSubtitle: "फीट, इंच, और नुल्लु में पूरी गहराई दर्ज करें",
    suddhaTitle: "शुद्ध पादम",
    suddhaSubtitle: "टेबल 3 के लिए दिखाई देने वाला वैकल्पिक भाग",
    padamTitle: "स्टार के साथ पादम",
    padamSubtitle: "जब टेबल 3 को स्टार मैपिंग की जरूरत हो तब उपयोग करें",
    ownerNameLabel: "मालिक का नाम (केवल अंग्रेज़ी)",
    ownerNamePlaceholder: "मालिक का नाम दर्ज करें",
    nakshatramLabel: "नक्षत्र",
    nakshatramPlaceholder: "नक्षत्र चुनें",
    directionLabel: "दिशा",
    directionPlaceholder: "दिशा चुनें",
    widthFeetLabel: "चौड़ाई (फीट)",
    widthInchLabel: "चौड़ाई (इंच)",
    widthNulluLabel: "चौड़ाई (नुल्लु)",
    depthFeetLabel: "गहराई (फीट)",
    depthInchLabel: "गहराई (इंच)",
    depthNulluLabel: "गहराई (नुल्लु)",
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
