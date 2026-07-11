const fs = require('fs');
let content = fs.readFileSync('src/pdf/generateVastuPdf.ts', 'utf8');

const tStrings = `
const getPdfTranslations = (lang: string) => {
  if (lang === 'Telugu') {
    return {
      title: 'శ్రీ వాస్తు ఫల విశ్లేషణం',
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
      title: 'श्री वास्तु फल विश्लेषण',
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
    title: 'Sri Vastu Phala Visleshanam',
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

// Insert the function above buildRows
content = content.replace(/const buildRows =/, tStrings + '\nconst buildRows =');

// Let's also patch the HTML template within buildHtml to use T
// First we inject the T variable at the top of buildHtml
content = content.replace(/const buildHtml = \(form: VastuFormValues, table: ResultTable\): string => \{/, 
  'const buildHtml = (form: VastuFormValues, table: ResultTable): string => {\n  const T = getPdfTranslations(form.language);');

// Replace direction lookup
content = content.replace(/const dir    = DIR_TE\[form.direction\] \|\| form.direction \|\| "ఉత్తరం";/, 
  'const directionMap: Record<string, string> = { North: T.north, South: T.south, East: T.east, West: T.west, "North-East": T.ne, "North-West": T.nw, "South-East": T.se, "South-West": T.sw };\n  const dir = directionMap[form.direction] || form.direction || T.north;');

// Replace HTML static strings
content = content.replace(/శ్రీ వాస్తు ఫల విశ్లేషణం/g, '${T.title}');
content = content.replace(/దేవో వాస్తు ప్రజావతే/g, '${T.subtitle}');
content = content.replace(/వాస్తు శాస్త్ర ప్రామాణిక విశ్లేషణ వివరాలు/g, '${T.headerDesc}');
content = content.replace(/క్లయింట్ పేరు/g, '${T.clientName}');
content = content.replace(/>తేది</g, '>${T.date}<');
content = content.replace(/>దిక్కు</g, '>${T.direction}<');
content = content.replace(/ఇల్లు కొలతలు \(అడుగులు-అంగుళాలు\)/g, '${T.dimensions}');
content = content.replace(/పొడవు \(Length\)/g, '${T.length}');
content = content.replace(/వెడల్పు \(Width\)/g, '${T.width}');
content = content.replace(/కర్ణం \(Diagonal\)/g, '${T.diagonal}');
content = content.replace(/>పరిమాణం</g, '>${T.areaTitle}<');
content = content.replace(/>విస్తీర్ణం \(చ.అ.\)</g, '>${T.areaUnit}<');
content = content.replace(/>క్రమం</g, '>${T.col1}<');
content = content.replace(/>అంశం</g, '>${T.col2}<');
content = content.replace(/>సూత్రం \(అడుగులు\/అంగుళాలు\)</g, '>${T.col3}<');
content = content.replace(/>ఫలితం \(వాస్తవ\)</g, '>${T.col4}<');
content = content.replace(/>సవరించిన \(Rounded\)</g, '>${T.col5}<');
content = content.replace(/>ఫల విశ్లేషణ</g, '>${T.phalaHeader}<');
content = content.replace(/>వివరాలు</g, '>${T.phalaDetails}<');
content = content.replace(/>ఫలితం</g, '>${T.phalaResult}<');
content = content.replace(/✦&nbsp;సారాంశ ఫలితం&nbsp;✦/g, '${T.summary}');
content = content.replace(/ఈ భవన వాస్తు సమన్వయంగా ఉంది. శుభ ఫలితాలు కలుగును./g, '${T.s1}');
content = content.replace(/సంపద, ఆరోగ్యం, విజయం, శాంతి, శుభం మీ సహవాసం కలుగును./g, '${T.s2}');
content = content.replace(/శ్రీ వాస్తు దేవుని కృప మీ కుటుంబం పై ఉండగరా కలుగును./g, '${T.s3}');
content = content.replace(/సంప్రదించండి \(WhatsApp\)/g, '${T.whatsapp}');
content = content.replace(/మరిన్ని వివరాలకు \(Telegram\)/g, '${T.telegram}');

// Also replace the label lookups in metrics inside buildRows
content = content.replace(/\{ label: "ధన సంఖ్య", formula: "\(పదము \* 8\) \/ 12", ...findVal\("Dhanamu"\) \},/, `{ label: form.language === 'Telugu' ? "ధన సంఖ్య" : form.language === 'Hindi' ? "धन संख्या" : "Dhanamu", formula: "(Padamu * 8) / 12", ...findVal("Dhanamu") },`);
content = content.replace(/\{ label: "రుణ సంఖ్య", formula: "\(పదము \* 3\) \/ 8", ...findVal\("Runamu"\) \},/, `{ label: form.language === 'Telugu' ? "రుణ సంఖ్య" : form.language === 'Hindi' ? "ऋण संख्या" : "Runamu", formula: "(Padamu * 3) / 8", ...findVal("Runamu") },`);
content = content.replace(/\{ label: "తిథి సంఖ్య", formula: "\(పదము \* 6\) \/ 30", ...findVal\("Tithi"\) \},/, `{ label: form.language === 'Telugu' ? "తిథి సంఖ్య" : form.language === 'Hindi' ? "तिथि संख्या" : "Tithi", formula: "(Padamu * 6) / 30", ...findVal("Tithi") },`);
content = content.replace(/\{ label: "వార సంఖ్య", formula: "\(పదము \* 9\) \/ 7", ...findVal\("Vaaramu"\) \},/, `{ label: form.language === 'Telugu' ? "వార సంఖ్య" : form.language === 'Hindi' ? "वार संख्या" : "Vaaramu", formula: "(Padamu * 9) / 7", ...findVal("Vaaramu") },`);
content = content.replace(/\{ label: "నక్షత్ర సంఖ్య", formula: "\(పదము \* 8\) \/ 27", ...findVal\("Nakshatram"\) \},/, `{ label: form.language === 'Telugu' ? "నక్షత్ర సంఖ్య" : form.language === 'Hindi' ? "नक्षत्र संख्या" : "Nakshatram", formula: "(Padamu * 8) / 27", ...findVal("Nakshatram") },`);
content = content.replace(/\{ label: "ఆయాది సంఖ్య", formula: "\(పదము \* 9\) \/ 8", ...findVal\("Aayamu"\) \},/, `{ label: form.language === 'Telugu' ? "ఆయాది సంఖ్య" : form.language === 'Hindi' ? "आयादि संख्या" : "Aayamu", formula: "(Padamu * 9) / 8", ...findVal("Aayamu") },`);
content = content.replace(/\{ label: "ఆయుర్దాయ సంఖ్య", formula: "\(పదము \* 9\) \/ 120", ...findVal\("Ayurdayamu"\) \},/, `{ label: form.language === 'Telugu' ? "ఆయుర్దాయ సంఖ్య" : form.language === 'Hindi' ? "आयुर्दाय संख्या" : "Ayurdayamu", formula: "(Padamu * 9) / 120", ...findVal("Ayurdayamu") },`);
content = content.replace(/\{ label: "అంశ సంఖ్య", formula: "\(పదము \* 6\) \/ 9", ...findVal\("Amsa"\) \},/, `{ label: form.language === 'Telugu' ? "అంశ సంఖ్య" : form.language === 'Hindi' ? "अंश संख्या" : "Amsa", formula: "(Padamu * 6) / 9", ...findVal("Amsa") },`);
content = content.replace(/\{ label: "దిక్పతి సంఖ్య", formula: "\(పదము \* 9\) \/ 8", ...findVal\("Dikruti"\) \}/, `{ label: form.language === 'Telugu' ? "దిక్పతి సంఖ్య" : form.language === 'Hindi' ? "दिक्पति संख्या" : "Dikruti", formula: "(Padamu * 9) / 8", ...findVal("Dikruti") }`);

fs.writeFileSync('src/pdf/generateVastuPdf.ts', content, 'utf8');
console.log('Static strings replaced.');
