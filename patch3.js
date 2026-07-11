const fs = require('fs');
let content = fs.readFileSync('src/pdf/generateVastuPdf.ts', 'utf8');

const replacement = `
  const getPhalaData = (label: string, roundedStr: string, dhanamStr: string, runamStr: string, lang: string): string[] => {
    const val = parseInt(roundedStr, 10);
    const dhanam = parseInt(dhanamStr, 10);
    const runam = parseInt(runamStr, 10);

    if (isNaN(val)) return ["—"];

    const isEN = lang === "English";
    const isHI = lang === "Hindi";

    const T_SHUBHAM = isEN ? "Auspicious" : isHI ? "शुभ" : "శుభం";
    const T_ASHUBHAM = isEN ? "Inauspicious" : isHI ? "अशुभ" : "అశుభం";
    const T_MADHYAMAM = isEN ? "Average" : isHI ? "मध्यम" : "మధ్యమం";
    const T_AGNI = isEN ? "Fire Hazard" : isHI ? "अग्निभय" : "అగ్నిభయం";
    const T_RAJA = isEN ? "Govt Trouble" : isHI ? "राजभय" : "రాజభయం";
    const T_ROGA = isEN ? "Ill Health" : isHI ? "रोग" : "అనారోగ్యం";
    const T_DEHA = isEN ? "Physical Pain" : isHI ? "देहपीड़ा" : "దేహపీడ";
    const T_NASHTA = isEN ? "Loss" : isHI ? "हानि" : "నష్టం";
    const T_CHORA = isEN ? "Theft Hazard" : isHI ? "चोरभय" : "చోరభయం";
    const T_YEARS = isEN ? "Years" : isHI ? "वर्ष" : "సంవత్సరాలు";

    const getTithiPrefix = (v: number) => {
      const p = v <= 15 ? (isEN ? "Su." : isHI ? "शु." : "శు.") : (isEN ? "Ba." : isHI ? "ब." : "బ.");
      return p;
    };

    switch (label) {
      case "Dhanamu":
        return dhanam > runam ? [T_SHUBHAM] : [T_ASHUBHAM];
      case "Runamu":
        return runam < dhanam ? [T_SHUBHAM] : [T_ASHUBHAM];
      case "Tithi": {
        const enTithi = ["Padyami", "Vidiya", "Tadiya", "Chaviti", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Padyami", "Vidiya", "Tadiya", "Chaviti", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"];
        const hiTithi = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"];
        const teTithi = ["పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "పౌర్ణమి", "పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "అమావాస్య"];
        
        const outTithi = isEN ? enTithi : isHI ? hiTithi : teTithi;
        const outStatus = [
          T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM,
          T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_ASHUBHAM
        ];
        
        if (val < 1 || val > 30) return ["—"];
        return [\`\${getTithiPrefix(val)} \${outTithi[val - 1]}\`, outStatus[val - 1]];
      }
      case "Vaaramu": {
        const enVar = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const hiVar = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
        const teVar = ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"];
        const outVar = isEN ? enVar : isHI ? hiVar : teVar;
        const statuses = [T_MADHYAMAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_MADHYAMAM];
        if (val < 1 || val > 7) return ["—"];
        return [outVar[val - 1], statuses[val - 1]];
      }
      case "Nakshatram": {
        const enNak = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Arudra", "Punarvasu", "Pushyami", "Ashlesha", "Makha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Moola", "Purvashadha", "Uttarashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purvabhadra", "Uttarabhadra", "Revati"];
        const hiNak = ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशीर्षा", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वा फाल्गुनी", "उत्तरा फाल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वा भाद्रपद", "उत्तरा भाद्रपद", "रेवती"];
        const teNak = ["అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆరుద్ర", "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వ ఫల్గుణి", "ఉత్తర ఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ", "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం", "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"];
        const outNak = isEN ? enNak : isHI ? hiNak : teNak;
        if (val < 1 || val > 27) return ["—"];
        return [outNak[val - 1]];
      }
      case "Aayamu": {
        const enAay = ["Dhwajayam", "Dhumayam", "Simhayam", "Shvanayam", "Vrishabhayam", "Kharayam", "Gajayam", "Kakayam"];
        const hiAay = ["ध्वजायम", "धुमायम", "सिंहायम", "श्वानायम", "वृषभायम", "खरायम", "गजायम", "काकायम"];
        const teAay = ["ధ్వజాయం", "ధూమాయం", "సింహాయం", "శ్వానాయం", "వృషభాయం", "ఖరాయం", "గజాయం", "కాకాయం"];
        const outAay = isEN ? enAay : isHI ? hiAay : teAay;
        const statuses = [T_SHUBHAM, T_AGNI, T_SHUBHAM, T_RAJA, T_SHUBHAM, T_ROGA, T_SHUBHAM, T_DEHA];
        if (val < 1 || val > 8) return ["—"];
        return [outAay[val - 1], statuses[val - 1]];
      }
      case "Ayurdayamu": {
        return [\`\${val} \${T_YEARS}\`, val <= 59 ? T_ASHUBHAM : T_SHUBHAM];
      }
      case "Amsa": {
        const enAmsa = ["Nashtamsa", "Vruddhamsa", "Stree Amsa", "Mrutyamsa", "Dahanamsa", "Choramsa", "Putramsa", "Godhanamsa", "Keertyamsa"];
        const hiAmsa = ["नष्टांश", "वृद्धांश", "स्त्री अंश", "मृत्यांश", "दहनांश", "चोरांश", "पुत्रांश", "गोधनांश", "कीर्त्यांश"];
        const teAmsa = ["నష్టాంశ", "వృద్ధాంశ", "స్త్రీ అంశ", "మృత్యాంశ", "దహనాంశ", "చోరాంశ", "పుత్రాంశ", "గోధనాంశ", "కీర్త్యాంశ"];
        const outAmsa = isEN ? enAmsa : isHI ? hiAmsa : teAmsa;
        const statuses = [T_NASHTA, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_AGNI, T_CHORA, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM];
        if (val < 1 || val > 9) return ["—"];
        return [outAmsa[val - 1], statuses[val - 1]];
      }
      case "Dikruti": {
        const enDik = ["Indra", "Agni", "Yama", "Nirruti", "Varuna", "Vayu", "Kubera", "Eeshana"];
        const hiDik = ["इन्द्र", "अग्नि", "यम", "निरृति", "वरुण", "वायु", "कुबेर", "ईशान"];
        const teDik = ["ఇంద్రుడు", "అగ్ని", "యముడు", "నిరృతి", "వరుణుడు", "వాయువు", "కుబేరుడు", "ఈశానుడు"];
        const outDik = isEN ? enDik : isHI ? hiDik : teDik;
        const statuses = [T_SHUBHAM, T_AGNI, T_SHUBHAM, T_RAJA, T_SHUBHAM, T_ROGA, T_SHUBHAM, T_DEHA];
        if (val < 1 || val > 8) return ["—"];
        return [outDik[val - 1], statuses[val - 1]];
      }
      default:
        return ["—"];
    }
  };
`;

const match = content.match(/const getPhalaData = [\s\S]+?default:\s+return \["—"\];\s+\}\s+\};/);
if (match) {
  content = content.replace(match[0], replacement.trim());
  // Also pass form.language into getPhalaData call
  content = content.replace(/const phalaData = getPhalaData\(row\.key, row\.rounded, dhanamRaw, runamRaw\);/g, 
    'const phalaData = getPhalaData(row.key, row.rounded, dhanamRaw, runamRaw, form.language);');
  
  fs.writeFileSync('src/pdf/generateVastuPdf.ts', content, 'utf8');
  console.log('Successfully replaced getPhalaData');
} else {
  console.log('Regex did not match.');
}
