import { AppLanguage } from "@/context/AppLanguageContext";
import { GuidePage } from "@/types/vastu";

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
};

const guideTranslations: Record<
  AppLanguage,
  Record<
    string,
    { title: string; subtitle: string; sections: GuidePage["sections"] }
  >
> = {
  English: {},
  Telugu: {
    "main-entrance": {
      title: "ముఖ్య ద్వారం",
      subtitle:
        "ఉత్తమ ద్వార దిశలు, చేయాల్సినవి మరియు చేయకూడనివి, శుభ్రమైన మొదటి భావన.",
      sections: [
        {
          title: "అనుకూల దిశలు",
          points: [
            "ప్రవేశం శుభ్రంగా, తెరిచి, వెలుతురు బాగా ఉండాలి.",
            "ప్రవేశ భాగం సమతుల్యంగా, గజిబిజిగా లేకుండా ఉంచండి.",
          ],
        },
        {
          title: "చేయాల్సినవి",
          points: [
            "వెచ్చని లైటింగ్ మరియు ఆహ్వానించే రంగులు వాడండి.",
            "ద్వారం సులభంగా తెరుచుకునేలా, శుభ్రంగా ఉంచండి.",
          ],
        },
        {
          title: "చేయకూడనివి",
          points: [
            "ద్వారం ముందు అడ్డంకులు, చీకటి మూలలు ఉండకూడదు.",
            "ప్రవేశం దగ్గర ఆగ్రెసివ్ అలంకరణ వద్దు.",
          ],
        },
      ],
    },
    "living-room": {
      title: "లివింగ్ రూమ్",
      subtitle:
        "సీటింగ్ ప్రవాహం, టీవీ స్థానం, రంగులు, కిటికీలు, మరియు సాఫ్ట్ డెకర్ సమతుల్యం.",
      sections: [
        {
          title: "సీటింగ్",
          points: [
            "మాట్లాడటానికి అనుకూలంగా, తెరిచినట్లుగా సీటింగ్ అమర్చండి.",
            "నడిచే మార్గాలు సాఫీగా, ఖాళీగా ఉంచండి.",
          ],
        },
        {
          title: "టీవీ మరియు అలంకరణ",
          points: [
            "మీడియా యూనిట్‌ను ప్రశాంతమైన, స్థిరమైన గోడపై ఉంచండి.",
            "గది గిరగిర కాకుండా తేలికగా కనిపించే అలంకరణ వాడండి.",
          ],
        },
        {
          title: "లైటింగ్",
          points: [
            "సహజ మరియు వెచ్చని కృత్రిమ వెలుతురును కలపండి.",
            "గదిలో గట్టిగా ఉన్న కాంట్రాస్ట్‌ను తగ్గించండి.",
          ],
        },
      ],
    },
  },
  Hindi: {
    "main-entrance": {
      title: "मुख्य प्रवेश",
      subtitle: "उत्तम प्रवेश दिशा, करने योग्य बातें, और साफ पहला प्रभाव।",
      sections: [
        {
          title: "अनुकूल दिशा",
          points: [
            "प्रवेश साफ, खुला, और अच्छी रोशनी वाला रखें।",
            "प्रवेश क्षेत्र संतुलित और अव्यवस्थित न हो।",
          ],
        },
        {
          title: "करने योग्य बातें",
          points: [
            "गर्म रोशनी और आमंत्रित करने वाले रंगों का उपयोग करें।",
            "दरवाज़ा आसान और साफ़ तरीके से खुलना चाहिए।",
          ],
        },
        {
          title: "न करने योग्य बातें",
          points: [
            "प्रवेश पर रुकावट और अंधेरे कोने न रखें।",
            "द्वार के पास भारी या आक्रामक सजावट से बचें।",
          ],
        },
      ],
    },
    "living-room": {
      title: "लिविंग रूम",
      subtitle:
        "बैठने का प्रवाह, टीवी की जगह, रंग, खिड़कियां और हल्का सजावटी संतुलन।",
      sections: [
        {
          title: "बैठने की व्यवस्था",
          points: [
            "बातचीत और खुलापन बढ़ाने के लिए सीटिंग व्यवस्थित करें।",
            "आवागमन के रास्ते साफ़ और आसान रखें।",
          ],
        },
        {
          title: "टीवी और सजावट",
          points: [
            "मीडिया यूनिट को शांत और स्थिर दीवार पर रखें।",
            "ऐसी सजावट चुनें जो हल्की और खुली लगे।",
          ],
        },
        {
          title: "रोशनी",
          points: [
            "प्राकृतिक और गर्म कृत्रिम रोशनी का मिश्रण रखें।",
            "कमरे में तीखा कंट्रास्ट कम रखें।",
          ],
        },
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
      sections: localized.sections,
    };
  });
};
