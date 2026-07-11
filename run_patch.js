const fs = require('fs');
let pdfContent = fs.readFileSync('src/pdf/generateVastuPdf.ts', 'utf8');

const buildRowsStart = pdfContent.indexOf('const buildRows = (table: ResultTable) => {');
const buildHtmlStart = pdfContent.indexOf('const buildHtml');

if (buildRowsStart !== -1 && buildHtmlStart !== -1) {
  const newBuildRows = `
const buildRows = (table: ResultTable, form: VastuFormValues) => {
  const findVal = (label: string) => {
    const row = table.rows.find(r => r.label === label);
    return { val: row ? row.value : "—", rounded: row?.roundedValue || "—" };
  };

  const dhanamRaw = findVal("Dhanamu").rounded;
  const runamRaw = findVal("Runamu").rounded;

  const lang = form.language || "Telugu";
  const isEN = lang === "English";
  const isHI = lang === "Hindi";

  const getLabel = (te: string, hi: string, en: string) => isEN ? en : isHI ? hi : te;

  const metrics = [
    { key: "Dhanamu", label: getLabel("ధన సంఖ్య", "धन संख्या", "Dhanamu"), formula: "(Padamu * 8) / 12", ...findVal("Dhanamu") },
    { key: "Runamu", label: getLabel("రుణ సంఖ్య", "ऋण संख्या", "Runamu"), formula: "(Padamu * 3) / 8", ...findVal("Runamu") },
    { key: "Tithi", label: getLabel("తిథి సంఖ్య", "तिथि संख्या", "Tithi"), formula: "(Padamu * 6) / 30", ...findVal("Tithi") },
    { key: "Vaaramu", label: getLabel("వార సంఖ్య", "वार संख्या", "Vaaramu"), formula: "(Padamu * 9) / 7", ...findVal("Vaaramu") },
    { key: "Nakshatram", label: getLabel("నక్షత్ర సంఖ్య", "नक्षत्र संख्या", "Nakshatram"), formula: "(Padamu * 8) / 27", ...findVal("Nakshatram") },
    { key: "Aayamu", label: getLabel("ఆయాది సంఖ్య", "आयादि संख्या", "Aayamu"), formula: "(Padamu * 9) / 8", ...findVal("Aayamu") },
    { key: "Ayurdayamu", label: getLabel("ఆయుర్దాయ సంఖ్య", "आयुर्दाय संख्या", "Ayurdayamu"), formula: "(Padamu * 9) / 120", ...findVal("Ayurdayamu") },
    { key: "Amsa", label: getLabel("అంశ సంఖ్య", "अंश संख्या", "Amsa"), formula: "(Padamu * 6) / 9", ...findVal("Amsa") },
    { key: "Dikruti", label: getLabel("దిక్పతి సంఖ్య", "दिक्पति संख्या", "Dikruti"), formula: "(Padamu * 9) / 8", ...findVal("Dikruti") }
  ];

  const getPhalaData = (key: string, roundedStr: string): [string, string, string] => {
    const val = parseInt(roundedStr, 10);
    const dhanam = parseInt(dhanamRaw, 10);
    const runam = parseInt(runamRaw, 10);

    if (isNaN(val)) return ["—", "", "#4A4A4A"];

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

    const getColor = (status: string) => {
      if ([T_SHUBHAM].includes(status)) return "#1B5E20";
      if ([T_MADHYAMAM].includes(status)) return "#F57F17";
      if ([T_ASHUBHAM, T_AGNI, T_RAJA, T_ROGA, T_DEHA, T_NASHTA, T_CHORA].includes(status)) return "#B71C1C";
      return "#4A4A4A";
    };

    const getTithiPrefix = (v: number) => {
      return v <= 15 ? (isEN ? "Su." : isHI ? "शु." : "శు.") : (isEN ? "Ba." : isHI ? "ब." : "బ.");
    };

    switch (key) {
      case "Dhanamu": {
        const s = dhanam > runam ? T_SHUBHAM : T_ASHUBHAM;
        return [s, "", getColor(s)];
      }
      case "Runamu": {
        const s = runam < dhanam ? T_SHUBHAM : T_ASHUBHAM;
        return [s, "", getColor(s)];
      }
      case "Tithi": {
        const enTithi = ["Padyami", "Vidiya", "Tadiya", "Chaviti", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Padyami", "Vidiya", "Tadiya", "Chaviti", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"];
        const hiTithi = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"];
        const teTithi = ["పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "పౌర్ణమి", "పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "అమావాస్య"];
        const outTithi = isEN ? enTithi : isHI ? hiTithi : teTithi;
        const outStatus = [
          T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM,
          T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_ASHUBHAM
        ];
        if (val < 1 || val > 30) return ["—", "", "#4A4A4A"];
        const s = outStatus[val - 1];
        return [\`\${getTithiPrefix(val)} \${outTithi[val - 1]}\`, s, getColor(s)];
      }
      case "Vaaramu": {
        const enVar = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const hiVar = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
        const teVar = ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"];
        const outVar = isEN ? enVar : isHI ? hiVar : teVar;
        const statuses = [T_MADHYAMAM, T_SHUBHAM, T_ASHUBHAM, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM, T_MADHYAMAM];
        if (val < 1 || val > 7) return ["—", "", "#4A4A4A"];
        const s = statuses[val - 1];
        return [outVar[val - 1], s, getColor(s)];
      }
      case "Nakshatram": {
        const enNak = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Arudra", "Punarvasu", "Pushyami", "Ashlesha", "Makha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Moola", "Purvashadha", "Uttarashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purvabhadra", "Uttarabhadra", "Revati"];
        const hiNak = ["अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशीर्षा", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वा फाल्गुनी", "उत्तरा फाल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा", "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्वा भाद्रपद", "उत्तरा भाद्रपद", "रेवती"];
        const teNak = ["అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆరుద్ర", "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వ ఫల్గుణి", "ఉత్తర ఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ", "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం", "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"];
        const outNak = isEN ? enNak : isHI ? hiNak : teNak;
        if (val < 1 || val > 27) return ["—", "", "#4A4A4A"];
        return [outNak[val - 1], "", "#4A4A4A"];
      }
      case "Aayamu": {
        const enAay = ["Dhwajayam", "Dhumayam", "Simhayam", "Shvanayam", "Vrishabhayam", "Kharayam", "Gajayam", "Kakayam"];
        const hiAay = ["ध्वजायम", "धुमायम", "सिंहायम", "श्वानायम", "वृषभायम", "खरायम", "गजायम", "काकायम"];
        const teAay = ["ధ్వజాయం", "ధూమాయం", "సింహాయం", "శ్వానాయం", "వృషభాయం", "ఖరాయం", "గజాయం", "కాకాయం"];
        const outAay = isEN ? enAay : isHI ? hiAay : teAay;
        const statuses = [T_SHUBHAM, T_AGNI, T_SHUBHAM, T_RAJA, T_SHUBHAM, T_ROGA, T_SHUBHAM, T_DEHA];
        if (val < 1 || val > 8) return ["—", "", "#4A4A4A"];
        const s = statuses[val - 1];
        return [outAay[val - 1], s, getColor(s)];
      }
      case "Ayurdayamu": {
        const s = val <= 59 ? T_ASHUBHAM : T_SHUBHAM;
        return [\`\${val} \${T_YEARS}\`, s, getColor(s)];
      }
      case "Amsa": {
        const enAmsa = ["Nashtamsa", "Vruddhamsa", "Stree Amsa", "Mrutyamsa", "Dahanamsa", "Choramsa", "Putramsa", "Godhanamsa", "Keertyamsa"];
        const hiAmsa = ["नष्टांश", "वृद्धांश", "स्त्री अंश", "मृत्यांश", "दहनांश", "चोरांश", "पुत्रांश", "गोधनांश", "कीर्त्यांश"];
        const teAmsa = ["నష్టాంశ", "వృద్ధాంశ", "స్త్రీ అంశ", "మృత్యాంశ", "దహనాంశ", "చోరాంశ", "పుత్రాంశ", "గోధనాంశ", "కీర్త్యాంశ"];
        const outAmsa = isEN ? enAmsa : isHI ? hiAmsa : teAmsa;
        const statuses = [T_NASHTA, T_SHUBHAM, T_SHUBHAM, T_ASHUBHAM, T_AGNI, T_CHORA, T_SHUBHAM, T_SHUBHAM, T_SHUBHAM];
        if (val < 1 || val > 9) return ["—", "", "#4A4A4A"];
        const s = statuses[val - 1];
        return [outAmsa[val - 1], s, getColor(s)];
      }
      case "Dikruti": {
        const enDik = ["Indra", "Agni", "Yama", "Nirruti", "Varuna", "Vayu", "Kubera", "Eeshana"];
        const hiDik = ["इन्द्र", "अग्नि", "यम", "निरृति", "वरुण", "वायु", "कुबेर", "ईशान"];
        const teDik = ["ఇంద్రుడు", "అగ్ని", "యముడు", "నిరృతి", "వరుణుడు", "వాయువు", "కుబేరుడు", "ఈశానుడు"];
        const outDik = isEN ? enDik : isHI ? hiDik : teDik;
        const statuses = [T_SHUBHAM, T_AGNI, T_SHUBHAM, T_RAJA, T_SHUBHAM, T_ROGA, T_SHUBHAM, T_DEHA];
        if (val < 1 || val > 8) return ["—", "", "#4A4A4A"];
        const s = statuses[val - 1];
        return [outDik[val - 1], s, getColor(s)];
      }
      default:
        return ["—", "", "#4A4A4A"];
    }
  };

  return metrics.map((row, i) => {
    const bg = i % 2 === 0 ? "#FFFFFF" : "#FFF9F0";
    const phalaData = getPhalaData(row.key, row.rounded);
    const colorCode = phalaData[2] || "#1B5E20";

    let phalaHtml = "";
    if (phalaData[1] && phalaData[1] !== "") {
       phalaHtml = \`
         <div style="display:flex; width:100%; height:100%; align-items:stretch;">
           <div style="flex:1; border-right:1px solid #D4B896; padding:11px 4px; text-align:center; color:#4A4A4A; font-size:13px; font-weight:600; display:flex; align-items:center; justify-content:center;">\${phalaData[0]}</div>
           <div style="flex:1; padding:11px 4px; text-align:center; color:\${colorCode}; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:center;">\${phalaData[1]}</div>
         </div>
       \`;
    } else {
       phalaHtml = \`<div style="padding:11px 8px; font-size:13px; font-weight:700; color:\${colorCode}; display:flex; align-items:center; justify-content:center; height:100%;">\${phalaData[0]}</div>\`;
    }

    return \`
 <tr>
   <td style="background:#F5EDD8;text-align:center;font-size:14px;font-weight:700;
       color:#3D1A00;border:1px solid #D4B896;width:48px;padding:11px 6px;">\${i + 1}</td>
   <td style="background:\${bg};font-size:14px;color:#2C1000;border:1px solid #D4B896;
       padding:11px 12px;font-weight:600;">\${row.label}</td>
   <td style="background:\${bg};font-size:13px;color:#5A3000;border:1px solid #D4B896;
       padding:11px 12px;text-align:center;">\${row.formula}</td>
   <td style="background:\${bg};text-align:center;font-size:13px;font-weight:700;
       color:#1A0A00;border:1px solid #D4B896;width:60px;padding:11px 4px;">\${row.val}</td>
   <td style="background:\${bg};text-align:center;font-size:14px;font-weight:700;
       color:#8B0000;border:1px solid #D4B896;width:55px;padding:11px 4px;">\${row.rounded}</td>
   <td style="background:\${bg};text-align:center;border:1px solid #D4B896;
       width:130px;padding:0px;font-size:14px;font-weight:600;">\${phalaHtml}</td>
 </tr>\`;
  }).join("");
};
`;
  
  pdfContent = pdfContent.substring(0, buildRowsStart) + newBuildRows + pdfContent.substring(buildHtmlStart);
  
  pdfContent = pdfContent.replace(/const dataRows = buildRows\(table\);/, 'const dataRows = buildRows(table, form);');
  
  // Apply translation mappings to the static strings
  const headerTranslationPatch = `
const getPdfTranslations = (lang: string) => {
  if (lang === 'Telugu') {
    return {
      title: 'విశ్వకర్మ వాస్తు సర్వస్వం',
      subtitle: 'దేవో వాస్తు ప్రజావతే',
      headerDesc: 'వాస్తు శాస్త్ర ప్రామాణిక విశ్లేషణ వివరాలు',
      clientName: 'క్లయింట్ పేరు',
      date: 'తేది',
      direction: 'దిక్కు',
      dimensions: 'ఇల్లు కొలతలు (అడుగులు-అంగుళాలు)',
      length: 'పొడవు (Length)',
      width: 'వెడల్పు (Width)',
      diagonal: 'కర్ణం (Diagonal)',
      areaTitle: 'పరిమాణం',
      areaUnit: 'విస్తీర్ణం (చ.అ.)',
      col1: 'క్రమం',
      col2: 'అంశం',
      col3: 'సూత్రం (అడుగులు/అంగుళాలు)',
      col4: 'ఫలితం (వాస్తవ)',
      col5: 'సవరించిన (Rounded)',
      phalaHeader: 'ఫల విశ్లేషణ',
      phalaDetails: 'వివరాలు',
      phalaResult: 'ఫలితం',
      summary: '✦ సారాంశ ఫలితం ✦',
      s1: 'ఈ భవన వాస్తు సమన్వయంగా ఉంది. శుభ ఫలితాలు కలుగును.',
      s2: 'సంపద, ఆరోగ్యం, విజయం, శాంతి, శుభం మీ సహవాసం కలుగును.',
      s3: 'శ్రీ వాస్తు దేవుని కృప మీ కుటుంబం పై ఉండగరా కలుగును.',
      whatsapp: 'సంప్రదించండి (WhatsApp)',
      telegram: 'మరిన్ని వివరాలకు (Telegram)',
      north: 'ఉత్తరం', south: 'దక్షిణం', east: 'తూర్పు', west: 'పడమర',
      ne: 'ఈశాన్యం', nw: 'వాయువ్యం', se: 'ఆగ్నేయం', sw: 'నైరుతి'
    };
  }
  if (lang === 'Hindi') {
    return {
      title: 'विश्वकर्मा वास्तु सर्वस्वम',
      subtitle: 'देवो वास्तु प्रजापते',
      headerDesc: 'वास्तु शास्त्र प्रामाणिक विश्लेषण विवरण',
      clientName: 'क्लाइंट का नाम',
      date: 'तारीख',
      direction: 'दिशा',
      dimensions: 'घर के आयाम (फीट-इंच)',
      length: 'लंबाई (Length)',
      width: 'चौड़ाई (Width)',
      diagonal: 'विकर्ण (Diagonal)',
      areaTitle: 'परिमाण',
      areaUnit: 'क्षेत्रफल (वर्ग फीट)',
      col1: 'क्रम',
      col2: 'अंश',
      col3: 'सूत्र (फीट/इंच)',
      col4: 'परिणाम (वास्तविक)',
      col5: 'संशोधित (Rounded)',
      phalaHeader: 'फल विश्लेषण',
      phalaDetails: 'विवरण',
      phalaResult: 'परिणाम',
      summary: '✦ सारांश परिणाम ✦',
      s1: 'यह भवन वास्तु समन्वित है। शुभ परिणाम प्राप्त होंगे।',
      s2: 'धन, स्वास्थ्य, सफलता, शांति और शुभता आपके साथ रहेगी।',
      s3: 'श्री वास्तु देव की कृपा आपके परिवार पर बनी रहे।',
      whatsapp: 'संपर्क करें (WhatsApp)',
      telegram: 'अधिक जानकारी के लिए (Telegram)',
      north: 'उत्तर', south: 'दक्षिण', east: 'पूर्व', west: 'पश्चिम',
      ne: 'ईशान', nw: 'वायव्य', se: 'आग्नेय', sw: 'नैऋत्य'
    };
  }
  return {
    title: 'Viswakarma Vastu Sarvaswam',
    subtitle: 'Devo Vastu Prajapate',
    headerDesc: 'Vastu Shastra Standard Analysis Details',
    clientName: 'Client Name',
    date: 'Date',
    direction: 'Direction',
    dimensions: 'House Dimensions (Feet-Inches)',
    length: 'Length',
    width: 'Width',
    diagonal: 'Diagonal',
    areaTitle: 'Magnitude',
    areaUnit: 'Area (Sq.Ft.)',
    col1: 'S.No',
    col2: 'Aspect',
    col3: 'Formula (Feet/Inches)',
    col4: 'Result (Actual)',
    col5: 'Modified (Rounded)',
    phalaHeader: 'Phala Analysis',
    phalaDetails: 'Details',
    phalaResult: 'Result',
    summary: '✦ Summary Result ✦',
    s1: 'This building is Vastu compliant. Auspicious results will follow.',
    s2: 'Wealth, health, success, peace, and auspiciousness will be with you.',
    s3: 'May the grace of Sri Vastu Deva be upon your family.',
    whatsapp: 'Contact (WhatsApp)',
    telegram: 'More Details (Telegram)',
    north: 'North', south: 'South', east: 'East', west: 'West',
    ne: 'North-East', nw: 'North-West', se: 'South-East', sw: 'South-West'
  };
};
`;

  if (!pdfContent.includes('const getPdfTranslations')) {
    pdfContent = pdfContent.replace(/const buildHtml = \(form: VastuFormValues, table: ResultTable\): string => \{/, 
      headerTranslationPatch + '\nconst buildHtml = (form: VastuFormValues, table: ResultTable): string => {\n  const T = getPdfTranslations(form.language || "Telugu");');
  
    pdfContent = pdfContent.replace(/const dir    = DIR_TE\[form.direction\] \|\| form.direction \|\| "ఉత్తరం";/, 
      'const directionMap: Record<string, string> = { North: T.north, South: T.south, East: T.east, West: T.west, "North-East": T.ne, "North-West": T.nw, "South-East": T.se, "South-West": T.sw };\n  const dir = directionMap[form.direction] || form.direction || T.north;');
    
    pdfContent = pdfContent.replace(/శ్రీ వాస్తు ఫల విశ్లేషణం/g, '${T.title}');
    pdfContent = pdfContent.replace(/దేవో వాస్తు ప్రజావతే/g, '${T.subtitle}');
    pdfContent = pdfContent.replace(/వాస్తు శాస్త్ర ప్రామాణిక విశ్లేషణ వివరాలు/g, '${T.headerDesc}');
    pdfContent = pdfContent.replace(/క్లయింట్ పేరు/g, '${T.clientName}');
    pdfContent = pdfContent.replace(/>తేది</g, '>${T.date}<');
    pdfContent = pdfContent.replace(/>దిక్కు</g, '>${T.direction}<');
    pdfContent = pdfContent.replace(/ఇల్లు కొలతలు \(అడుగులు-అంగుళాలు\)/g, '${T.dimensions}');
    pdfContent = pdfContent.replace(/పొడవు \(Length\)/g, '${T.length}');
    pdfContent = pdfContent.replace(/వెడల్పు \(Width\)/g, '${T.width}');
    pdfContent = pdfContent.replace(/కర్ణం \(Diagonal\)/g, '${T.diagonal}');
    pdfContent = pdfContent.replace(/>పరిమాణం</g, '>${T.areaTitle}<');
    pdfContent = pdfContent.replace(/>విస్తీర్ణం \(చ.అ.\)</g, '>${T.areaUnit}<');
    pdfContent = pdfContent.replace(/>క్రమం</g, '>${T.col1}<');
    pdfContent = pdfContent.replace(/>అంశం</g, '>${T.col2}<');
    pdfContent = pdfContent.replace(/>సూత్రం \(అడుగులు\/అంగుళాలు\)</g, '>${T.col3}<');
    pdfContent = pdfContent.replace(/>ఫలితం \(వాస్తవ\)</g, '>${T.col4}<');
    pdfContent = pdfContent.replace(/>సవరించిన \(Rounded\)</g, '>${T.col5}<');
  
    pdfContent = pdfContent.replace(/>ఫల విశ్లేషణ<\/div>/, '>${T.phalaHeader}</div>');
    pdfContent = pdfContent.replace(/>వివరాలు<\/div>/, '>${T.phalaDetails}</div>');
    pdfContent = pdfContent.replace(/>ఫలితం<\/div>/, '>${T.phalaResult}</div>');

    pdfContent = pdfContent.replace(/✦&nbsp;సారాంశ ఫలితం&nbsp;✦/g, '${T.summary}');
    pdfContent = pdfContent.replace(/ఈ భవన వాస్తు సమన్వయంగా ఉంది. శుభ ఫలితాలు కలుగును./g, '${T.s1}');
    pdfContent = pdfContent.replace(/సంపద, ఆరోగ్యం, విజయం, శాంతి, శుభం మీ సహవాసం కలుగును./g, '${T.s2}');
    pdfContent = pdfContent.replace(/శ్రీ వాస్తు దేవుని కృప మీ కుటుంబం పై ఉండగరా కలుగును./g, '${T.s3}');
    pdfContent = pdfContent.replace(/సంప్రదించండి \(WhatsApp\)/g, '${T.whatsapp}');
    pdfContent = pdfContent.replace(/మరిన్ని వివరాలకు \(Telegram\)/g, '${T.telegram}');
  }
  
  fs.writeFileSync('src/pdf/generateVastuPdf.ts', pdfContent, 'utf8');
  console.log('Replaced buildRows successfully.');
} else {
  console.log('Could not find boundaries.');
}

