const fs = require('fs');
let c = fs.readFileSync('src/i18n/strings.ts', 'utf8');

c = c.replace(/downloadPdf: string;/g, 'downloadPdf: string;\n  welcomeBack: string;\n  administrator: string;\n  contactInfoTitle: string;\n  contactInfoSubtitle: string;\n  nameLabel: string;\n  phoneLabel: string;');

c = c.replace(/homeRoute: string;/g, 'homeRoute: string;\n  homeTab: string;\n  approvalsTab: string;\n  statusTab: string;\n  profileTab: string;\n  loginTab: string;');

c = c.replace(/downloadPdf: "Download PDF Report",/g, 'downloadPdf: "Download PDF Report",\n    welcomeBack: "WELCOME BACK,",\n    administrator: "Administrator",\n    contactInfoTitle: "Contact Information",\n    contactInfoSubtitle: "Enter WhatsApp number for the report",\n    nameLabel: "Name",\n    phoneLabel: "Phone Number",');

c = c.replace(/homeRoute: "Home",/g, 'homeRoute: "Home",\n  homeTab: "Home",\n  approvalsTab: "Approvals",\n  statusTab: "Status",\n  profileTab: "Profile",\n  loginTab: "Login",');

c = c.replace(/downloadPdf: "PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి",/g, 'downloadPdf: "PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి",\n    welcomeBack: "తిరిగి స్వాగతం,",\n    administrator: "అడ్మినిస్ట్రేటర్",\n    contactInfoTitle: "సంప్రదింపు సమాచారం",\n    contactInfoSubtitle: "రిపోర్ట్ కోసం వాట్సాప్ నంబర్ నమోదు చేయండి",\n    nameLabel: "పేరు",\n    phoneLabel: "ఫోన్ నంబర్",');

c = c.replace(/homeRoute: "హోమ్",/g, 'homeRoute: "హోమ్",\n  homeTab: "హోమ్",\n  approvalsTab: "ఆమోదాలు",\n  statusTab: "స్థితి",\n  profileTab: "ప్రొఫైల్",\n  loginTab: "లాగిన్",');

c = c.replace(/downloadPdf: "PDF रिपोर्ट डाउनलोड करें",/g, 'downloadPdf: "PDF रिपोर्ट डाउनलोड करें",\n    welcomeBack: "वापसी पर स्वागत है,",\n    administrator: "प्रशासक",\n    contactInfoTitle: "संपर्क जानकारी",\n    contactInfoSubtitle: "रिपोर्ट के लिए व्हाट्सएप नंबर दर्ज करें",\n    nameLabel: "नाम",\n    phoneLabel: "फ़ोन नंबर",');

c = c.replace(/homeRoute: "होम",/g, 'homeRoute: "होम",\n  homeTab: "होम",\n  approvalsTab: "स्वीकृतियां",\n  statusTab: "स्थिति",\n  profileTab: "प्रोफ़ाइल",\n  loginTab: "लॉगिन",');

fs.writeFileSync('src/i18n/strings.ts', c);
