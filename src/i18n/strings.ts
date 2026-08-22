import { AppLanguage } from "@/context/AppLanguageContext";
import { GuidePage, OptionItem } from "@/types/vastu";
import { directionOptions, nakshatramOptions, varguOptions } from "@/constants/content";

type HomeStrings = {
  festivalTitle: string;
  festivalSub: string;
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
  welcomeBack: string;
  administrator: string;
  contactInfoTitle: string;
  contactInfoSubtitle: string;
  nameLabel: string;
  phoneLabel: string;
  jyothishyalayamLabel: string;
  jyothishyalayamPlaceholder: string;
  namePlaceholder: string;
  phonePlaceholder: string;
};

export type LoginStrings = {
  welcomeBack: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  signIn: string;
  noAccount: string;
  registerNow: string;
};

export type ProfileStrings = {
  title: string;
  subtitle: string;
  personalDetails: string;
  fullName: string;
  namePlaceholder: string;
  phoneNumber: string;
  phonePlaceholder: string;
  jyothishyalayam: string;
  jyothishyalayamPlaceholder: string;
  saveDetails: string;
  editDetails: string;
  securityTitle: string;
  currentPassword: string;
  currentPasswordPlaceholder: string;
  newPassword: string;
  newPasswordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  changePassword: string;
  signOut: string;
  verifiedMember: string;
  administrator: string;
  photoOptionsTitle: string;
  viewPhoto: string;
  uploadPhoto: string;
  cancel: string;
  cropTitle: string;
  cropSubtitle: string;
  zoom: string;
  reset: string;
  cropSave: string;
  noPhotoUploaded: string;
  error: string;
  success: string;
  profileUpdated: string;
  photoUpdated: string;
  passwordsDoNotMatch: string;
  passwordLengthError: string;
  passwordFieldsEmpty: string;
  nameEmptyError: string;
};

type AppStrings = {
  homeRoute: string;
  homeTab: string;
  approvalsTab: string;
  statusTab: string;
  profileTab: string;
  loginTab: string;
  patrikaTab: string;
  home: HomeStrings;
  login: LoginStrings;
  profile: ProfileStrings;
  directions: OptionItem[];
  nakshatrams: OptionItem[];
  vargus: OptionItem[];
  resultTableLabels: Record<string, string>;
  taraPhalam: string[];
};

const englishStrings: AppStrings = {
  homeRoute: "Home",
  homeTab: "Home",
  approvalsTab: "Approvals",
  statusTab: "Status",
  profileTab: "Profile",
  loginTab: "Login",
  patrikaTab: "Patrika",
  home: {
    festivalTitle: "Vastu Shastra Analysis",
    festivalSub: "Know your home's Vastu today",
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
    lengthFeetLabel: "Feet",
    lengthInchLabel: "Inch",
    lengthNulluLabel: "Nullu",
    widthFeetLabel: "Feet",
    widthInchLabel: "Inch",
    widthNulluLabel: "Nullu",
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
    welcomeBack: "WELCOME BACK,",
    administrator: "Administrator",
    contactInfoTitle: "Contact Information",
    contactInfoSubtitle: "Enter WhatsApp number for the report",
    nameLabel: "Name",
    phoneLabel: "Phone Number",
    jyothishyalayamLabel: "Jyothishyalayam",
    jyothishyalayamPlaceholder: "e.g. Sri Jyothishyalayam",
    namePlaceholder: "e.g. Name",
    phonePlaceholder: "e.g. 9949598627",
  },
  login: {
    welcomeBack: "Welcome Back",
    subtitle: "Sign in to access your account",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    noAccount: "Don't have an account? ",
    registerNow: "Register Now",
  },
  profile: {
    title: "Your Profile",
    subtitle: "Manage your details, security and photo",
    personalDetails: "Personal Details",
    fullName: "Full Name",
    namePlaceholder: "Enter your name",
    phoneNumber: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    jyothishyalayam: "Jyothishyalayam",
    jyothishyalayamPlaceholder: "Enter Jyothishyalayam name",
    saveDetails: "Save Details",
    editDetails: "Edit Details",
    securityTitle: "Security / Change Password",
    currentPassword: "Current Password",
    currentPasswordPlaceholder: "Enter current password",
    newPassword: "New Password",
    newPasswordPlaceholder: "Enter new password",
    confirmPassword: "Confirm New Password",
    confirmPasswordPlaceholder: "Confirm new password",
    changePassword: "Change Password",
    signOut: "Sign Out",
    verifiedMember: "Verified Member",
    administrator: "Administrator",
    photoOptionsTitle: "Profile Photo Options",
    viewPhoto: "View Profile Picture",
    uploadPhoto: "Upload Profile Picture",
    cancel: "Cancel",
    cropTitle: "Crop & Adjust Photo",
    cropSubtitle: "Drag to reposition • Use slider to zoom",
    zoom: "Zoom",
    reset: "Reset Adjustments",
    cropSave: "Crop & Save",
    noPhotoUploaded: "No profile picture uploaded",
    error: "Error",
    success: "Success",
    profileUpdated: "Profile details updated successfully!",
    photoUpdated: "Profile picture updated successfully!",
    passwordsDoNotMatch: "New passwords do not match",
    passwordLengthError: "Password should be at least 6 characters",
    passwordFieldsEmpty: "Please fill in all password fields",
    nameEmptyError: "Name field cannot be empty",
  },
  directions: directionOptions,
  nakshatrams: nakshatramOptions,
  vargus: [
    { label: "1. 'అ' వర్గం (అ నుండి అః వరకు)", value: "1" },
    { label: "2. 'క' వర్గం (క, ఖ, గ, ఘ, ఙ)", value: "2" },
    { label: "3. 'చ' వర్గం (చ, ఛ, జ, ఝ, ఞ)", value: "3" },
    { label: "4. 'ట' వర్గం (ట, ఠ, డ, ఢ, ణ)", value: "4" },
    { label: "5. 'త' వర్గం (త, థ, ద, ధ, న)", value: "5" },
    { label: "6. 'ప' వర్గం (ప, ఫ, బ, భ, మ)", value: "6" },
    { label: "7. 'య' వర్గం (య, ర, ల, వ)", value: "7" },
    { label: "8. 'శ' వర్గం (శ, ష, స, హ)", value: "8" },
  ],
  resultTableLabels: {
    "Padamu Decimal": "Padam Decimal",
    "Nakshatram Name": "Nakshatram Name",
    "Plot Length": "Plot Length",
    "Plot Width": "Plot Width",
    "Plot Area": "Plot Area",
    "Plot Perimeter": "Plot Perimeter",
    "Padamu": "Padamu",
    "Diagonal": "Diagonal",
    "Dhanamu": "Dhanamu",
    "Runamu": "Runamu",
    "Tithi": "Tithi",
    "Vaaramu": "Vaaramu",
    "Nakshatram": "Nakshatram",
    "Aayamu": "Aayamu",
    "Ayurdayamu": "Ayurdayamu",
    "Ayurdayam": "Ayurdayamu",
    "Amsa": "Amsa",
    "Dikpati": "Dikpati",
    "Aayamu Actual": "Aayamu Actual",
    "Aayamu Rounded": "Aayamu Rounded",
    "1st Suddha Padham": "1st Suddha Padham",
    "2nd Suddha Padham": "2nd Suddha Padham",
    "No Subham Padamu found": "No Subham Padamu found",
    "Owner Tara Phalam": "Owner Tara Phalam",
    "Wife Tara Phalam": "Wife Tara Phalam",
  },
  taraPhalam: [
    "Janma Tara",
    "Sampat Tara",
    "Vipat Tara",
    "Kshema Tara",
    "Pratyak Tara",
    "Sadhana Tara",
    "Naidhana Tara",
    "Mitra Tara",
    "Parama Mitra Tara",
  ],
};

const teluguStrings: AppStrings = {
  homeRoute: "హోమ్",
  homeTab: "హోమ్",
  approvalsTab: "ఆమోదాలు",
  statusTab: "స్థితి",
  profileTab: "ప్రొఫైల్",
  loginTab: "లాగిన్",
  patrikaTab: "పత్రిక",
  home: {
    festivalTitle: "వాస్తు శాస్త్ర విశ్లేషణ",
    festivalSub: "ఈ రోజు మీ ఇంటి వాస్తు తెలుసుకోండి",
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
    lengthFeetLabel: "అడుగులు",
    lengthInchLabel: "ఇంచ్",
    lengthNulluLabel: "నులు",
    widthFeetLabel: "అడుగులు",
    widthInchLabel: "ఇంచ్",
    widthNulluLabel: "నులు",
    suddhaTitle: "శుద్ధ పదం",
    suddhaSubtitle: "టేబుల్ 3 అవసరమైనప్పుడు చూపించే ఐచ్ఛిక విభాగం",
    padamTitle: "నక్షత్రంతో పదం",
    padamSubtitle: "టేబుల్ 3 కి స్టార్ మ్యాపింగ్ అవసరమైనప్పుడు ఉపయోగించండి",
    suddhaPadhamLabel: "శుద్ధ పదం",
    suddhaPadhamPlaceholder: "ఐచ్ఛికం",
    feetLabel: "అడుగులు",
    inchLabel: "ఇంచ్",
    nulluLabel: "నులు",
    firstSuddhaPadhamLabel: "1వ శుద్ధ పదం",
    secondSuddhaPadhamLabel: "2వ శుద్ధ పదం",
    calculate: "లెక్కించండి",
    results: "ఫలితాలు",
    downloadPdf: "PDF రిపోర్ట్ డౌన్‌లోడ్ చేయండి",
    welcomeBack: "తిరిగి స్వాగతం,",
    administrator: "అడ్మినిస్ట్రేటర్",
    contactInfoTitle: "సంప్రదింపు సమాచారం",
    contactInfoSubtitle: "రిపోర్ట్ కోసం వాట్సాప్ నంబర్ నమోదు చేయండి",
    nameLabel: "పేరు",
    phoneLabel: "ఫోన్ నంబర్",
    jyothishyalayamLabel: "\u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C3E\u0C32\u0C2F\u0C02",
    jyothishyalayamPlaceholder: "\u0C09\u0C26\u0C3E. \u0C36\u0C4D\u0C30\u0C40 \u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C3E\u0C32\u0C2F\u0C02",
    namePlaceholder: "\u0C09\u0C26\u0C3E. \u0C2A\u0C47\u0C30\u0C41",
    phonePlaceholder: "\u0C09\u0C26\u0C3E. 9949598627",
  },
  login: {
    welcomeBack: "\u0C24\u0C3F\u0C30\u0C3F\u0C17\u0C3F \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02",
    subtitle: "\u0C16\u0C3E\u0C24\u0C3E\u0C28\u0C41 \u0C2F\u0C3E\u0C15\u0C4D\u0C38\u0C46\u0C38\u0C4D \u0C1a\u0C47\u0C2F\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C38\u0C48\u0C28\u0C4D \u0C07\u0C28\u0C4D \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    emailLabel: "\u0C08\u0C2E\u0C46\u0C2F\u0C3F\u0C32\u0C4D \u0C1A\u0C3F\u0C30\u0C41\u0C28\u0C3E\u0C2E\u0C3E",
    emailPlaceholder: "\u0C2E\u0C40 \u0C08\u0C2E\u0C46\u0C2F\u0C3F\u0C32\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    passwordLabel: "\u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D",
    passwordPlaceholder: "\u0C2E\u0C40 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    signIn: "\u0C38\u0C48\u0C28\u0C4D \u0C07\u0C28\u0C4D",
    noAccount: "\u0C16\u0C3E\u0C24\u0C3E \u0C32\u0C47\u0C26\u0C3E? ",
    registerNow: "\u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C47 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C38\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  },
  profile: {
    title: "\u0C2E\u0C40 \u0C2A\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D",
    subtitle: "\u0C2E\u0C40 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41, \u0C2d\u0C26\u0C4D\u0C30\u0C24 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2B\u0C4B\u0C1F\u0C4D \u0C28\u0C3F\u0C30\u0C4D\u0C35\u0C39\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F",
    personalDetails: "\u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41",
    fullName: "\u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C2A\u0C47\u0C30\u0C41",
    namePlaceholder: "\u0C2E\u0C40 \u0C2A\u0C47\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    phoneNumber: "\u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D",
    phonePlaceholder: "\u0C2E\u0C40 \u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    jyothishyalayam: "\u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C3E\u0C32\u0C2F\u0C02",
    jyothishyalayamPlaceholder: "\u0C1C\u0C4D\u0C2F\u0C4B\u0C24\u0C3F\u0C37\u0C4D\u0C2F\u0C3E\u0C32\u0C2F\u0C02 \u0C2A\u0C47\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    saveDetails: "\u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C38\u0C47\u0C35\u0C4D \u0C1a\u0C47\u0C2F\u0C3F",
    editDetails: "\u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C38\u0C35\u0C30\u0C3F\u0C02\u0C1a\u0C41",
    securityTitle: "\u0C2d\u0C26\u0C4D\u0C30\u0C24 / \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C1a\u0C02\u0C21\u0C3F",
    currentPassword: "\u0C2A\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C41\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D",
    currentPasswordPlaceholder: "\u0C2A\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C41\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D\u0C28\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    newPassword: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D",
    newPasswordPlaceholder: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D\u0C28\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    confirmPassword: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D\u0C28\u0C41 \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F",
    confirmPasswordPlaceholder: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D\u0C28\u0C41 \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F",
    changePassword: "\u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D \u0C2E\u0C3E\u0C30\u0C4D\u0C1a\u0C02\u0C21\u0C3F",
    signOut: "\u0C38\u0C48\u0C28\u0C4D \u0C05\u0C09\u0C1F\u0C4D",
    verifiedMember: "\u0C27\u0C43\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1a\u0C2c\u0C21\u0C3F\u0C28 \u0C38\u0C2d\u0C4D\u0C2F\u0C41\u0C21\u0C41",
    administrator: "\u0C05\u0C21\u0C4D\u0C2E\u0C3F\u0C28\u0C3F\u0C38\u0C4D\u0C1F\u0C4D\u0C30\u0C47\u0C1F\u0C30\u0C4D",
    photoOptionsTitle: "\u0C2A\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D \u0C2B\u0C4B\u0C1F\u0C4D \u0C0E\u0C02\u0C2A\u0C3F\u0C15\u0C32\u0C41",
    viewPhoto: "\u0C2A\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D \u0C1a\u0C3F\u0C24\u0C4D\u0C30\u0C02 \u0C1a\u0C42\u0C21\u0C02\u0C21\u0C3F",
    uploadPhoto: "\u0C2A\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D \u0C1a\u0C3F\u0C24\u0C4D\u0C30\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C05\u0C2A\u0C4D\u0C32\u0C4B\u0C21\u0C4D \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    cancel: "\u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1a\u0C47\u0C2F\u0C3F",
    cropTitle: "\u0C2b\u0C4B\u0C1F\u0C4D\u0C28\u0C41 \u0C15\u0C24\u0C4D\u0C24\u0C3F\u0C30\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F & \u0C38\u0C30\u0C4D\u0C26\u0C41\u0C2c\u0C3E\u0C1F\u0C4D \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    cropSubtitle: "\u0C24\u0C3F\u0C30\u0C3F\u0C17\u0C3F \u0C09\u0C02\u0C1a\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C32\u0C3E\u0C17\u0C02\u0C21\u0C3F \u2022 \u0C1C\u0C4D\u0C2E\u0C4D \u0C1a\u0C47\u0C2F\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C38\u0C4D\u0C32\u0C48\u0C21\u0C30\u0C4D\u0C28\u0C41 \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F",
    zoom: "\u0C1C\u0C4D\u0C2E\u0C4D",
    reset: "\u0C38\u0C30\u0C4D\u0C26\u0C41\u0C2c\u0C3E\u0C1F\u0C4D\u0C32\u0C28\u0C41 \u0C30\u0C40\u0C38\u0C46\u0C1F\u0C4D \u0C1a\u0C47\u0C2F\u0C3F",
    cropSave: "\u0C15\u0C24\u0C4D\u0C24\u0C3F\u0C30\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F & \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C38\u0C47\u0C35\u0C4D \u0C1a\u0C47\u0C2F\u0C02\u0C21\u0C3F",
    noPhotoUploaded: "\u0C2a\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D \u0C1a\u0C3F\u0C24\u0C4D\u0C30\u0C02 \u0C05\u0C2A\u0C4D\u0C32\u0C4B\u0C21\u0C4D \u0C1a\u0C47\u0C2F\u0C2c\u0C21\u0C32\u0C47\u0C26\u0C41",
    error: "\u0C32\u0C4B\u0C2A\u0C02",
    success: "\u0C35\u0C3F\u0C1C\u0C2F\u0C02",
    profileUpdated: "\u0C2a\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41 \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C28\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1a\u0C2c\u0C21\u0C4D\u0C21\u0C3E\u0C2F\u0C3F!",
    photoUpdated: "\u0C2a\u0C4D\u0C30\u0C4B\u0C2B\u0C48\u0C32\u0C4D \u0C1a\u0C3F\u0C24\u0C4D\u0C30\u0C02 \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C28\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1a\u0C2c\u0C21\u0C3F\u0C02\u0C26\u0C3F!",
    passwordsDoNotMatch: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D\u0C32\u0C41 \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C32\u0C47\u0C26\u0C41",
    passwordLengthError: "\u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D \u0C15\u0C28\u0C40\u0C38\u0C02 6 \u0C05\u0C15\u0C4D\u0C37\u0C30\u0C3E\u0C32\u0C41 \u0C09\u0C02\u0C21\u0C3E\u0C32\u0C3F",
    passwordFieldsEmpty: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C2A\u0C3E\u0C38\u0C4D\u0C35\u0C30\u0C4D\u0C21\u0C4D \u0C2B\u0C40\u0C32\u0C4D\u0C21\u0C4D\u0C28\u0C41 \u0C2A\u0C42\u0C30\u0C3F\u0C02\u0C1a\u0C02\u0C21\u0C3F",
    nameEmptyError: "\u0C2A\u0C47\u0C30\u0C41 \u0C2B\u0C4B\u0C28\u0C4D\u0C32\u0C41 \u0C16\u0C3E\u0C32\u0C40\u0C17\u0C3E \u0C09\u0C02\u0C21\u0C15\u0C42\u0C21\u0C26\u0C41",
  },
  directions: [
    "ఉత్తరం", "ఈశాన్యం", "తూర్పు", "ఆగ్నేయం", "దక్షిణం", "నైరుతి", "పడమర", "వాయువ్యం"
  ].map((d, idx) => ({ label: `${idx + 1}. ${d}`, value: d })),
  nakshatrams: [
    "అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆరుద్ర",
    "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వ ఫల్గుణి",
    "ఉత్తర ఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ",
    "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం",
    "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"
  ].map((n, index) => ({ label: `${index + 1}. ${n}`, value: n })),
  vargus: [
    { label: "1. 'అ' వర్గం (అ నుండి అః వరకు)", value: "1" },
    { label: "2. 'క' వర్గం (క, ఖ, గ, ఘ, ఙ)", value: "2" },
    { label: "3. 'చ' వర్గం (చ, ఛ, జ, ఝ, ఞ)", value: "3" },
    { label: "4. 'ట' వర్గం (ట, ఠ, డ, ఢ, ణ)", value: "4" },
    { label: "5. 'త' వర్గం (త, థ, ద, ధ, న)", value: "5" },
    { label: "6. 'ప' వర్గం (ప, ఫ, బ, భ, మ)", value: "6" },
    { label: "7. 'య' వర్గం (య, ర, ల, వ)", value: "7" },
    { label: "8. 'శ' వర్గం (శ, ష, స, హ)", value: "8" },
  ],
  resultTableLabels: {
    "Padamu Decimal": "పదం డెసిమల్",
    "Nakshatram Name": "నక్షత్రం పేరు",
    "Plot Length": "ప్లాట్ పొడవు",
    "Plot Width": "ప్లాట్ వెడల్పు",
    "Plot Area": "ప్లాట్ విస్తీర్ణం",
    "Plot Perimeter": "ప్లాట్ చుట్టుకొలత",
    "Padamu": "పదం",
    "Diagonal": "కర్ణం",
    "Dhanamu": "ధన సంఖ్య",
    "Runamu": "రుణ సంఖ్య",
    "Tithi": "తిథి సంఖ్య",
    "Vaaramu": "వార సంఖ్య",
    "Nakshatram": "నక్షత్ర సంఖ్య",
    "Aayamu": "ఆయాది సంఖ్య",
    "Ayurdayamu": "ఆయుర్దాయ సంఖ్య",
    "Ayurdayam": "ఆయుర్దాయ సంఖ్య",
    "Amsa": "అంశ సంఖ్య",
    "Dikpati": "దిక్పతి సంఖ్య",
    "Aayamu Actual": "ఆయము (వాస్తవ)",
    "Aayamu Rounded": "ఆయము (సమీప)",
    "1st Suddha Padham": "1వ శుద్ధ పదం",
    "2nd Suddha Padham": "2వ శుద్ధ పదం",
    "No Subham Padamu found": "శుభ పదం లభించలేదు",
    "Owner Tara Phalam": "యజమాని తారా ఫలం",
    "Wife Tara Phalam": "భార్య తారా ఫలం",
  },
  taraPhalam: [
    "జన్మతార – దేహనాశనం",
    "సంపత్తార – సంపద",
    "విపత్తార – విపత్తు",
    "క్షేమతార – క్షేమం",
    "ప్రత్యక్తార – వ్యతిరేకత",
    "సాధనతార – శుభం",
    "నైధనతార – అశుభం",
    "మిత్రతార – శుభం",
    "పరమమిత్రతార – శుభం",
  ],
};

const hindiStrings: AppStrings = {
  homeRoute: "होम",
  homeTab: "होम",
  approvalsTab: "स्वीकृतियां",
  statusTab: "स्थिति",
  profileTab: "प्रोफ़ाइल",
  loginTab: "लॉगिन",
  patrikaTab: "पत्रिका",
  home: {
    festivalTitle: "वास्तु शास्त्र विश्लेषण",
    festivalSub: "आज अपने घर का वास्तु जानें",
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
    lengthFeetLabel: "फीट",
    lengthInchLabel: "इंच",
    lengthNulluLabel: "नुल्लु",
    widthFeetLabel: "फीट",
    widthInchLabel: "इंच",
    widthNulluLabel: "नुल्लु",
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
    welcomeBack: "वापसी पर स्वागत है,",
    administrator: "प्रशासक",
    contactInfoTitle: "संपर्क जानकारी",
    contactInfoSubtitle: "रिपोर्ट के लिए व्हाट्सएप नंबर दर्ज करें",
    nameLabel: "नाम",
    phoneLabel: "फ़ोन नंबर",
    jyothishyalayamLabel: "\u091C\u094D\u092F\u094B\u0924\u093F\u0937\u093E\u0932\u092F",
    jyothishyalayamPlaceholder: "\u092C\u093E. \u0936\u094D\u0930\u0940 \u091C\u094D\u092F\u094B\u0924\u093F\u0937\u093E\u0932\u092F",
    namePlaceholder: "\u092C\u093E. \u0928\u093E\u092E",
    phonePlaceholder: "\u092C\u093E. 9949598627",
  },
  login: {
    welcomeBack: "\u0935\u093E\u092A\u0938\u0940 \u092A\u0930 \u0938\u094D\u0935\u0C3E\u0917\u0924 \u0939\u0942",
    subtitle: "\u0905\u092A\u0928\u0947 \u0916\u093E\u0924\u0947 \u092E\u0947\u0902 \u0938\u093E\u0907\u0928 \u0907\u0928 \u0915\u0930\u0947\u0902",
    emailLabel: "\u0908\u092E\u0947\u0932 \u092A\u0924\u093E",
    emailPlaceholder: "\u0905\u092A\u0928\u093E \u0908\u092E\u0947\u0932 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    passwordLabel: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921",
    passwordPlaceholder: "\u0905\u092A\u0928\u093E \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    signIn: "\u0938\u093E\u0907\u0928 \u0907\u0928",
    noAccount: "\u0916\u093E\u0924\u093E \u0928\u0939\u0940\u0902 \u0939\u0948? ",
    registerNow: "\u0905\u092d\u0940 \u092A\u0902\u091C\u0940\u0915\u0930\u0923 \u0915\u0930\u0947\u0902",
  },
  profile: {
    title: "\u0905\u092A\u0928\u0940 \u0925\u094B\u0921\u093C\u0940 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932",
    subtitle: "\u0905\u092A\u0928\u0947 \u0935\u093F\u0935\u0930\u0923, \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0914\u0930 \u092B\u094B\u091F\u094B \u0915\u093E \u092A\u094D\u0930\u092C\u0902\u0925\u0928 \u0915\u0930\u0947\u0902",
    personalDetails: "\u0935\u094D\u092F\u0915\u0C4D\u0924\u093F\u0917\u0924 \u0935\u093F\u0935\u0930\u0923",
    fullName: "\u092A\u0942\u0930\u093E \u0928\u093E\u092E",
    namePlaceholder: "\u0905\u092A\u0928\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    phoneNumber: "\u092B\u094B\u0928 \u0928\u0902\u092C\u0930",
    phonePlaceholder: "\u0905\u092A\u0928\u093E \u092B\u094B\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    jyothishyalayam: "\u091C\u094D\u092F\u094B\u0924\u093F\u0937\u093E\u0932\u092F",
    jyothishyalayamPlaceholder: "\u091C\u094D\u092F\u094B\u0924\u093F\u0937\u093E\u0932\u092F \u0915\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    saveDetails: "\u0935\u093F\u0935\u0930\u0923 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0947\u0902",
    editDetails: "\u0935\u093F\u0935\u0930\u0923 \u0938\u0902\u092a\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902",
    securityTitle: "\u0938\u0941\u0930\u0915\u094D\u0937\u093E / \u092A\u093E\u0938\u0935\u0930\u094D\u0C21 \u092C\u0926\u0932\u0947\u0902",
    currentPassword: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092A\u093E\u0938\u0935\u0930\u0C21\u094D",
    currentPasswordPlaceholder: "\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    newPassword: "\u0928\u092F\u093E \u092A\u093E\u0938\u0935\u0930\u094D\u0921",
    newPasswordPlaceholder: "\u0928\u092F\u093E \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    confirmPassword: "\u0928\u092F\u0947 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0C15\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902",
    confirmPasswordPlaceholder: "\u0928\u092F\u0947 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902",
    changePassword: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092C\u0926\u0932\u0947\u0902",
    signOut: "\u0938\u093E\u0907\u0928 \u0905\u0909\u091F",
    verifiedMember: "\u0935\u0947\u0930\u0940\u092B\u093E\u0907\u0921 \u0938\u0926\u0938\u094D\u092F",
    administrator: "\u092A\u094D\u0930\u0936\u093E\u0938\u0915",
    photoOptionsTitle: "\u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u092B\u094B\u091F\u094B \u0935\u093F\u0915\u0932\u094D\u092A",
    viewPhoto: "\u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u091A\u093F\u0924\u094D\u0930 \u0926\u0947\u0916\u0947\u0902",
    uploadPhoto: "\u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u091A\u093F\u0924\u094D\u0C30 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
    cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
    cropTitle: "\u092B\u094B\u091F\u094B \u0915\u094D\u0930\u0949\u092A \u0914\u0930 \u0938\u092E\u093E\u092F\u094B\u091C\u093F\u0924 \u0915\u0930\u0947\u0902",
    cropSubtitle: "\u092A\u0941\u0928\u0903 \u0938\u094D\u0925\u093F\u0924\u093F \u0915\u0947 \u0932\u093F\u090f \u0916\u0940\u0902\u0C1A\u0947\u0902 \u2022 \u091C\u0942\u092E \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090f \u0938\u094D\u0932\u093E\u0907\u0921\u0930 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902",
    zoom: "\u091C\u0942\u092E",
    reset: "\u0938\u092E\u093E\u092F\u094B\u091C\u0928 \u0930\u0940\u0C38\u0947\u091F \u0915\u0C30\u0947\u0902",
    cropSave: "\u0915\u094D\u0930\u0949\u092A \u0914\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0947\u0902",
    noPhotoUploaded: "\u0915\u094B\u0908 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u091A\u093F\u0924\u094D\u0930 \u0905\u092A\u0932\u094B\u0921 \u0928\u0939\u0940\u0902 \u0915\u093F\u092F\u093E \u0917\u092F\u093E",
    error: "\u0924\u094D\u0930\u0941\u091F\u093F",
    success: "\u0938\u092B\u0932\u0924\u093E",
    profileUpdated: "\u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u0935\u093F\u0935\u0930\u0923 \u0938\u092B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u0905\u0926\u094D\u092F\u0924\u0928 \u0915\u093F\u092F\u093E \u0917\u092F\u093E!",
    photoUpdated: "\u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u091A\u093F\u0924\u094D\u0930 \u0938\u0C2B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u0905\u0926\u094D\u092F\u0924\u0928 \u0915\u093F\u092F\u093E \u0917\u092F\u093E!",
    passwordsDoNotMatch: "\u0928\u092F\u0947 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092E\u0947\u0932 \u0928\u0939\u0940\u0902 \u0916\u093E\u0924\u0947",
    passwordLengthError: "\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0915\u092E \u0938\u0947 \u0915\u092E 6 \u0905\u0915\u094D\u0937\u0930\u094D \u0915\u093E \u0939\u094B\u0928\u093E \u091C\u093E\u0939\u093F\u090F",
    passwordFieldsEmpty: "\u0915\u0943\u092A\u092F\u093E \u0938\u092d\u0940 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092B\u0940\u0932\u094D\u0921\u0C4D\u0938 \u092D\u0930\u0947\u0902",
    nameEmptyError: "\u0928\u093E\u092E \u092B\u0940\u0932\u094D\u0921 \u0916\u093E\u0932\u0940 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u0924\u093E",
  },
  directions: [
    "उत्तर", "ईशान", "पूर्व", "आग्नेय", "दक्षिण", "नैऋत्य", "पश्चिम", "वायव्य"
  ].map((d, idx) => ({ label: `${idx + 1}. ${d}`, value: d })),
  nakshatrams: [
    "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशीर्षा", "आर्द्रा",
    "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वा फाल्गुनी",
    "उत्तरा फाल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा",
    "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण",
    "धनिष्ठा", "शतभिषा", "पूर्वा भाद्रपद", "उत्तरा भाद्रपद", "रेवती"
  ].map((n, index) => ({ label: `${index + 1}. ${n}`, value: n })),
  vargus: [
    { label: "1. 'అ' వర్గం (అ నుండి అః వరకు)", value: "1" },
    { label: "2. 'క' వర్గం (క, ఖ, గ, ఘ, ఙ)", value: "2" },
    { label: "3. 'చ' వర్గం (చ, ఛ, జ, ఝ, ఞ)", value: "3" },
    { label: "4. 'ట' వర్గం (ట, ఠ, డ, ఢ, ణ)", value: "4" },
    { label: "5. 'త' వర్గం (త, థ, ద, ధ, న)", value: "5" },
    { label: "6. 'ప' వర్గం (ప, ఫ, బ, భ, మ)", value: "6" },
    { label: "7. 'య' వర్గం (య, ర, ల, వ)", value: "7" },
    { label: "8. 'శ' వర్గం (శ, ష, స, హ)", value: "8" },
  ],
  resultTableLabels: {
    "Padamu Decimal": "पादम् दशमलव",
    "Nakshatram Name": "नक्षत्र नाम",
    "Plot Length": "प्लॉट लंबाई",
    "Plot Width": "प्लॉट चौड़ाई",
    "Plot Area": "प्लॉट का क्षेत्रफल",
    "Plot Perimeter": "प्लॉट की परिधि",
    "Padamu": "पादम",
    "Diagonal": "विकर्ण",
    "Dhanamu": "धन संख्या",
    "Runamu": "ऋण संख्या",
    "Tithi": "तिथि संख्या",
    "Vaaramu": "वार संख्या",
    "Nakshatram": "नक्षत्र संख्या",
    "Aayamu": "आयादि संख्या",
    "Ayurdayamu": "आयुर्दाय संख्या",
    "Ayurdayam": "आयुर्दाय संख्या",
    "Amsa": "अंश संख्या",
    "Dikpati": "दिक्पति संख्या",
    "Aayamu Actual": "आयमु (वास्तविक)",
    "Aayamu Rounded": "आयमु (निकटतम)",
    "1st Suddha Padham": "1वां शुद्ध पादम",
    "2nd Suddha Padham": "2वां शुद्ध पादम",
    "No Subham Padamu found": "कोई शुभ पादम नहीं मिला",
    "Owner Tara Phalam": "मालिक तारा फलम",
    "Wife Tara Phalam": "पत्नी तारा फलम",
  },
  taraPhalam: [
    "1. जन्म तारा",
    "2. सम्पत तारा",
    "3. विपत तारा",
    "4. क्षेम तारा",
    "5. प्रत्यक तारा",
    "6. साधन तारा",
    "7. नैधन तारा",
    "8. मित्र तारा",
    "9. परम मित्र तारा",
  ],
};

const guideTranslations: Record<
  AppLanguage,
  Record<
    string,
    { title: string; subtitle: string; paragraphs: string[]; tableData?: any; multiColumnTables?: any; bottomContent?: any }
  >
> = {
  English: {
    "nava-vargu-ganitha-kramamu": {
      title: "Nava Vargu Ganitha Kramamu",
      subtitle: "Vastu calculation formulas and analysis details",
      paragraphs: [],
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
      ]
    },
    "main-entrance": {
      title: "Main Entrance",
      subtitle: "The main entrance is the primary door for owners to come and go.",
      paragraphs: [
        "The main entrance is the face of the house, like a lion's face. It is the primary door for the owners to come and go, facing the royal street, reflecting a royal life. It welcomes virtuous people, great gurus, and relatives, adding more glory to the house.",
        "It should be larger in height and width than all other doors in the construction, bringing all auspiciousness to all owners."
      ],
      multiColumnTables: [
        {
                    headers: ["First Letter of Name", "Varga", "Direction", "Suitable Main Entrance", "Unsuitable Main Entrance"],
          rows: [
            ["1. a to ah", "a", "East", "West, North, South", "East"],
            ["2. ka, kha, ga, gha, nga", "ka", "South-East", "West, North, South", "East"],
            ["3. cha, chha, ja, jha, nya", "cha", "South", "North, East, West", "South"],
            ["4. ta, tha, da, dha, na (retroflex)", "ta", "South-West", "North, East, West", "South"],
            ["5. ta, tha, da, dha, na (dental)", "ta", "West", "East, North, South", "West"],
            ["6. pa, pha, ba, bha, ma", "pa", "North-West", "East, North, South", "West"],
            ["7. ya, ra, la, va", "ya", "North", "South, East, West", "North"],
            ["8. sha, sha, sa, ha", "sha", "North-East", "South, East, West", "North"]
          ]
        }
      ]
    },
    "plot-shapes": {
      title: "Plot Shapes",
      subtitle: "The shape of the plot is essential for construction.",
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
    "shanku-sthapana": {
      title: "Shanku Sthapana",
      subtitle: "Important ritual done at the navel of Vastu Purusha",
      paragraphs: [
        "According to Vishwakarma Prakashika and other Vastu shastras, 'Shanku Sthapana' should be done at the navel of the Vastu Purusha. Currently it is being done in the North-East. Establishing the Shanku is Shanku Sthapana. Doing Prathamestika nyasam with bricks alone is not Shanku Sthapana.",
        "Shanku Construction: For all house constructions, the Shanku should be made according to Shilpa Shastra. It should be made of wood, 6x6 inches square and 12 inches high. Bottom 4 sides 4 inches high, above it 8 sides 4 inches high, above it 4 inches high. The tip of the Shanku points to the navel of Vastu Purusha.",
        "Shanku Sthapana Procedure: The house owner with his wife, wearing clothes and ornaments, should perform Swasti Punyahavachanam, worship Ashta Dikpalakas and Navagrahas according to shastras, apply turmeric and kumkum to the Shanku, offer sandalwood and flowers, place it on a heap of grains, perform Shodasopachara pooja, bathe it with panchamrutas, fruit juices and water, decorate with new clothes, and while auspicious instruments are played, establish the Shanku along with navaratnas and panchalohas in the pit determined at the navel of Vastu Purusha, worship with Vastu Purusha dhyanam, and offer dhupa, deepa, naivedyam. The owner who performs Shanku Sthapana in this scriptural way will become the recipient of Vastu Purusha's grace."
      ],
      multiColumnTables: [
        {
          title: "Months for House Construction",
          headers: ["S.No", "Month", "Result"],
          rows: [
            ["1", "Chaitra", "~~Loss of Wealth~~ Wealth"],
            ["2", "Vaishakha", "Prosperity"],
            ["3", "Jyeshtha", "Fatal"],
            ["4", "Ashadha", "Loss of Wealth"],
            ["5", "Shravana", "Wealth"],
            ["6", "Bhadrapada", "Fear of Disease"],
            ["7", "Ashwayuja", "Conflicts"],
            ["8", "Karthika", "Financial Gain"],
            ["9", "Margashira", "Grains"],
            ["10", "Pushya", "Loss of Cattle"],
            ["11", "Magha", "Lineage Growth"],
            ["12", "Phalguna", "Financial Gain"]
          ]
        },
        {
          title: "Month Determination for Shanku Sthapana",
          headers: ["No", "Month", "Monthly Result", "Doors to Do", "Doors Not to Do"],
          rows: [
            ["1", "Phalguna", "Growth of Lakshmi", "East, North", "West, South"],
            ["2", "Chaitra", "Fear of Disease", "East, North", "West, South"],
            ["3", "Vaishakha", "Gain of Wealth", "East, North", "West, South"],
            ["4", "Jyeshtha", "Death", "East, South", "West, North"],
            ["5", "Ashadha", "Servant Gain", "East, South", "West, North"],
            ["6", "Shravana", "Friend Gain", "East, South", "West, North"],
            ["7", "Bhadrapada", "Harm", "West, South", "East, North"],
            ["8", "Ashwayuja", "Fear of War", "West, South", "East, North"],
            ["9", "Karthika", "Gain of Wealth", "West, South", "East, North"],
            ["10", "Margashira", "Wealth Growth", "West, North", "East, South"],
            ["11", "Pushya", "Fear of Thieves", "West, North", "East, South"],
            ["12", "Magha", "Fear of Fire", "West, North", "East, South"]
          ]
        }
      ]
    },
    "tara-chandra-chakra": {
      title: "Tara & Chandra Bala Chakra",
      subtitle: "Day Lords, Tarabalam, and Chandrabalam Calculation Table",
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
    "gruharambham": {
      title: "Gruharambham",
      subtitle: "Auspicious timing and rituals for starting house construction.",
      paragraphs: [
        "Gruharambham or Shankusthapana is the formal ceremony of laying the foundation stone before initiating the construction of a new house.",
        "It must be performed during auspicious Muhurtham to ensure prosperity, peace, and longevity of the building."
      ],
    },
    "gruhapravesam": {
      title: "Gruhapravesam",
      subtitle: "The sacred housewarming ceremony when entering a new home.",
      paragraphs: [
        "Gruhapravesam is a sacred Hindu housewarming ceremony performed before occupying a newly built house or a renovated home.",
        "Performing proper Vastu Puja, Kalasa Pooja, and boiling milk ensures that positive energy flows throughout the new house."
      ],
    },
  },
  Telugu: {

    "main-entrance": {
      title: "సింహద్వారము",
      subtitle: "సింహద్వారము అనగా సింహము వంటి ద్వారము అని అర్ధము. యజమానులు రాక పోకలు చేయు ప్రధాన ద్వారము.",
      paragraphs: [
        "సింహద్వారము అనగా సింహము వంటి ద్వారము అని అర్ధము. యజమానులు రాక పోకలు చేయు ప్రధాన ద్వారము. రాజసమును చూపుచూ, రాజ జీవితో ఉట్టిపడుచూ, సద్గుణ సంపన్నులు సద్గురువులు, మహనీయులు, బంధు మిత్రాదులను ఆహ్వానించు సింహద్వారము ఇంటికి మరింత శోభను చేకూర్చును. నిర్మాణంలోని మిగిలిన అన్ని ద్వారముల కన్నా ఎత్తు, వెడల్పులయందు పెద్దది యజమానులకు సకల శుభములను చేకూర్చును."
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
    "plot-shapes": {
      title: "స్థలాల ఆకారాలు",
      subtitle: "నిర్మాణానికి స్థలం ఆకారం చాలా ముఖ్యం.",
      paragraphs: [
        "'చతురశ్రే ధనాగమం', ఆయతం సిద్ధియః — 'వృత్తం పుష్టి రుచ్యతే'. విశ్వకర్మ శాస్త్రమును అనుసరించి.",
        
      ],
      multiColumnTables: [
        {
          headers: ["సంఖ్య - అక్షరం", "స్థలం పేరు / దిశ", "రోడ్డు వివరాలు"],
          rows: [
            ["1. అ", "తూర్పు స్థలం", "పడమర రోడ్డు గలది"],
            ["2. క", "ఆగ్నేయ స్థలం", "వాయువ్యం రోడ్డు గలది"],
            ["3. చ", "దక్షిణ స్థలం", "ఉత్తరం రోడ్డు గలది"],
            ["4. ట", "నైరుతి స్థలం", "ఈశాన్యం రోడ్డు గలది"],
            ["5. త", "పడమర స్థలం", "తూర్పు రోడ్డు గలది"],
            ["6. ప", "వాయువ్యం స్థలం", "ఆగ్నేయం రోడ్డు గలది"],
            ["7. య", "ఉత్తరం స్థలం", "దక్షిణ రోడ్డు గలది"],
            ["8. శ", "ఈశాన్యం స్థలం", "నైరుతి రోడ్డు గలది"]
          ]
        }
      ],
      bottomContent: [
        { text: "ఆయా వర్గుల వారు తమ స్వవర్గు మరియు మిత్ర వర్గు స్థలములను ఎన్నుకొని గృహాది నిర్మాణములు చేసుకొనవలెను. శత్రు వర్గు స్థలములను విసర్జించవలెను. పూర్తి వివరములకు సిద్ధాంతిగారిని సంప్రదించండి." }
      ]
    },
    "shanku-sthapana": {
      title: "శంఖుస్థాపన",
      subtitle: "వాస్తు పురుషుని నాభి ప్రదేశమందు చేయు ముఖ్యమైన విధి",
      paragraphs: [
        "విశ్వకర్మ ప్రకాశికాది వాస్తు శాస్త్రానుసారం 'శంఖు స్థాపన' వాస్తు పురుషుని నాభి ప్రదేశమందు చేయవలెను. ప్రస్తుత కాలమందు ఈశాన్యమున చేయుచున్నారు. శంఖువును స్థాపించుటయే శంఖుస్థాపన. ఇటుకలతో చేయునది ప్రథమేష్టి కాన్యాసము మాత్రమే — శంఖుస్థాపన కాదు.",
        "శంకు నిర్మాణము: సకల గృహభవన నిర్మాణములకు శిల్ప శాస్త్రానుసారం శంకును తయారుచేసి స్థాపించవలెను. 6x6 అంగుళాలు చతురస్రము, 12 అంగుళాలు ఎత్తు గల దారువుతో శంకును తయారుచేయవలెను. క్రింద 4 భుజాలు 4 అంగుళాలు ఎత్తు, దానిపై 8 భుజాలు 4 అంగుళాలు ఎత్తు, దానిపై 4 అంగుళాలు ఎత్తుతో శంకు నిర్మాణము చేయవలెను. శంకువు పై కొన వాస్తుపురుషుని నాభిస్థానమునకు సూచిక.",
        "శంకు స్థాపన విధి: గృహ యజమాని భార్యతోకూడి వస్త్రాభరణాద్యలంకారంబులను ధరించి స్వస్తి పుణ్యాహావాచనము ఆచరించి అష్టదిక్పాలకులను, నవగ్రహాదులను శాస్త్రోక్తముగా అర్చించి శంకువునకు పసుపువ్రాసి కుంకుమబొట్లుంచి గంధపుష్పాక్షతలొసంగి ధాన్యపు రాశిపై నుంచి షోడశోపచారపూజలు చేసి పంచామృతములు, వివిధ ఫలరసాలు, నీటితో అభిషేకించి నూతన వస్త్రములతో అలంకరించి మంగళవాయిద్యములు మ్రోయగా శంకువును నవరత్నాలు, పంచలోహాదులతో సహ వాస్తు పురుషుని నాభిస్థానమున నిర్ణయించిన అగడ్తయందు స్థాపించి వాస్తుపురుష ధ్యానంతో అర్చించి ధూప దీప నైవేద్యాలు అర్పించవలెను. ఇట్లు శాస్త్రోక్తముగా శంకుస్థాపన చేయు యజమాని వాస్తు పురుషుని కరుణా కటాక్షాలకు పాత్రుడగును."
      ],
      multiColumnTables: [
        {
          title: "శంఖుస్థాపనకు మాస నిర్ణయము",
          headers: ["నెం", "నెల", "మాస ఫలము", "చేయవలసిన సింహద్వారాలు", "చేయకూడని సింహద్వారాలు"],
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
      ],
      bottomContent: [
        { heading: "", text: "శాస్త్రోక్తముగా తయారు చేయబడిన శంకువు కొరకు మమ్ము సంప్రదించండి." }
      ]
    },
    "soil-testing": {
      title: "భూ పరీక్ష",
      subtitle: "నిర్మాణానికి నేల అనుకూలంగా ఉందో లేదో తెలుసుకోవడానికి మట్టి పరీక్ష చేయాలి.",
      paragraphs: ["మట్టి పరీక్షను 4 విధాలుగా చేయాలి:"],
      bottomContent: [
        { heading: "1. రంగు పరీక్ష", text: "తెలుపు, ఎరుపు, పసుపు, నలుపు రంగుల నేల అన్ని రకాల నిర్మాణాలకు అనుకూలం." },
        { heading: "2. వాసన పరీక్ష", text: "ఆహ్లాదకరమైన సువాసన మరియు వాతావరణం కలిగిన నేల శుభప్రదం." },
        { heading: "3. రుచి పరీక్ష", text: "తీపి, పులుపు, లేదా వగరు రుచి కలిగిన నేల అనుకూలం." },
                { heading: "4. స్పర్శ పరీక్ష", text: "నేలను తాకినప్పుడు మృదువుగా, తేలికగా లేదా బరువుగా అనిపిస్తే ఆ నేల శుభప్రదం." },
        { heading: "నిషిద్ధ స్థలాలు", text: "1. శ్మశాన భూమి\n2. దేవాలయం కూలిన స్థలం (తొలగించబడినది)\n3. దేవాలయ ఆక్రమ భూములు\n4. పుట్టలు ఉన్న స్థలం\n5. నీరు ఎల్లప్పుడూ నిలిచి ఉండే (బురద) స్థలం\n6. చౌడు / పనికిరాని భూమి\n7. ఎముకలు, బొగ్గు, లేదా బూడిద ఉన్న స్థలం\n8. కుమ్మరి బట్టీలు ఉన్న స్థలం\n9. గానుగలు ఉన్న స్థలం\n10. చెరువులు/కుంటలు పూడ్చిన స్థలం" },
        { heading: "", text: "అన్ని నిర్మాణాలకు ఇటువంటి స్థలాలను నివారించాలి.\n\nపూర్తి వివరాల కోసం, దయచేసి సిద్ధాంతిని సంప్రదించండి." }
      ]
    },
            "vargu": {
      title: "వర్గు నిర్ణయం",
      subtitle: "నామాద్యక్షరం (పేరులోని మొదటి అక్షరం) అనుసరించి వర్గు నిర్ణయం చేసుకొనవలెను.",
      paragraphs: ["నామాద్యక్షరం (పేరులోని మొదటి అక్షరం) అనుసరించి వర్గు నిర్ణయం చేసుకొనవలెను."],
      multiColumnTables: [
        {
          headers: ["వ.నెం", "దిశ", "వర్గు", "నామాద్యక్షరం"],
          rows: [
            ["1", "తూర్పు", "‘అ’", "అ, ఆ, ఇ, ఈ, ఉ, ఊ, ఋ, ౠ, ఎ, ఏ, ఐ, ఒ, ఓ, ఔ"],
            ["2", "ఆగ్నేయం", "‘క’", "క, ఖ, గ, ఘ, ఙ"],
            ["3", "దక్షిణం", "‘చ’", "చ, ఛ, జ, ఝ, ఞ"],
            ["4", "నైరుతి", "‘ట’", "ట, ఠ, డ, ఢ, ణ"],
            ["5", "పడమర", "‘త’", "త, థ, ద, ధ, న"],
            ["6", "వాయువ్యం", "‘ప’", "ప, ఫ, బ, భ, మ"],
            ["7", "ఉత్తరం", "‘య’", "య, ర, ల, వ"],
            ["8", "ఈశాన్యం", "‘శ’", "శ, ష, స, హ"]
          ]
        }
      ],
      bottomContent: [
        { heading: "", text: "పేరులోని మొదటి అక్షరం కలవర్గు `స్వవర్గు` అత్యంత అనుకూలమైనది, బలీయమైనది శ్రేష్టమైనది.\n\nసంయుక్తాక్షరములు వచ్చినప్పుడు చివరి అక్షరమును గ్రహించ వలెను. ఉదా: శ్రీ = శ + రి  = 'య' వర్గు గా గ్రహించవలెను \n\nస్వవర్గు నుండి 5 వ వర్గు శతృవర్గు మృత్యు బాధలు, అనారోగ్యము, కష్ట నష్టములు, ఆర్థిక బాధలు తెచ్చిపెట్టును దీనిని వదిలి పెట్టవలెను.\n\n మిగిలిన మిత్ర వర్గులు సానుకూల ఫలితాన్ని కలుగజేస్తాయి, మిత్ర లాభం ఆర్థిక లాభం చేకూరుస్తాయి." },
        { heading: "", text: "తూర్పు, ఆగ్నేయం — తూర్పు దిక్కు\nదక్షిణం, నైరుతి — దక్షిణం దిక్కు\nపడమర, వాయువ్యం — పడమర దిక్కు\nఉత్తరం, ఈశాన్యం — ఉత్తరం దిక్కు\nగా పరిగణించాలి." },
        { heading: "", text: "పూర్తి వివరములకు సిద్ధాంతిగారిని సంప్రదించండి." }
      ]
    },
    "kitchen": {
      title: "వంటగది",
      subtitle: "వంటగది వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "సర్వ నిర్మాణముల యందు వంటగది అగ్ని స్థానమైన ఆగ్నేయములో ఏర్పాటు చేయవలెను.",
        
        "ఆగ్నేయమున కుదరని పక్షమున దక్షిణ, నైరుతి, తూర్పు భాగముల యందు వంటగది ఏర్పాటు చేసుకొనవచ్చును."
      ],
    },
    "bedroom": {
      title: "పడక గదులు",
      subtitle: "పడక గదుల వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "గృహము నందు పడక గదులు దక్షిణ, నైరుతి, పడమర, వాయువ్య దిశల యందు ఉండవలెను. యజమాని పడక గది (Master Bed room) సర్వదా నైరుతి దిశ యందు ఉండవలెను.",
        "పిల్లల గదులు పడమర, దక్షిణ, వాయువ్య,ఉత్తర దిశలలో ఉండవలెను. అతిథి గదులు ఆగ్నేయంలో కూడా ఉండవచ్చును.",
        "ఈశాన్యంలో పడకగదులు ఉండరాదు."
      ],
    },
    "bathroom": {
      title: "వాస్తు శాస్త్ర రీత్యా స్నానపు గదులు",
      subtitle: "స్నానపు గదులు మరియు మరుగుదొడ్లు వాస్తు నిర్ణయము",
      paragraphs: [
        "వాస్తు శాస్త్ర రీత్యా స్నానపు గదులు, Toilets నైరుతి, వాయువ్య, పడమర, దక్షిణ దిశలలో ఉండవలెనని నియమము. కాని ప్రస్తుత ఆధునిక కాలమందు Attached Bathrooms ఏర్పాటు తప్పనిసరి అయినందున దక్షిణ, నైరుతి, పడమర, వాయువ్య దిశలలో Bed rooms కు Attached Bathrooms ఏర్పాటు చేసుకొనవచ్చును.",
        "స్నానపు గదులు మాత్రము తూర్పు, ఉత్తర దిశల యందు కూడా ఉండవచ్చును."
      ],
    },
    "pooja-room": {
      title: "పూజ గది",
      subtitle: "పూజ గది వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "పూజ గది, పూజ మందిరం ఇంటికి వ్యాపార స్థలమునకు ఈశాన్యములో ఏర్పాటు చేసుకొనవలెను. తూర్పు, ఉత్తర దిశల యందు కూడా పూజ మందిరము ఏర్పాటు చేసుకొనవచ్చును.",
        "దేవుని పీఠము పడమర (లేదా) దక్షిణం చూచునట్లు మనము తూర్పు (లేదా) ఉత్తరం చూచుచూ పూజ చేయు నట్లు ఏర్పాటు చేసుకొనవలెను.",
        "పూజ మందిరము దేవతా చిత్రపటములతో, దైవిక వస్తువులతో, ఆధ్యాత్మిక శోభను పెంపొందించునట్లు, మనస్సుకు ప్రశాంతత కలుగునట్లు ఉండవలెను. పాత సామాగ్రి, పనికిరాని సామగ్రి, ఇతర బరువైన వస్తువులు పూజ మందిరము నందు ఉండరాదు."
      ],
    },
    "dining-room": {
      title: "భోజనాల గది",
      subtitle: "భోజనశాల వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "భోజనశాల పడమర లో ఏర్పాటు చేయవలెనని విశ్వకర్మ ప్రకాశికాది వాస్తు శాస్త్ర నిర్ణయము. కావున భోజనశాల పడమర దిశ యందు ఏర్పాటు చేసుకొనుట ఉత్తమము.",
        "తూర్పు, దక్షిణం, ఆగ్నేయం, ఈశాన్యం లో సైతము అవసరమును బట్టి భోజనశాల ఏర్పాటు చేసుకొనవచ్చును."
      ],
    },
    "staircase": {
      title: "మెట్లు మరియు లిఫ్ట్‌లు",
      subtitle: "మెట్లు మరియు లిఫ్ట్‌ల వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "నిర్మాణముల యందు పై అంతస్తు లోనికి వెళ్ళుటకు సోపానములు (Stair case) ఏర్పాటు తప్పనిసరి. ఆ సోపానములు ఎక్కుచూ వెళ్ళునప్పుడు ప్రదక్షిణ క్రమముగా పైకి వెళ్ళుట శ్రేయోదాయకము.",
        "ఆయా దిశానిర్మాణములను బట్టి ఆగ్నేయ, నైరుతి, వాయువ్య దిక్కుల యందు సోపానములు ఏర్పాటు చేసుకొనవలెను.",
        "Lifts ఏర్పాటు చేయునప్పుడు ఆగ్నేయ, వాయువ్య దిశల యందు ఏర్పాటు చేసుకొనవలెను. నైరుతిలో Lift ఏర్పాటు చేయరాదు."
      ],
    },
    "parking": {
      title: "పార్కింగ్",
      subtitle: "పార్కింగ్ వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "వాహనములు నిలుపుటకు అత్యంత ఆవశ్యక ప్రదేశము Parking. ప్రతి నిర్మాణమునకు, తూర్పు, ఉత్తర భాగముల యందు Parking ఏర్పాటు చేసుకొనవలయును.",
        "Underground parking ఇవ్వవలసి వచ్చినప్పుడు, నైరుతి నుండి ప్రవేశం లేకుండా ఉండటం శ్రేయస్కరం."
      ],
    },
    "borewell": {
      title: "నీటి ట్యాంక్ మరియు బోర్‌వెల్",
      subtitle: "నీటి ట్యాంక్ మరియు బోర్‌వెల్ వాస్తు నిర్ణయము",
      paragraphs: [
        "సర్వసాధారణముగా Borewell, Tap ఈశాన్య భాగములో ఏర్పాటు చేసుకొనవలయును.",
        "జలము ఈశాన్యములో నుండుట, ఈశాన్యము నుండి బయటకు తీయుట అత్యంత ఆరోగ్యకరమైన వాస్తు విశేషము.",
        "OHT (Over Head Tank) విషయములో మాత్రమే బరువు, పరిమాణముల ననుసరించి ఇంటి పైన O.H Tank నైరుతి, దక్షిణం, పడమర దిశలయందు ఏర్పాటు చేసుకొనవలెను."
      ],
    },
    "septic-tank": {
      title: "సెప్టిక్ ట్యాంక్",
      subtitle: "సెప్టిక్ ట్యాంక్ వాస్తు శాస్త్ర నిర్ణయము",
      paragraphs: [
        "సెప్టిక్ ట్యాంకు అనారోగ్య హేతువు, నేటి ఆధునిక యుగంలో వాస్తులో చేర్చబడినది. ఇది గొయ్యి వాయు విశేషము గనుకనే ఉత్తర వాయువ్య భాగం అన్ని విధాలా అనుకూలమైనది. ఉత్తరం, తూర్పు, తూర్పు ఆగ్నేయంలో కూడా అవసరాన్ని బట్టి ఏర్పాటు చేసుకొనవచ్చును.",
        "నైరుతి, పడమర, దక్షిణం, ఈశాన్య దిశలయందు ఎట్టి పరిస్థితులలోను Septic tank ఏర్పాటు చేసుకొనరాదు."
      ],
    },
    "veedi-potlu": {
      title: "వీధి పోట్లు",
      subtitle: "స్తలం యొక్క శుభాశుభాలను నిర్ణయించడంలో వీధి పోట్లు వీధి చూపుల ప్రముఖ పాత్ర వహిస్తాయి.",
      paragraphs: [
        "స్తలం యొక్క శుభాశుభాలను నిర్ణయించడంలో వీధి పోట్లు వీధి చూపుల ప్రముఖ పాత్ర వహిస్తాయి.",
        "వీధి చూపులు లేని స్థలం అన్ని విధాలా అనుకూలమైనది. తూర్పు, తూర్పు ఉత్తరం, ఉత్తర ఈశాన్యం,దక్షిణ ఆగ్నేయం,ఈశాన్యం, పడమర వాయువ్యం,ఈశాన్య కేంద్రంగా పనిచేస్తాయి,అనుకూలతలు కలిగిస్తాయి.",
        " పడమర, నైరుతి,తూర్పు, ఆగ్నేయం, ఉత్తర వాయవ్యం నైరుతి కేంద్రంగా పనిచేస్తాయి. వాటివల్ల అనారోగ్యాలు, ఆర్థిక నష్టాలు కలుగజేస్తాయి."
      ],
    },
    "faq": {
      title: "తరచుగా అడిగే ప్రశ్నలు",
      subtitle: "శ్రీ వాస్తు యాప్ గురించి, అది ఎలా పనిచేస్తుందో సాధారణ ప్రశ్నలు.",
      paragraphs: [
        "ఆ విశ్వకర్మ శాస్త్ర సర్వస్వం ఒక ప్రొఫెషనల్ వాస్తు శాస్త్ర విశ్లేషణ అప్లికేషన్."
      ],
    },
    "contact": {
      title: "మమ్మల్ని సంప్రదించండి",
      subtitle: "సపోర్ట్, కన్సల్టేషన్ లేదా యాప్ గురించిన ప్రశ్నల కోసం శ్రీ వాస్తు బృందాన్ని సంప్రదించండి.",
      paragraphs: [
        "శ్రీ వాస్తు అప్లికేషన్ గురించి మీ విచారణలను మేము స్వాగతిస్తున్నాము. క్యాలిక్యులేటర్ పనితీరు, గైడ్ కంటెంట్ లేదా PDF రిపోర్ట్ సిస్టమ్ గురించి ఏవైనా సందేహాలుంటే మమ్మల్ని అడగవచ్చు.",
        "వ్యక్తిగత కన్సల్టేషన్ సేవల కోసం మా అనుభవజ్ఞులైన వాస్తు నిపుణుల బృందం అందుబాటులో ఉంది. ప్రొఫెషనల్ కన్సల్టేషన్ మీ సైట్ యొక్క పూర్తి సంక్లిష్టతను పరిగణనలోకి తీసుకుంటుంది.",
        "మా సంప్రదింపు వివరాలు ఇక్కడ ఉన్నాయి. మీరు మమ్మల్ని సులభంగా సంప్రదించవచ్చు. మీకు మద్దతు ఇవ్వడానికి మేము ఎల్లప్పుడూ సిద్ధంగా ఉన్నాము."
      ],
    },
    "about": {
      title: "'విశ్వకర్మ వాస్తు సర్వస్వం'",
      subtitle: "విశ్వకర్మ వాస్తు సర్వస్వం గురించి",
      paragraphs: [
        "విశ్వకర్మ ప్రకాశిక, మయమతం, అపరాజిత పృచ్ఛ, సమరాంగణ సూత్రధారం, మనుష్యా లయ చంద్రిక ఇత్యాది ప్రాచీన వాస్తు శాస్త్ర గ్రంధాలనుండి సేకరించిన వాస్తు శాస్త్ర రహస్య విశేషాలతో అత్యంత సులభ శైలిలో సామాన్య ప్రజలకు, సిద్ధాంతులకు వాస్తు శాస్త్ర పరిశోధకులకు ఉపయోగ పడే విధంగా ఈ \"విశ్వకర్మ వాస్తు సర్వస్వం\" App తయారు చేయబడినది.",
        "సాంప్రదాయ వాస్తురీతులు, భారతీయ సంస్కృతి, సంప్రదాయాలను కాపాడాలనే ఆశయంతో త్వరలో \"విశ్వకర్మ వాస్తు సర్వస్వం\" గ్రంధం ఆవిష్కరించ బడుతోంది.",
        "మా అమూల్యమైన సూచనలు సలహాలు సంప్రదింపుల కొరకు మమ్ము సంప్రదించవచ్చును"
      ],
    },
    "nava-vargu-ganitha-kramamu": {
      title: "\u0C28\u0C35 \u0C35\u0C30\u0C4D\u0C17\u0C41 \u0C17\u0C23\u0C3f\u0C24 \u0C36\u0C3e\u0C38\u0C4d\u0C24\u0C4D\u0C30\u0C2e\u0C41",
      subtitle: "వాస్తు గణిత సూత్రాలు మరియు విశ్లేషణ వివరాలు",
      paragraphs: [],
      tableData: [
        { label: "పదం", formula: "పొడవు × వెడల్పు ÷ 9 " },
        { label: "ధనం", formula: "పదం × 8 ÷ 12 " },
        { label: "బుణం", formula: "పదం × 3 ÷ 8 " },
        { label: "తిథి", formula: "పదం × 6 ÷ 30 " },
        { label: "వారం", formula: "పదం × 9 ÷ 7 " },
        { label: "నక్షత్రం", formula: "పదం × 8 ÷ 27 " },
        { label: "ఆయం", formula: "పదం × 9 ÷ 8 " },
        { label: "ఆయుర్దాయం", formula: "పదం × 9 ÷ 120 " },
        { label: "అంశం", formula: "పదం × 6 ÷ 9 " },
        { label: "దిక్పతి", formula: "పదం × 9 ÷ 8 " },
      ],
      bottomContent: [
        { heading: "గణిత ఫల నిర్ణయారణ", text: "" },
        { heading: "1. ధనం :", text: "మొత్తం ధనాలు 12. బుణంలో వచ్చిన శేషం కన్నా ఎక్కువ ఉండాలి." },
        { heading: "2. బుణం :", text: "మొత్తం బుణాలు 8. ధనంలో వచ్చిన శేషం కన్నా తక్కువ ఉండాలి." },
        { heading: "3. తిథి :", text: "మొత్తం తిథులు 30. శేషం 1, 4, 9, 19, 24, 29, 30 తిథులు అశుభం. మిగిలినవి శుభం." },
        { heading: "4. వారం :", text: "మొత్తం వారాలు 7. (1 ఆది, 2 సోమ, 3 మంగళ, 4 బుధ, 5 గురు, 6 శుక్ర, 7 శని) 3వ మంగళవారం నిషిద్ధం. 1,7 వారాలు మధ్యమం. 2,4,5,6 శుభం." },
        { heading: "5. నక్షత్రం :", text: "మొత్తం నక్షత్రాలు 27 (అశ్విని నుండి రేవతి వరకు) ఇందులో వచ్చిన నక్షత్రం యజమానులకు తారాబలం కలిగి ఉండాలి." },
        { heading: "6. ఆయం :", text: "మొత్తం ఆయాలు 8. ఇందులో 2,4,6,8 అశుభ ఫలితాలనిస్తాయి. 1,3,5,7 శుభ ఫలితాలనిస్తాయి. సింహాయద్వారం అనుసరించి తూర్పు 3,5,7 పడమర 1,3,7 ఉత్తరం 1,3,5 దక్షిణం 1,5,7 లుగా నిర్ణయించుకోవాలి." },
        { heading: "7. ఆయుర్దాయం :", text: "మొత్తం 120 సంవత్సరాల ఆయుర్దాయంలో కనీసం 60 సంవత్సరాలు పైన ఉండవలెను." },
        { heading: "8. అంశ :", text: "మొత్తం అంశాలు 9. ఇందులో 1 స్వాంశం, 4 కులాంశం, 5 ధనాంశం, 6 చోరాంశం కాకుండా 2,3,7,8,9 సంఖ్యలు శుభ ఫలితాలనిస్తాయి." },
        { heading: "9. దిక్పతి :", text: "దిక్కులకు 8 మంది. ఇందులో 2,4,6,8 రాకుండా 1,3,5,7 వచ్చినట్లు ఉండాలి. (ఆయంలో వచ్చిన సంఖ్యలే ఇక్కడ గణితం అవ్వవు.)" }
      ]
    },
    "tara-chandra-chakra": {
      title: "దినాధిపతులు - తారాబలం-చంద్రబలం గణనచక్రం",
      subtitle: "దినాధిపతి, తారాబలము మరియు చంద్రబలము తెలుసుకొను చక్రము",
      paragraphs: [
        "👉 కుడివైపు బాణం గుర్తు (→) పంచాంగములోని నక్షత్రమును సూచిస్తుంది.\n👇 క్రిందివైపు బాణం గుర్తు (↓) మీ జన్మ నక్షత్రము లేదా నామ నక్షత్రమును సూచిస్తుంది.",
        "దినాధిపతులు - దిన నక్షత్రము - జన్మ నక్షత్రము మారగానే అధినాధిపతి మారును."
      ],
      multiColumnTables: [
        {
          title: "దినాధిపతులు, తారాబలము మరియు చంద్రబలము గణన పట్టిక",
          headers: [
            "జన్మ నక్షత్రం \\ దిన నక్షత్రం",
            "అశ్విని / మఖ / మూల",
            "భరణి / పుబ్బ / పూ.షాఢ",
            "కృత్తిక / ఉత్తర / ఉ.షాఢ",
            "రోహిణి / హస్త / శ్రవణం",
            "మృగశిర / చిత్త / ధనిష్ఠ",
            "ఆరుద్ర / స్వాతి / శతభిషం",
            "పునర్వసు / విశాఖ / పూ.భాద్ర",
            "పుష్యమి / అనూరాధ / ఉ.భాద్ర",
            "ఆశ్లేష / జ్యేష్ఠ / రేవతి"
          ],
          rows: [
            ["అశ్విని / మఖ / మూల", "రవి 1", "బుధ 2", "రాహు 3", "గురు 4", "కేతు 5", "చంద్ర 6", "శని 7", "శుక్ర 8", "కుజ 9"],
            ["భరణి / పుబ్బ / పూ.షాఢ", "కుజ 9", "రవి 1", "బుధ 2", "రాహు 3", "గురు 4", "కేతు 5", "చంద్ర 6", "శని 7", "శుక్ర 8"],
            ["కృత్తిక / ఉత్తర / ఉ.షాఢ", "శుక్ర 8", "కుజ 9", "రవి 1", "బుధ 2", "రాహు 3", "గురు 4", "కేతు 5", "చంద్ర 6", "శని 7"],
            ["రోహిణి / హస్త / శ్రవణం", "శని 7", "శుక్ర 8", "కుజ 9", "రవి 1", "బుధ 2", "రాహు 3", "గురు 4", "కేతు 5", "చంద్ర 6"],
            ["మృగశిర / చిత్త / ధనిష్ఠ", "చంద్ర 6", "శని 7", "శుక్ర 8", "కుజ 9", "రవి 1", "బుధ 2", "రాహు 3", "గురు 4", "కేతు 5"],
            ["ఆరుద్ర / స్వాతి / శతభిషం", "కేతు 5", "చంద్ర 6", "శని 7", "శుక్ర 8", "కుజ 9", "రవి 1", "బుధ 2", "రాహు 3", "గురు 4"],
            ["పునర్వసు / విశాఖ / పూ.భాద్ర", "గురు 4", "కేతు 5", "చంద్ర 6", "శని 7", "శుక్ర 8", "కుజ 9", "రవి 1", "బుధ 2", "రాహు 3"],
            ["పుష్యమి / అనూరాధ / ఉ.భాద్ర", "రాహు 3", "గురు 4", "కేతు 5", "చంద్ర 6", "శని 7", "శుక్ర 8", "కుజ 9", "రవి 1", "బుధ 2"],
            ["ఆశ్లేష / జ్యేష్ఠ / రేవతి", "బుధ 2", "రాహు 3", "గురు 4", "కేతు 5", "చంద్ర 6", "శని 7", "శుక్ర 8", "కుజ 9", "రవి 1"]
          ]
        }
      ],
      bottomContent: [
        { heading: "తారాబలముల పట్టిక", text: "1) జన్మతార (అశుభం), 2) సంపత్తార (శుభం), 3) విపత్తార (అశుభం), 4) క్షేమతార (శుభం), 5) ప్రత్యక్తార (అశుభం), 6) సాధనతార (శుభం), 7) నైధనతార (అశుభం), 8) మిత్రతార (శుభం), 9) పరమమిత్రతార (శుభం)." },
        { heading: "చంద్రబలము నియమములు", text: "• శుక్లపక్షములో: మీ జన్మరాశికి 2-5-9 స్థానాలలో ఉన్న చంద్రుడు శుభుడు.\n• కృష్ణపక్షములో: 4-8-12 స్థానాలలో ఉన్న చంద్రుడు శుభుడు.\n• ఉభయ పక్షములందు: 1-3-6-7-10-11 రాశులయందు ఉన్న చంద్రుడు అత్యంత శుభుడు మరియు బలవంతుడు." }
      ]
    },
    "trees": {
      title: "చెట్లు",
      subtitle: "వాస్తుశాస్త్రంలో చెట్లు మరియు మొక్కల విధివిధానాలు.",
      paragraphs: [
        "ఉద్యానవనములు, చిన్నచిన్న పొదలు ఆవరణలో నిర్మించుటకు తూర్పు ఉత్తర దిశల యందు ఏర్పాటు చేసి కొనవలెను. తగు మాత్రముగా దక్షిణ, పడమర, స్థలముల యందు కూడా ఏర్పాటు చేసుకోవచ్చును.",
        "బలమైనచేట్లు నైరుతి, దక్షిణ పడమరలలో ఉండునట్లు చూసు కొనవలెను. తూర్పు, ఈశాన్య, ఉత్తర ములయందు బలమైన చెట్లు, వృక్షములు ఉండుట అనుకూలము కాదు."
      ],
    },
    "gruharambham": {
      title: "గృహారంభం",
      subtitle: "నూతన గృహ నిర్మాణ ప్రారంభమునకు సంబంధించిన ముఖ్యమైన విషయాలు.",
      paragraphs: [
        "నూతన గృహ నిర్మాణమును ప్రారంభించుటకు ముందు చేయు శంకుస్థాపనను గృహారంభం అంటారు.",
        "శ్రేయస్సు, శాంతి మరియు దీర్ఘాయువు కోసం శుభ ముహూర్తమునందే గృహారంభ పూజ మరియు శంకుస్థాపన జరుపవలెను."
      ],
    },
    "gruhapravesam": {
      title: "గృహప్రవేశం",
      subtitle: "నూతన గృహములోనికి ప్రవేశించునప్పుడు జరుపుకొను పవిత్ర కార్యక్రమము.",
      paragraphs: [
        "గృహ నిర్మాణం పూర్తయిన తర్వాత నూతన గృహంలోనికి తొలిసారి ప్రవేశించు శుభకార్యమును గృహప్రవేశం అంటారు.",
        "శాస్త్రోక్తంగా వాస్తు పూజ, కలశ స్థాపన, క్షీరాభిషేకం (పాలు పొంగించడం) మరియు హారతి జరిపించుట ద్వారా గృహంలో ధనాత్మక శక్తి వ్యాపిస్తుంది."
      ],
    },
  },
  Hindi: {
    "kitchen": {
      title: "रसोईघर",
      subtitle: "रसोईघर लेआउट",
      paragraphs: [
        "सभी निर्माणों में, रसोईघर को दक्षिण-पूर्व कोने में स्थापित किया जाना चाहिए, जो अग्नि (आग्नेय) का स्थान है।",
        "रसोईघर कभी भी उत्तर-पश्चिम में स्थापित नहीं किया जाना चाहिए, जिसे दक्षिण-पूर्व के लिए शत्रु स्थान माना जाता है।",
        "यदि दक्षिण-पूर्व संभव नहीं है, तो रसोईघर को दक्षिण, दक्षिण-पश्चिम या पूर्व दिशाओं में स्थापित किया जा सकता है।"
      ],
    },
    "bedroom": {
      title: "बेडरूम",
      subtitle: "बेडरूम लेआउट",
      paragraphs: [
        "घर में बेडरूम दक्षिण, दक्षिण-पश्चिम, पश्चिम और उत्तर-पश्चिम दिशाओं में होने चाहिए। मास्टर बेडरूम हमेशा दक्षिण-पश्चिम दिशा में होना चाहिए।",
        "बच्चों के बेडरूम पश्जिम, दक्षिण और उत्तर-पश्जिम दिशाओं में होने चाहिए। गेस्ट बेडरूम दक्षिण-पूर्व में भी हो सकते हैं।"
      ]
    },
    "soil-testing": {
      title: "मట్టి పరీక్ష",
      subtitle: "నిర్మాణానికి నేల అనుకూలంగా ఉందో లేదో తెలుసుకోవడానికి మట్టి పరీక్ష చేయాలి.",
      paragraphs: ["మట్టి పరీక్షను 4 విధాలుగా చేయాలి:"],
      bottomContent: [
        { heading: "1. రంగు పరీక్ష", text: "తెలుపు, ఎరుపు, పసుపు, నలుపు రంగుల నేల అన్ని రకాల నిర్మాణాలకు అనుకూలం." },
        { heading: "2. వాసన పరీక్ష", text: "ఆహ్లాదకరమైన సువాసన మరియు వాతావరణం కలిగిన నేల శుభప్రదం." },
        { heading: "3. రుచి పరీక్ష", text: "తీపి, పులుపు, లేదా వగరు రుచి కలిగిన నేల అనుకూలం." },
        { heading: "4. స్పర్శ పరీక్ష", text: "నేలను తాకినప్పుడు మృదువుగా, తేలికగా లేదా బరువుగా అనిపిస్తే ఆ నేల శుభప్రదం." }
      ]
    },
        "vargu": {
      title: "\u0935\u0930\u094d\u0917 \u0928\u093f\u0930\u094d\u0923\u092f",
      subtitle: "नाम के पहले अक्षर के अनुसार वर्ग का निर्धारण किया जाना चाहिए।",
      paragraphs: ["नाम के पहले अक्षर के अनुसार वर्ग का निर्धारण किया जाना चाहिए।"],
      multiColumnTables: [
        {
          headers: ["क्र.सं.", "दिशा", "वर्ग", "नाम का पहला अक्षर"],
          rows: [
            ["1", "पूर्व", "'अ'", "अ, आ, इ, ई, उ, ऊ, ऋ, ॠ, ए, ऐ, ओ, औ"],
            ["2", "दक्षिण-पूर्व", "'क'", "क, ख, ग, घ, ङ"],
            ["3", "दक्षिण", "'च'", "च, छ, ज, झ, ञ"],
            ["4", "दक्षिण-पश्चिम", "'ट'", "ट, ठ, ड, ढ, ण"],
            ["5", "पश्चिम", "'त'", "त, थ, द, ध, न"],
            ["6", "उत्तर-पश्चिम", "'प'", "प, फ, ब, भ, म"],
            ["7", "उत्तर", "'य'", "य, र, ल, व"],
            ["8", "उत्तर-पूर्व", "'श'", "श, ष, स, ह"]
          ]
        }
      ],
      bottomContent: [
        { heading: "", text: "नाम के पहले अक्षर वाले वर्ग को 'स्ववर्ग' कहा जाता है जो अत्यधिक अनुकूल, मजबूत और उत्कृष्ट होता है।\n\nसंयुक्ताक्षरों के मामले में, अंतिम व्यंजन पर विचार किया जाना चाहिए। उदाहरण: श्री - श् + र् + ई - 'य' वर्ग\n\nस्ववर्ग से 5वां वर्ग शत्रु वर्ग है। यह मृत्यु तुल्य कष्ट, खराब स्वास्थ्य, नुकसान और वित्तीय कठिनाइयों का कारण बनता है। इसे छोड़ दिया जाना चाहिए।\n\n③ शेष मित्र वर्ग सकारात्मक परिणाम देते हैं, और वित्तीय लाभ लाते हैं।" },
        { heading: "", text: "पूर्व, दक्षिण-पूर्व — पूर्व दिशा\nदक्षिण, दक्षिण-पश्चिम — दक्षिण दिशा\nपश्चिम, उत्तर-पश्चिम — पश्चिम दिशा\nउत्तर, उत्तर-पूर्व — उत्तर दिशा\nके रूप में माना जाना चाहिए।" },
        { heading: "", text: "संपूर्ण विवरण के लिए, कृपया एक सिद्धांत (वास्तु विशेषज्ञ) से परामर्श लें।" }
      ]
    },
    "main-entrance": {
      title: "मुख्य द्वार",
      subtitle: "मुख्य द्वार मालिकों के आने और जाने के लिए प्राथमिक द्वार है।",
      paragraphs: [
        "मुख्य द्वार घर का चेहरा है। यह मालिकों के आने और जाने के लिए प्राथमिक द्वार है, जो शाही जीवन को दर्शाता है। यह घर में अधिक महिमा जोड़ता है।",
        "यह निर्माण में अन्य सभी दरवाजों की तुलना में ऊंचाई और चौड़ाई में बड़ा होना चाहिए।"
      ],
      multiColumnTables: [
        {
                    headers: ["नाम का पहला अक्षर", "वर्ग", "दिशा", "उपयुक्त मुख्य द्वार", "अनुपयुक्त मुख्य द्वार"],
          rows: [
            ["1. अ से अः", "अ", "पूर्व", "पश्चिम, उत्तर, दक्षिण", "पूर्व"],
            ["2. क, ख, ग, घ, ङ", "क", "दक्षिण-पूर्व", "पश्चिम, उत्तर, दक्षिण", "पूर्व"],
            ["3. च, छ, ज, झ, ञ", "च", "दक्षिण", "उत्तर, पूर्व, पश्चिम", "दक्षिण"],
            ["4. ट, ठ, ड, ढ, ण", "ट", "दक्षिण-पश्चिम", "उत्तर, पूर्व, पश्चिम", "दक्षिण"],
            ["5. त, थ, द, ध, न", "त", "पश्चिम", "पूर्व, उत्तर, दक्षिण", "पश्चिम"],
            ["6. प, फ, ब, भ, म", "प", "उत्तर-पश्चिम", "पूर्व, उत्तर, दक्षिण", "पश्चिम"],
            ["7. य, र, ल, व", "य", "उत्तर", "दक्षिण, पूर्व, पश्चिम", "उत्तर"],
            ["8. श, ष, स, ह", "श", "उत्तर-पूर्व", "दक्षिण, पूर्व, पश्चिम", "उत्तर"]
          ]
        }
      ]
    },
    "plot-shapes": {
      title: "भूखंड के आकार",
      subtitle: "निर्माण के लिए भूखंड का आकार आवश्यक है।",
      paragraphs: [
        "विश्वकर्मा के अनुसार 'चतुरश्रे धनागमम'...",
        "सभी घर और भवन निर्माण के लिए चौकोर, आयताकार और गोलाकार भूखंडों का चयन किया जाना चाहिए।"
      ],
      multiColumnTables: [
        {
          headers: ["संख्या - अक्षर", "भूखंड का नाम / दिशा", "सड़क का विवरण"],
          rows: [
            ["1. अ", "पूर्व भूखंड", "पश्चिम सड़क वाला"],
            ["2. क", "दक्षिण-पूर्व भूखंड", "दक्षिण-पूर्व सड़क वाला"],
            ["3. च", "रक्षिकास्थम", "दक्षिण सड़क वाला"],
            ["4. ट", "-", "दक्षिण-पश्चिम सड़क वाला"],
            ["5. त", "वादम्मासनम", "पश्चिम सड़क वाला"],
            ["6. प", "उत्तर-पश्चिम भूखंड", "उत्तर-पश्चिम सड़क वाला"],
            ["7. य", "उत्तर भूखंड", "उत्तर सड़क वाला"],
            ["8. श", "उत्तर-पूर्व भूखंड", "उत्तर-पूर्व सड़क वाला"]
          ]
        }
      ],
      bottomContent: [
        { text: "उन संबंधित वर्गों के लोगों को निर्माण के लिए अपने स्वयं के वर्ग और अनुकूल वर्गों के भूखंडों का चयन करना चाहिए।" }
      ]
    },
    "shanku-sthapana": {
      title: "शंकु स्थापना",
      subtitle: "वास्तु पुरुष की नाभि पर किया जाने वाला महत्वपूर्ण अनुष्ठान",
      paragraphs: [
        "वास्तु शास्त्रों के अनुसार 'शंकु स्थापना' वास्तु पुरुष की नाभि पर की जानी चाहिए।",
        "सभी घर निर्माण के लिए शंकु को शिल्प शास्त्र के अनुसार बनाया जाना चाहिए।",
        "घर के मालिक को अपनी पत्नी के साथ उचित अनुष्ठान करके शंकु की स्थापना करनी चाहिए।"
      ],
      multiColumnTables: [
        {
          title: "घर निर्माण के लिए महीने",
          headers: ["क्र.सं.", "महीना", "परिणाम"],
          rows: [
            ["1", "चैत्र", "धन"],
            ["2", "वैशाख", "समृद्धि"],
            ["3", "ज्येष्ठ", "घातक"],
            ["4", "आषाढ़", "धन की हानि"],
            ["5", "श्रावण", "धन"],
            ["6", "भाद्रपद", "बीमारी का डर"],
            ["7", "आश्वयुज", "संघर्ष"],
            ["8", "कार्तिक", "वित्तीय लाभ"],
            ["9", "मार्गशीर्ष", "अनाज"],
            ["10", "पुष्य", "पशुओं की हानि"],
            ["11", "माघ", "वंश वृद्धि"],
            ["12", "फाल्गुन", "वित्तीय लाभ"]
          ]
        },
        {
          title: "शंकु स्थापना के लिए महीना निर्धारण",
          headers: ["क्र.", "महीना", "मासिक परिणाम", "करने योग्य द्वार", "न करने योग्य द्वार"],
          rows: [
            ["1", "फाल्गुन", "लक्ष्मी की वृद्धि", "पूर्व, उत्तर", "पश्चिम, दक्षिण"],
            ["2", "चैत्र", "बीमारी का डर", "पूर्व, उत्तर", "पश्चिम, दक्षिण"],
            ["3", "वैशाख", "धन का लाभ", "पूर्व, उत्तर", "पश्चिम, दक्षिण"],
            ["4", "ज्येष्ठ", "मृत्यु", "पूर्व, दक्षिण", "पश्चिम, उत्तर"],
            ["5", "आषाढ़", "नौकर का लाभ", "पूर्व, दक्षिण", "पश्चिम, उत्तर"],
            ["6", "श्रावण", "मित्र का लाभ", "पूर्व, दक्षिण", "पश्चिम, उत्तर"],
            ["7", "भाद्रपद", "नुकसान", "पश्चिम, दक्षिण", "पूर्व, उत्तर"],
            ["8", "आश्वयुज", "युद्ध का डर", "पश्चिम, दक्षिण", "पूर्व, उत्तर"],
            ["9", "कार्तिक", "धन का लाभ", "पश्चिम, दक्षिण", "पूर्व, उत्तर"],
            ["10", "मार्गशीर्ष", "धन वृद्धि", "पश्चिम, उत्तर", "पूर्व, दक्षिण"],
            ["11", "पुष्य", "चोरों का डर", "पश्चिम, उत्तर", "पूर्व, दक्षिण"],
            ["12", "माघ", "आग का डर", "पश्चिम, उत्तर", "पूर्व, दक्षिण"]
          ]
        }
      ]
    },
    "bathroom": {
      title: "वास्तु शास्त्र के अनुसार बाथरूम और शौचालय",
      subtitle: "बाथरूम और शौचालय",
      paragraphs: [
        "वास्तु के अनुसार, शौचालय दक्षिण-पश्चिम, उत्तर-पश्चिम, पश्चिम या दक्षिण दिशाओं में होने चाहिए। हालाँकि, चूँकि अटैच्ड बाथरूम अक्सर आवश्यक होते हैं, उन्हें दक्षिण, दक्षिण-पश्चिम, पश्चिम और उत्तर-पश्चिम दिशाओं में बेडरूम से अटैच करके बनाया जा सकता है।",
        "बाथरूम (बिना शौचालय के) पूर्व और उत्तर दिशाओं में भी हो सकते हैं।"
      ],
    },
    "pooja-room": {
      title: "पूजा कक्ष",
      subtitle: "पूजा कक्ष लेआउट",
      paragraphs: [
        "पूजा कक्ष या पूजा मंदिर घर के उत्तर-पूर्व में स्थापित किया जाना चाहिए। इसे पूर्व या उत्तर दिशाओं में भी स्थापित किया जा सकता है।",
        "देवता की पीठ (वेदी) का मुख पश्चिम या दक्षिण की ओर होना चाहिए ताकि हम पूजा करते समय पूर्व या उत्तर की ओर मुख करें।",
        "पूजा कक्ष को देवताओं के चित्रों और दिव्य वस्तुओं से भरा होना चाहिए, जिससे आध्यात्मिक तेज बढ़े और मन को शांति मिले। पुरानी वस्तुएं, बचा हुआ सामान और अन्य भारी वस्तुएं पूजा कक्ष में नहीं रखी जानी चाहिए।"
      ],
    },
    "dining-room": {
      title: "भोजन कक्ष",
      subtitle: "डाइनिंग टेबल लेआउट",
      paragraphs: [
        "विश्वकर्म प्रकाशिका जैसे वास्तु शास्त्रों के अनुसार, भोजन कक्ष पश्चिम में स्थापित किया जाना चाहिए। इसलिए, भोजन कक्ष को पश्चिम दिशा में स्थापित करना सबसे अच्छा है।",
        "आवश्यकता के अनुसार, भोजन कक्ष को पूर्व, दक्षिण, दक्षिण-पूर्व या उत्तर-पूर्व दिशाओं में भी स्थापित किया जा सकता है।"
      ],
    },
    "staircase": {
      title: "सीढ़ियाँ और लिफ्ट",
      subtitle: "सीढ़ी लेआउट",
      paragraphs: [
        "ऊपरी मंजिल पर जाने के लिए सीढ़ियां (Staircase) बनाना अनिवार्य है। यदि सीढ़ियां चढ़ते समय दक्षिणावर्त (Pradakshina) दिशा में ऊपर जाती हैं, तो यह लाभदायक है।",
        "निर्माण की दिशा के आधार पर, सीढ़ियां दक्षिण-पूर्व, दक्षिण-पश्चिम, या उत्तर-पश्चिम दिशाओं में स्थापित की जानी चाहिए।",
        "यदि लिफ्ट स्थापित कर रहे हैं, तो इसे दक्षिण-पूर्व या उत्तर-पश्चिम दिशाओं में स्थापित किया जाना चाहिए। दक्षिण-पश्चिम में लिफ्ट कभी स्थापित नहीं करनी चाहिए।"
      ],
    },
    "parking": {
      title: "पार्किंग",
      subtitle: "पार्किंग लेआउट",
      paragraphs: [
        "वाहनों को खड़ा करने के लिए पार्किंग एक बहुत ही आवश्यक स्थान है। प्रत्येक निर्माण के लिए, पार्किंग को पूर्व या उत्तर भागों में स्थापित किया जाना चाहिए।",
        "जब भूमिगत पार्किंग (Underground parking) प्रदान करने की बात आती है, तो यह फायदेमंद है कि दक्षिण-पश्चिम से प्रवेश न हो।"
      ],
    },
    "borewell": {
      title: "पानी की टंकी और बोरवेल",
      subtitle: "पानी की टंकी और बोरवेल लेआउट",
      paragraphs: [
        "आमतौर पर, बोरवेल और नल उत्तर-पूर्व भाग में स्थापित किए जाने चाहिए।",
        "उत्तर-पूर्व में पानी भरना और उत्तर-पूर्व से बाहर निकाला जाना एक बहुत ही स्वस्थ वास्तु विशेषता है।",
        "केवल ओएचटी (ओवर हेड टैंक) के मामले में, वजन और आकार के आधार पर, ओ.एच. टैंक को घर के ऊपर दक्षिण-पश्चिम, दक्षिण या पश्चिम दिशाओं में स्थापित किया जाना चाहिए।"
      ],
    },
    "septic-tank": {
      title: "सेप्टिक टैंक",
      subtitle: "सेप्टिक टैंक लेआउट",
      paragraphs: [
        "सेप्टिक टैंक अस्वस्थता का कारण है, और आधुनिक वास्तु में इसे सावधानी से शामिल किया गया है। चूंकि इसमें गड्ढा खोदना शामिल है, इसलिए उत्तर-पश्चिम भाग हर तरह से अनुकूल है। आवश्यकता के आधार पर, इसे उत्तर, पूर्व या दक्षिण-पूर्व दिशाओं में भी स्थापित किया जा सकता है।",
        "किसी भी परिस्थिति में दक्षिण-पश्चिम, पश्चिम, दक्षिण या उत्तर-पूर्व दिशाओं में सेप्टिक टैंक स्थापित नहीं किया जाना चाहिए।"
      ],
    },
    "veedi-potlu": {
      title: "वीधी पोट्लु",
      subtitle: "वीधी पोट्लु किसी स्थल की शुभता और अशुभता को निर्धारित करने में प्रमुख भूमिका निभाते हैं।",
      paragraphs: [
        "वीधी पोट्लु किसी स्थल की शुभता और अशुभता को निर्धारित करने में प्रमुख भूमिका निभाते हैं।",
        "(पोट्लु) यह स्थल सभी प्रकार से अनुकूल है। पोट्लु वाले स्थल उत्तर, उत्तर-पूर्व और पश्चिम में केंद्र के रूप में कार्य करते हुए कई अनुकूलताएँ लाते हैं।",
        "पूर्व, पश्चिम, दक्षिण-पूर्व, उत्तर-पश्चिम और दक्षिण-पश्चिम में केंद्र के रूप में कार्य करने वाले स्वास्थ्य समस्याओं और वित्तीय नुकसान का कारण बनते हैं।"
      ],
    },
    "faq": {
      title: "सामान्य प्रश्न",
      subtitle: "श्री वास्तु ऐप के बारे में सामान्य प्रश्न, यह कैसे काम करता है।",
      paragraphs: [
        "ఆ విశ్వకర్మ శాస్త్ర సర్వస్వం ఒక ప్రొఫెషనల్ వాస్తు శాస్త్ర విశ్లేషణ అప్లికేషన్."
      ],
    },
    "contact": {
      title: "संपर्क करें",
      subtitle: "समर्थन, परामर्श या आवेदन के बारे में किसी भी प्रश्न के लिए श्री वास्तु टीम से संपर्क करें।",
      paragraphs: [
        "हम श्री वास्तु एप्लिकेशन के बारे में सभी पूछताछ का स्वागत करते हैं। चाहे वे कैलकुलेटर की कार्यक्षमता या पीडीएफ रिपोर्ट सिस्टम से संबंधित हों। हमारी टीम सटीक प्रतिक्रिया प्रदान करने के लिए प्रतिबद्ध है।",
        "पेशेवर वास्तु परामर्श सेवाओं के लिए, अनुभवी वास्तु चिकित्सकों की हमारी टीम व्यक्तिगत नियुक्तियों के लिए उपलब्ध है। एक पेशेवर परामर्श आपकी साइट की पूर्ण जटिलता को ध्यान में रखता है।",
        "हमसे संपर्क करने के लिए हमारा फोन नंबर, ईमेल और कार्यालय का पता नीचे दिया गया है। आप आसानी से हम तक पहुंच सकते हैं। हम आपकी सहायता के लिए हमेशा तैयार हैं।"
      ],
    },
    "about": {
      title: "विश्वकर्मा वास्तु सर्वस्वम",
      subtitle: "विश्वकर्मा वास्तु सर्वस्वम के बारे में",
      paragraphs: [
        "यह \"विश्वकर्मा वास्तु सर्वस्वम\" ऐप बहुत ही सरल शैली में विकसित किया गया है, जिसमें विश्वकर्मा प्रकाशिका, मयमतम, अपराजिता पृच्छा, समरांगण सूत्रधारम, और मनुष्यालय चंद्रिका जैसे प्राचीन वास्तु शास्त्र ग्रंथों से कुछ वैज्ञानिक रहस्य और विशेषताएं एकत्र की गई हैं, ताकि यह आम लोगों, सिद्धांतियों और वास्तु शास्त्र शोधकर्ताओं के लिए उपयोगी हो सके।",
        "पारंपरिक वास्तु प्रथाओं, भारतीय संस्कृति और परंपराओं की रक्षा करने के उद्देश्य से, \"विश्वकर्मा वास्तु सर्वस्वम\" पुस्तक जल्द ही लॉन्च की जा रही है।",
        "सुझाव, सलाह और संपर्क के लिए | लेखक की प्रतिभा को बढ़ाने के लिए आवश्यक वास्तु सिद्धांतियों से संपर्क करें..."
      ],
    },
    "trees": {
      title: "पेड-पौधे",
      subtitle: "वास्तु शास्त्र में पेड-पौधों के नियम.",
      paragraphs: [
        "उद्यान और छोटी-छोटी झाड़ियाँ आवरण में पूर्व और उत्तर दिशाओं में लगानी चाहिए। दक्षिण और पश्चिम दिशाओं में भी उचित मात्रा में लगाई जा सकती हैं।",
        "मजबूत पेड़ नैऋत्य, दक्षिण और पश्चिम दिशाओं में रहें यह सुनिश्चित करना चाहिए। पूर्व, ईशान और उत्तर दिशाओं में मजबूत पेड़ और वृक्ष होना अनुकूल नहीं है।"
      ],
    },
    "soil-testing": {
      title: "मिट्टी परीक्षण",
      subtitle: "निर्माण के लिए भूमि अनुकूल है या नहीं, यह सुनिश्चित करने के लिए मिट्टी का परीक्षण किया जाना चाहिए।",
      paragraphs: ["मिट्टी का परीक्षण 4 तरीकों से किया जाना चाहिए:"],
      bottomContent: [
        { heading: "1. रंग परीक्षण", text: "सफेद, लाल, पीला और काले रंग की भूमि सभी प्रकार के निर्माण के लिए उपयुक्त है।" },
        { heading: "2. गंध परीक्षण", text: "सुखद सुगंध और आनंदमय वातावरण वाली भूमि शुभ है।" },
        { heading: "3. स्वाद परीक्षण", text: "मीठा, खट्टा या कसैला स्वाद वाली भूमि अनुकूल है।" },
                { heading: "4. स्पर्श परीक्षण", text: "यदि चुनी गई भूमि को छूने पर वह नरम, हल्की या भारी लगती है तो वह शुभ है।" },
        { heading: "निषिद्ध भूमि", text: "1. श्मशान भूमि\n2. वह स्थान जहाँ मंदिर था (और हटा दिया गया)\n3. मंदिर की अतिक्रमित भूमि\n4. दीमक की बांबी वाली भूमि\n5. वह भूमि जहाँ हमेशा पानी रहता है (दलदली भूमि)\n6. खारी / बंजर भूमि\n7. हड्डियों, कोयले या राख वाली भूमि\n8. कुम्हार के भट्ठे वाली भूमि\n9. तेल मिलों वाली भूमि\n10. तालाबों/झीलों को भरकर बनाई गई भूमि" },
        { heading: "", text: "सभी प्रकार के निर्माणों के लिए ऐसी भूमि से बचना चाहिए।\n\nसंपूर्ण विवरण के लिए, कृपया एक सिद्धांत (वास्तु विशेषज्ञ) से परामर्श लें।" }
      ]
    },
    "vargu": {
      title: "Vargu Nirnayam",
      subtitle: "Determine your Vargu based on the first letter of your name to check compatibility with directions.",
      paragraphs: ["Determine your Vargu based on the first letter of your name (Namadyaksharam)."],
      tableData: [
        { label: "1", formula: "a, aa, i, ee...", value: "East" },
        { label: "2", formula: "ka, kha, ga, gha...", value: "South-East" },
        { label: "3", formula: "cha, chha, ja, jha...", value: "South" },
        { label: "4", formula: "ta, tha, da, dha...", value: "South-West" },
        { label: "5", formula: "ta, tha, da, dha, na...", value: "West" },
        { label: "6", formula: "pa, pha, ba, bha, ma...", value: "North-West" },
        { label: "7", formula: "ya, ra, la, va...", value: "North" },
        { label: "8", formula: "sha, sha, sa, ha...", value: "North-East" }
      ],
      bottomContent: [
        { heading: "Important Rules", text: "The Vargu containing the first letter of the name is called 'Swavargu' and is highly favorable. In conjunct consonants, the last consonant should be considered. The 5th Vargu from Swavargu is the enemy (Shatru) Vargu and must be avoided. Other friendly Vargus (Mitra Vargu) yield positive results." },
        { heading: "Direction Groupings", text: "• South, South-East - South direction\n• West, South-West - West direction\n• North, North-West - North direction\n• East, North-East - East direction" }
      ]
    },
    "tara-chandra-chakra": {
      title: "ताराबल - चंद्रबल गणना चक्र",
      subtitle: "दिनाधिपति, ताराबल और चंद्रबल गणना चक्र",
      paragraphs: [
        "👉 दाईं ओर इशारा करने वाला तीर (→) पंचांग में नक्षत्र (दैनिक नक्षत्र) को दर्शाता है।\n👇 नीचे की ओर इशारा करने वाला तीर (↓) आपका जन्म या नाम नक्षत्र दर्शाता है।",
        "दिनाधिपति - दिन का नक्षत्र या जन्म नक्षत्र बदलते ही दिनाधिपति बदल जाता है।"
      ],
      multiColumnTables: [
        {
          title: "दिनाधिपति, ताराबल और चंद्रबल गणना तालिका",
          headers: [
            "जन्म नक्षत्र \\ दैनिक नक्षत्र",
            "अश्विनी / मघा / मूल",
            "भरणी / पूर्वा फाल्गुनी / पूर्वाषाढ़ा",
            "कृत्तिका / उत्तरा फाल्गुनी / उत्तराषाढ़ा",
            "रोहिणी / हस्त / श्रवण",
            "मृगशीर्षा / चित्रा / धनिष्ठा",
            "आर्द्रा / स्वाति / शतभीषा",
            "पुनर्वसु / विशाखा / पूर्वा भाद्रपद",
            "पुष्य / अनुराधा / उत्तरा भाद्रपद",
            "आश्लेषा / ज्येष्ठा / रेवती"
          ],
          rows: [
            ["अश्विनी / मघा / मूल", "सूर्य 1", "बुध 2", "राहु 3", "गुरु 4", "केतु 5", "चंद्र 6", "शनि 7", "शुक्र 8", "मंगल 9"],
            ["भरणी / पूर्वा फाल्गुनी / पूर्वाषाढ़ा", "मंगल 9", "सूर्य 1", "बुध 2", "राहु 3", "गुरु 4", "केतु 5", "चंद्र 6", "शनि 7", "शुक्र 8"],
            ["कृत्तिका / उत्तरा फाल्गुनी / उत्तराषाढ़ा", "शुक्र 8", "मंगल 9", "सूर्य 1", "बुध 2", "राहु 3", "गुरु 4", "केतु 5", "चंद्र 6", "शनि 7"],
            ["रोहिणी / हस्त / श्रवण", "शनि 7", "शुक्र 8", "मंगल 9", "सूर्य 1", "बुध 2", "राहु 3", "गुरु 4", "केतु 5", "चंद्र 6"],
            ["मृगशीर्षा / चित्रा / धनिष्ठा", "चंद्र 6", "शनि 7", "शुक्र 8", "मंगल 9", "सूर्य 1", "बुध 2", "राहु 3", "गुरु 4", "केतु 5"],
            ["आर्द्रा / स्वाति / शतभीषा", "केतु 5", "चंद्र 6", "शनि 7", "शुक्र 8", "मंगल 9", "सूर्य 1", "बुध 2", "राहु 3", "गुरु 4"],
            ["पुनर्वसु / विशाखा / पूर्वा भाद्रपद", "गुरु 4", "केतु 5", "चंद्र 6", "शनि 7", "शुक्र 8", "मंगल 9", "सूर्य 1", "बुध 2", "राहु 3"],
            ["पुष्य / अनुराधा / उत्तरा भाद्रपद", "राहु 3", "गुरु 4", "केतु 5", "चंद्र 6", "शनि 7", "शुक्र 8", "मंगल 9", "सूर्य 1", "बुध 2"],
            ["आश्लेषा / ज्येष्ठा / रेवती", "बुध 2", "राहु 3", "गुरु 4", "केतु 5", "चंद्र 6", "शनि 7", "शुक्र 8", "मंगल 9", "सूर्य 1"]
          ]
        }
      ],
      bottomContent: [
        { heading: "ताराबल तालिका", text: "1) जन्म तारा (अशुभ), 2) सम्पत तारा (शुभ), 3) विपत तारा (अशुभ), 4) क्षेम तारा (शुभ), 5) प्रत्यक तारा (अशुभ), 6) साधन तारा (शुभ), 7) नैधन तारा (अशुभ), 8) मित्र तारा (शुभ), 9) परम मित्र तारा (शुभ)।" },
        { heading: "चंद्रबल के नियम", text: "• शुक्ल पक्ष: आपकी जन्म राशि से 2, 5, 9 वें भाव में स्थित चंद्रमा शुभ है।\n• कृष्ण पक्ष: आपकी जन्म राशि से 4, 8, 12 वें भाव में स्थित चंद्रमा शुभ है।\n• दोनों पक्ष: 1, 3, 6, 7, 10, 11 वें भाव में चंद्रमा का होना अत्यंत शुभ व बलशाली माना जाता है।" }
      ]
    },
    "gruharambham": {
      title: "गृह आरंभ",
      subtitle: "नए गृह निर्माण की शुरुआत के लिए शुभ समय और नियम।",
      paragraphs: [
        "नया घर बनाने से पहले की जाने वाली नींव पूजा (शिलान्यास) को गृह आरंभ कहा जाता है।",
        "घर के सुख-समृद्धि, शांति और दीर्घायु के लिए शुभ मुहूर्त में ही गृह आरंभ पूजा करनी चाहिए।"
      ],
    },
    "gruhapravesam": {
      title: "गृह प्रवेश",
      subtitle: "नए घर में प्रवेश करते समय किया जाने वाला पवित्र गृहप्रवेश समारोह।",
      paragraphs: [
        "नए या पुनर्निर्मित घर में प्रवेश करने से पहले की जाने वाली पवित्र गृहप्रवेश पूजा सुख-शांति लाती है।",
        "शास्त्रोक्त विधि से वास्तु पूजा, कलश पूजन और दूध उबालने से घर में सकारात्मक ऊर्जा का संचार होता है।"
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
  const localizedPages = guideTranslations[language];

  return basePages.map((page) => {
    const localized = localizedPages?.[page.key];

    if (!localized) {
      return page;
    }

    return {
      ...page,
      title: localized.title || page.title,
      subtitle: localized.subtitle || page.subtitle,
      paragraphs: localized.paragraphs || page.paragraphs,
      tableData: localized.tableData || page.tableData,
      multiColumnTables: localized.multiColumnTables || page.multiColumnTables,
      bottomContent: localized.bottomContent || page.bottomContent,
    };
  });
};
