import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
  Modal
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palette } from '@/constants/theme';
import { useAppLanguage } from '@/context/AppLanguageContext';
import { getAppStrings } from '@/i18n/strings';
import { ScreenHeader } from '@/components/ScreenHeader';

const { width } = Dimensions.get('window');

// Default Web URLs for fallbacks in PDF
const GANESHA_DEFAULT = 'https://i.imgur.com/6P26c9b.png';
const LAKSHMI_DEFAULT = 'https://i.imgur.com/kP8qQ6r.png';

// 60 Telugu Samvatsaralu exactly from ChatGPT share
const TELUGU_YEARS_CLEAN = [
  "ప్రభవ", "విభవ", "శుక్ల", "ప్రమోదూత", "ప్రజోత్పత్తి", "ఆంగీరస", "శ్రీముఖ", "భావ", "యువ", "ధాత",
  "ఈశ్వర", "బహుధాన్య", "ప్రమాది", "విక్రమ", "వృష", "చిత్రభాను", "స్వభాను", "తారణ", "పార్థివ", "వ్యయ",
  "సర్వజిత్తు", "సర్వధారి", "విరోధి", "వికృతి", "ఖర", "నందన", "విజయ", "జయ", "మన్మథ", "దుర్ముఖి",
  "హేవిళంబి", "విళంబి", "వికారి", "శార్వరి", "ప్లవ", "శుభకృతు", "శోభకృతు", "క్రోధి", "విశ్వావసు", "పరాభవ",
  "ప్లవంగ", "కీలక", "సౌమ్య", "సాధారణ", "విరోధికృతు", "పరిధావి", "ప్రమాదీచ", "ఆనంద", "రాక్షస", "నల",
  "పింగళ", "కాళయుక్తి", "సిద్ధార్థి", "రౌద్రి", "దుర్మతి", "దుందుభి", "రుధిరోద్గారి", "రక్తాక్షి", "క్రోధన", "అక్షయ"
];

// 12 Telugu Masamulu
const TELUGU_MONTHS = [
  "చైత్ర", "వైశాఖ", "జ్యేష్ఠ", "ఆషాఢ", "శ్రావణ", "భాద్రపద",
  "ఆశ్వయుజ", "కార్తీక", "మార్గశిర", "పుష్య", "మాఘ", "ఫాల్గుణ"
];

// 27 Nakshatrams
const NAKSHATRAMS = [
  "అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆరుద్ర",
  "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పుబ్బ", "ఉత్తర",
  "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ", "జ్యేష్ఠ",
  "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం", "ధనిష్ఠ",
  "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"
];

// 7 Telugu Weekdays
const TELUGU_DAYS = [
  "ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"
];

// 30 Telugu Tithis (Shukla & Bahula)
const TELUGU_TITHIS = [
  "శు.పాడ్యమి", "శు.విదియ", "శు.తదియ", "శు.చవితి", "శు.పంచమి", "శు.షష్ఠి", "శు.సప్తమి", "శు.అష్టమి",
  "శు.నవమి", "శు.దశమి", "శు.ఏకాదశి", "శు.ద్వాదశి", "శు.త్రయోదశి", "శు.చతుర్దశి", "పౌర్ణమి",
  "బ.పాడ్యమి", "బ.విదియ", "బ.తదియ", "బ.చవితి", "బ.పంచమి", "బ.షష్ఠి", "బ.సప్తమి", "బ.అష్టమి",
  "బ.నవమి", "బ.దశమి", "బ.ఏకాదశి", "బ.ద్వాదశి", "బ.త్రయోదశి", "బ.చతుర్దశి", "అమావాస్య"
];

// 12 Telugu Lagnas
const TELUGU_LAGNAS = [
  "మేష", "వృషభ", "మిథున", "కర్కాటక", "సింహ", "కన్యా", "తుల", "వృశ్చిక", "ధనుర్", "మకర", "కుంభ", "మీన"
];

const getPatrikaLabels = (lang: string) => {
  if (lang === 'Telugu') {
    return {
      headersSection: 'పత్రిక శీర్షికలు',
      muhurthamSection: 'ముహూర్త వివరాలు',
      imagesSection: 'చిత్రాలు (మార్చడానికి నొక్కండి)',
      contactSection: 'సంప్రదింపు వివరాలు',
      topTitle: 'పై శీర్షిక (Top Title)',
      subhead1: 'ఉపశీర్షిక 1',
      subhead2: 'ఉపశీర్షిక 2',
      subhead3: 'ఉపశీర్షిక 3',
      innerHeader1: 'లోపలి శీర్షిక 1 (డ్రాప్‌డౌన్)',
      innerHeader2: 'లోపలి శీర్షిక 2',
      yearDropdown: 'సంవత్సరం (డ్రాప్‌డౌన్)',
      monthDropdown: 'నెల (డ్రాప్‌డౌన్)',
      tithiDropdown: 'తిథి (డ్రాప్‌డౌన్)',
      dayDropdown: 'వారం (డ్రాప్‌డౌన్)',
      datePick: 'తేదీ (తేదీ ఎంచుకోండి)',
      timePick: 'సమయం (సమయం ఎంచుకోండి)',
      nakshatramDropdown: 'నక్షత్రం (డ్రాప్‌డౌన్)',
      lagnaDropdown: 'లగ్నం (డ్రాప్‌డౌన్)',
      husbandName: 'భర్త పేరు (హోమ్ డిఫాల్ట్)',
      wifeName: 'భార్య పేరు (హోమ్ డిఫాల్ట్)',
      selectGanesha: 'గణపతిని ఎంచుకోండి',
      ganeshaSelected: 'గణపతి ఎంచుకోబడ్డారు ✓',
      selectLakshmi: 'లక్ష్మిని ఎంచుకోండి',
      lakshmiSelected: 'లక్ష్మి ఎంచుకోబడ్డారు ✓',
      phoneNumber: 'ఫోన్ నంబర్',
      selectAvatar: 'ప్రొఫైల్ చిత్రం ఎంచుకోండి',
      avatarSelected: 'చిత్రం ఎంచుకోబడింది ✓',
      downloadPdf: 'పత్రిక PDF డౌన్లోడ్',
      editFields: 'సవరించండి (Edit Fields)',
      viewCard: 'కార్డు చూడండి (View Card)',
      jyothishyalayam: 'జ్యోతిష్యాలయం',
      consultantName: 'సిద్ధాంతి పేరు',
      whatsapp: 'సంప్రదించండి (WhatsApp)',
    };
  }
  if (lang === 'Hindi') {
    return {
      headersSection: 'पत्रिका शीर्षक',
      muhurthamSection: 'मुहूर्त विवरण',
      imagesSection: 'चित्र चयन (बदलने के लिए टैप करें)',
      contactSection: 'संपर्क विवरण',
      topTitle: 'मुख्य शीर्षक',
      subhead1: 'उपशीर्षक 1',
      subhead2: 'उपशीर्षक 2',
      subhead3: 'उपशीर्षक 3',
      innerHeader1: 'आंतरिक शीर्षक 1 (ड्रॉपडाउन)',
      innerHeader2: 'आंतरिक शीर्षक 2',
      yearDropdown: 'वर्ष (ड्रॉपडाउन)',
      monthDropdown: 'महीना (ड्रॉपडाउन)',
      tithiDropdown: 'तिथि (ड्रॉपडाउन)',
      dayDropdown: 'वार / दिन (ड्रॉपडाउन)',
      datePick: 'दिनांक (चुनने के लिए टैप करें)',
      timePick: 'समय (चुनने के लिए टैप करें)',
      nakshatramDropdown: 'नक्षत्र (ड्रॉपडाउन)',
      lagnaDropdown: 'लग्न (ड्रॉपडाउन)',
      husbandName: 'पति का नाम (मुख्य पृष्ठ आधारित)',
      wifeName: 'पत्नी का नाम (मुख्य पृष्ठ आधारित)',
      selectGanesha: 'गणेश चित्र चुनें',
      ganeshaSelected: 'गणेश चित्र चयनित ✓',
      selectLakshmi: 'लक्ष्मी चित्र चुनें',
      lakshmiSelected: 'लक्ष्मी चित्र चयनित ✓',
      phoneNumber: 'फ़ोन नंबर',
      selectAvatar: 'अवतार चित्र चुनें',
      avatarSelected: 'अवतार चयनित ✓',
      downloadPdf: 'पत्रिका पीडीएफ डाउनलोड',
      editFields: 'संपादन करें',
      viewCard: 'कार्ड देखें',
      jyothishyalayam: 'ज्योतिष्यालय',
      consultantName: 'सलाहकार का नाम',
      whatsapp: 'संपर्क करें (WhatsApp)',
    };
  }
  return {
    headersSection: 'Patrika Headers',
    muhurthamSection: 'Muhurtham Details',
    imagesSection: 'Image Selectors (Tap to pick custom)',
    contactSection: 'Contact / Context Info',
    topTitle: 'Top Title',
    subhead1: 'Subhead 1',
    subhead2: 'Subhead 2',
    subhead3: 'Subhead 3',
    innerHeader1: 'Inner Header 1 (Dropdown)',
    innerHeader2: 'Inner Header 2',
    yearDropdown: 'Year (Samvatsaram Dropdown)',
    monthDropdown: 'Month (Masam Dropdown)',
    tithiDropdown: 'Tithi (Dropdown)',
    dayDropdown: 'Day (Dropdown)',
    datePick: 'Date (Tap to Pick)',
    timePick: 'Time (Tap to Pick)',
    nakshatramDropdown: 'Nakshatram (Dropdown)',
    lagnaDropdown: 'Lagna (Dropdown)',
    husbandName: "Husband's Name (Home default)",
    wifeName: "Wife's Name (Home default)",
    selectGanesha: 'Select Ganesha',
    ganeshaSelected: 'Ganesha Selected ✓',
    selectLakshmi: 'Select Lakshmi',
    lakshmiSelected: 'Lakshmi Selected ✓',
    phoneNumber: 'Phone Number',
    selectAvatar: 'Select Avatar',
    avatarSelected: 'Avatar Selected ✓',
    downloadPdf: 'Download Patrika PDF',
    editFields: 'Edit Fields',
    viewCard: 'View Card',
    jyothishyalayam: 'Jyothishyalayam',
    consultantName: 'Consultant Name',
    whatsapp: 'Contact (WhatsApp)',
  };
};

export const PatrikaScreen = () => {
  const { language } = useAppLanguage();
  const strings = getAppStrings(language);
  const labels = getPatrikaLabels(language);

  // Toggle Edit/View Mode
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Form Fields
  const [headerText, setHeaderText] = useState<string>('విశ్వకర్మ వాస్తు సర్వస్వం');
  const [subHeader1, setSubHeader1] = useState<string>('శ్రీరస్తు');
  const [subHeader2, setSubHeader2] = useState<string>('శుభమస్తు');
  const [subHeader3, setSubHeader3] = useState<string>('అవిఘ్నమస్తు');
  const [title1, setTitle1] = useState<string>('గృహారంభం');
  const [title2, setTitle2] = useState<string>('సుముహూర్త లగ్న పత్రికే');

  // Paragraph components for easy editing
  const [yearName, setYearName] = useState<string>('శ్రీ పరాభవ');
  const [monthName, setMonthName] = useState<string>('శ్రావణ');
  const [tithiName, setTithiName] = useState<string>('శు.ఏకాదశి');
  const [dayName, setDayName] = useState<string>('ఆదివారం');
  const [dateValue, setDateValue] = useState<string>('23-08-2026');
  const [timeValue, setTimeValue] = useState<string>('ఉ 11-21 ని.లకు');
  const [nakshatram, setNakshatram] = useState<string>('మూల');
  const [lagna, setLagna] = useState<string>('తుల');
  const [husbandName, setHusbandName] = useState<string>('');
  const [wifeName, setWifeName] = useState<string>('');

  // Full Paragraph State (editable)
  const [paragraphText, setParagraphText] = useState<string>('');
  const [isParagraphManuallyEdited, setIsParagraphManuallyEdited] = useState<boolean>(false);

  // Custom Images
  const [ganeshaUri, setGaneshaUri] = useState<string | null>(null);
  const [lakshmiUri, setLakshmiUri] = useState<string | null>(null);

  // Profile / Contact Info State
  const [consultantName, setConsultantName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [jyothishyalayam, setJyothishyalayam] = useState<string>('');
  const [profilePicUrl, setProfilePicUrl] = useState<string>('');

  // Picker modal states
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState<boolean>(false);

  // Temporary picker states
  const [tempDay, setTempDay] = useState<string>('23');
  const [tempMonth, setTempMonth] = useState<string>('08');
  const [tempYear, setTempYear] = useState<string>('2026');
  const [tempHour, setTempHour] = useState<string>('11');
  const [tempMinute, setTempMinute] = useState<string>('21');
  const [tempPeriod, setTempPeriod] = useState<string>('ఉ'); // ఉ, మ, సా, రా

  // Helper to split paragraph text into red and blue styled chunks
  const getColoredParagraphChunks = (text: string) => {
    if (!text) return [];

    // Collect all dynamic variables to highlight in blue
    const valuesToBlue = [
      yearName,
      monthName,
      tithiName,
      dayName,
      dateValue,
      timeValue,
      nakshatram,
      lagna,
      husbandName,
      wifeName,
      title1
    ].map(val => val ? val.trim() : '').filter(val => val.length > 0);

    // Remove duplicates and sort by length descending to match longest substring first
    const uniqueBlues = Array.from(new Set(valuesToBlue)).sort((a, b) => b.length - a.length);

    if (uniqueBlues.length === 0) {
      return [{ text, isBlue: false }];
    }

    // Escape special regex chars
    const escapedBlues = uniqueBlues.map(val => val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedBlues.join('|')})`, 'g');

    const parts = text.split(regex);
    return parts.map(part => {
      const isBlue = uniqueBlues.includes(part);
      return { text: part, isBlue };
    });
  };

  // Load profile details & default client info from Home Screen cache
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Load cache first
        try {
          const cached = await AsyncStorage.getItem(`user_profile_${user.uid}`);
          if (cached) {
            const data = JSON.parse(cached);
            setConsultantName(data.name || '');
            setPhoneNumber(data.phone || '');
            setJyothishyalayam(data.jyothishyalayam || '');
            setProfilePicUrl(data.profilePicUrl || '');
          }
        } catch (e) {
          console.log("PatrikaScreen load cache error:", e);
        }

        // Live subscription for profile
        unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setConsultantName(data.name || '');
            setPhoneNumber(data.phone || '');
            setJyothishyalayam(data.jyothishyalayam || '');
            setProfilePicUrl(data.profilePicUrl || '');
          }
        });
      }
    });

    // Load Owner & Wife info defaults from home screen cache
    const loadHomeOwnerInfo = async () => {
      try {
        const cachedOwner = await AsyncStorage.getItem('current_home_owner_info');
        if (cachedOwner) {
          const data = JSON.parse(cachedOwner);
          setHusbandName(data.ownerName || 'శ్రీ మోహన్ రవి శంకర్');
          setWifeName(data.wifeName || 'సత్య కుమారి');
          setNakshatram(data.nakshatram || 'మూల');
        } else {
          setHusbandName('శ్రీ మోహన్ రవి శంకర్');
          setWifeName('సత్య కుమారి');
          setNakshatram('మూల');
        }
      } catch (e) {
        console.log("Failed loading home owner info:", e);
        setHusbandName('శ్రీ మోహన్ రవి శంకర్');
        setWifeName('సత్య కుమారి');
        setNakshatram('మూల');
      }
    };

    loadHomeOwnerInfo();

    // Load custom images from cache
    const loadCustomImages = async () => {
      try {
        const savedGanesha = await AsyncStorage.getItem('patrika_custom_ganesha_uri');
        const savedLakshmi = await AsyncStorage.getItem('patrika_custom_lakshmi_uri');
        if (savedGanesha) setGaneshaUri(savedGanesha);
        if (savedLakshmi) setLakshmiUri(savedLakshmi);
      } catch (e) {
        console.log("Failed loading custom images:", e);
      }
    };
    loadCustomImages();

    // Load custom paragraph from cache
    const loadCustomParagraph = async () => {
      try {
        const savedText = await AsyncStorage.getItem('patrika_custom_paragraph_text');
        const savedEdited = await AsyncStorage.getItem('patrika_is_paragraph_manually_edited');
        if (savedText) setParagraphText(savedText);
        if (savedEdited === 'true') setIsParagraphManuallyEdited(true);
      } catch (e) {
        console.log("Failed loading custom paragraph:", e);
      }
    };
    loadCustomParagraph();

    return () => {
      unsubscribeAuth();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Sync compiled text to state if not manually edited
  useEffect(() => {
    if (!isParagraphManuallyEdited) {
      setParagraphText(getCompiledParagraph());
    }
  }, [yearName, monthName, tithiName, dayName, dateValue, timeValue, nakshatram, lagna, husbandName, wifeName, title1, isParagraphManuallyEdited]);

  // Handle image pick
  const handleSelectImage = async (target: 'ganesha' | 'lakshmi' | 'profile') => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need photo library permissions to change this picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 0.2, // Compressed to prevent heavy base64 payloads
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (target === 'ganesha') {
        setGaneshaUri(uri);
        AsyncStorage.setItem('patrika_custom_ganesha_uri', uri).catch(e => console.log(e));
      } else if (target === 'lakshmi') {
        setLakshmiUri(uri);
        AsyncStorage.setItem('patrika_custom_lakshmi_uri', uri).catch(e => console.log(e));
      } else {
        setProfilePicUrl(uri);
      }
    }
  };

  // Compile paragraph
  const getCompiledParagraph = () => {
    return `స్వస్తిశ్రీ చాంద్రమాన ${yearName} నామ సంవత్సర ${monthName} ${tithiName} ${dayName} అనగా ది ${dateValue} తేదీ ఉ ${timeValue} ${nakshatram} నక్షత్ర యుక్త ${lagna} లగ్నమందు ${husbandName}, ${wifeName} దంపతులు నూతన ${title1} చేయుటకు చంద్ర తారాబల యుక్తముగా యున్నది.`;
  };

  const confirmDatePicker = () => {
    setDateValue(`${tempDay}-${tempMonth}-${tempYear}`);
    setIsDatePickerVisible(false);
  };

  const confirmTimePicker = () => {
    setTimeValue(`${tempPeriod} ${tempHour}-${tempMinute} ని.లకు`);
    setIsTimePickerVisible(false);
  };

  // Share/Export to PDF
  const handleExportPDF = async () => {
    try {
      // React Native safe base64 converter — uses ONLY expo-file-system (no FileReader, no AbortController)
      const getBase64 = async (uri: string | null, fallbackRequireOrUrl: any): Promise<string> => {
        try {
          let targetUri = uri;

          // No user-picked URI — resolve from bundled asset or remote default
          if (!targetUri) {
            if (typeof fallbackRequireOrUrl === 'number' || (typeof fallbackRequireOrUrl === 'object' && fallbackRequireOrUrl !== null)) {
              try {
                const asset = Asset.fromModule(fallbackRequireOrUrl);
                await asset.downloadAsync();
                targetUri = asset.localUri || asset.uri || '';
              } catch {
                return '';
              }
            } else if (typeof fallbackRequireOrUrl === 'string' && fallbackRequireOrUrl.length > 0) {
              // Remote default (e.g. LAKSHMI_DEFAULT http URL) — download to cache first
              const filename = fallbackRequireOrUrl.split('/').pop()?.split('?')[0] || 'img.jpg';
              const cachedPath = `${FileSystem.cacheDirectory}${filename}`;
              try {
                const info = await FileSystem.getInfoAsync(cachedPath);
                if (!info.exists) {
                  await FileSystem.downloadAsync(fallbackRequireOrUrl, cachedPath);
                }
                targetUri = cachedPath;
              } catch {
                return '';
              }
            } else {
              return '';
            }
          }

          if (!targetUri) return '';

          // Ensure file:// prefix for local paths
          let cleanUri = targetUri;
          if (!cleanUri.startsWith('file://') && !cleanUri.startsWith('http://') && !cleanUri.startsWith('https://')) {
            cleanUri = `file://${cleanUri}`;
          }

          // If still a remote URL, download to cache
          if (cleanUri.startsWith('http://') || cleanUri.startsWith('https://')) {
            const filename = cleanUri.split('/').pop()?.split('?')[0] || 'img.jpg';
            const cachedPath = `${FileSystem.cacheDirectory}${filename}`;
            try {
              const info = await FileSystem.getInfoAsync(cachedPath);
              if (!info.exists) {
                await FileSystem.downloadAsync(cleanUri, cachedPath);
              }
              cleanUri = cachedPath;
            } catch {
              return '';
            }
          }

          // Read as base64 using FileSystem only
          const base64 = await FileSystem.readAsStringAsync(cleanUri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const mime = cleanUri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
          return `data:${mime};base64,${base64}`;
        } catch (e) {
          console.log('getBase64 error:', e);
          return '';
        }
      };

      const ganeshaBase64 = await getBase64(ganeshaUri, require('../../assets/ganapati.jpg'));
      const lakshmiBase64 = await getBase64(lakshmiUri, LAKSHMI_DEFAULT);
      const profileBase64 = await getBase64(profilePicUrl, '');

      // Generate colored paragraph html by tokenizing the paragraph text
      const chunks = getColoredParagraphChunks(paragraphText);
      const paragraphHtml = chunks.map(chunk => {
        const cssClass = chunk.isBlue ? 'text-blue' : 'text-red';
        return `<span class="${cssClass}">${chunk.text}</span>`;
      }).join('');

      // Setup HTML
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Georgia', 'serif', 'Arial';
              background-color: #ffffff;
              margin: 0;
              padding: 24px;
              display: flex;
              justify-content: center;
            }
            .patrika-card {
              position: relative;
              overflow: hidden;
              width: 720px;
              border: 2px solid #000000;
              background-color: #fffb15;
              padding: 24px 30px;
              box-sizing: border-box;
              text-align: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 320px;
              color: #9e0000;
              opacity: 0.15;
              pointer-events: none;
              z-index: 999;
              mix-blend-mode: multiply;
              font-family: Arial, sans-serif;
            }
            .red-header {
              position: relative;
              z-index: 2;
              background-color: #9e0000;
              color: white;
              padding: 16px 12px;
              font-size: 32px;
              font-weight: bold;
              border-radius: 6px;
              margin-bottom: 12px;
            }
            .green-subheader {
              position: relative;
              z-index: 2;
              background-color: #a8e88e;
              display: flex;
              justify-content: space-around;
              padding: 12px 8px;
              font-size: 22px;
              font-weight: bold;
              color: #9e0000;
              border-radius: 4px;
              margin-bottom: 18px;
            }
            .gods-section {
              position: relative;
              z-index: 2;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 25px;
            }
            .god-img {
              width: 120px;
              height: 150px;
              object-fit: contain;
              border-radius: 4px;
            }
            .titles-center {
              flex: 1;
              padding: 0 16px;
            }
            .title-green {
              color: #006c00;
              font-size: 24px;
              font-weight: bold;
              margin: 0 0 8px 0;
            }
            .title-red {
              color: #c00000;
              font-size: 26px;
              font-weight: bold;
              margin: 0;
            }
            .paragraph-box {
              position: relative;
              z-index: 2;
              background-color: #ffea79;
              border: 1.8px solid #9e0000;
              padding: 24px;
              font-size: 20px;
              line-height: 2.1;
              color: #000000;
              font-weight: 600;
              text-align: justify;
              margin-bottom: 30px;
              border-radius: 6px;
            }
            .text-red {
              color: #9e0000 !important;
              font-weight: 700;
            }
            .text-blue {
              color: #0000cd !important;
              font-weight: 700;
            }
            .text-plain {
              color: #1a0000;
              font-weight: 600;
            }

            /* CONTACT BAR Styling identical to PDF main tables */
            .contact {
              position: relative;
              z-index: 2;
              background: linear-gradient(135deg, #FFFDF2 0%, #FFF8E1 100%);
              display: flex;
              align-items: stretch;
              padding: 0;
              gap: 0;
              border: 2px solid #D4AF37;
              min-height: 170px;
              margin-top: 20px;
            }
            .contact-left {
              width: 145px;
              flex-shrink: 0;
              display: flex;
              align-items: stretch;
              justify-content: center;
              border-right: 2px solid #D4AF37;
              padding: 0;
              overflow: hidden;
              background-color: #F5F0E8;
            }
            .contact-left img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
            .contact-right {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: 20px 28px;
              gap: 10px;
              text-align: left;
            }
            .contact-name-lbl  { font-size: 12px; color:#7A4A20; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:3px; }
            .contact-name-val  { font-size: 24px; font-weight:900; color:#1A0A00; letter-spacing:0.3px; line-height:1.1; }
            .contact-phone-lbl { font-size: 12px; color:#7A4A20; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:3px; }
            .contact-phone-val { font-size: 22px; font-weight:900; color:#1A0A00; letter-spacing:2px; }
            .contact-divider   { height:1px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 3px 0; }
          </style>
        </head>
        <body>
          <div class="patrika-card">
            <div class="red-header">${headerText}</div>
            <div class="green-subheader">
              <span>${subHeader1}</span>
              <span>${subHeader2}</span>
              <span>${subHeader3}</span>
            </div>
            
            <div class="gods-section">
              <img class="god-img" src="${ganeshaBase64}" />
              <div class="titles-center">
                <p class="title-green">${title1}</p>
                <p class="title-red">${title2}</p>
              </div>
              <img class="god-img" src="${lakshmiBase64}" />
            </div>

            <div class="paragraph-box">
              ${paragraphHtml}
            </div>

            <!-- Contact Bar footer replacing Grid & Note boxes -->
            <div class="contact">
              <!-- LEFT: Image only -->
              <div class="contact-left">
                ${profileBase64
                  ? `<img src="${profileBase64}" style="width: 100%; height: 100%; object-fit: cover;" />`
                  : `<div style="width:100%; height:100%; background:#F5F0E8; display:flex; align-items:center; justify-content:center; font-size:56px; color:#7A4A20;">👤</div>`
                }
              </div>
              <!-- RIGHT: Name + WhatsApp + Jyothishyalayam -->
              <div class="contact-right">
                ${jyothishyalayam ? `
                <div>
                  <div class="contact-name-lbl">${labels.jyothishyalayam}</div>
                  <div class="contact-name-val" style="color:#7B0A10; font-size:22px;">${jyothishyalayam}</div>
                  <div class="contact-divider"></div>
                </div>
                ` : ''}
                <div>
                  <div class="contact-name-lbl">${labels.consultantName}</div>
                  <div class="contact-name-val" style="${jyothishyalayam ? 'font-size:20px;' : ''}">${consultantName || '—'}</div>
                  <div class="contact-divider"></div>
                </div>
                <div>
                  <div class="contact-phone-lbl">${labels.whatsapp}</div>
                  <div style="display:flex;align-items:center;gap:12px;margin-top:2px;">
                    <div class="contact-phone-val">${phoneNumber || '9949598627'}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Om Watermark last — overlays all sections -->
            <div class="watermark">🕉</div>
          </div>
        </body>
        </html>
      `;

      const printResult = await Print.printToFileAsync({ html: htmlContent });
      const customPath = `${FileSystem.documentDirectory}Lagna_Patrika.pdf`;
      
      // Copy to custom path for professional WhatsApp file name display
      await FileSystem.copyAsync({
        from: printResult.uri,
        to: customPath
      });
      
      await Sharing.shareAsync(customPath, { mimeType: 'application/pdf', dialogTitle: 'Share Lagna Patrika' });

    } catch (error: any) {
      console.warn('PDF export failed:', error);
      Alert.alert('PDF Error', `${error?.message || 'Unknown error'}. Please try again.`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header bar from the original App styling */}
      <ScreenHeader
        rightComponent={
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsEditMode(!isEditMode)}
          >
            <Text style={styles.toggleButtonText}>
              {isEditMode ? labels.viewCard : labels.editFields}
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        {isEditMode ? (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>{labels.headersSection}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.topTitle}</Text>
                <TextInput
                  style={styles.input}
                  value={headerText}
                  onChangeText={setHeaderText}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.subhead1}</Text>
                <TextInput
                  style={styles.input}
                  value={subHeader1}
                  onChangeText={setSubHeader1}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.subhead2}</Text>
                <TextInput
                  style={styles.input}
                  value={subHeader2}
                  onChangeText={setSubHeader2}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.subhead3}</Text>
                <TextInput
                  style={styles.input}
                  value={subHeader3}
                  onChangeText={setSubHeader3}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.innerHeader1}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={title1}
                    onValueChange={(itemValue) => setTitle1(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="గృహారంభం" value="గృహారంభం" />
                    <Picker.Item label="శంకుస్థాపన" value="శంకుస్థాపన" />
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.innerHeader2}</Text>
                <TextInput
                  style={styles.input}
                  value={title2}
                  onChangeText={setTitle2}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>{labels.muhurthamSection}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.yearDropdown}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={yearName.replace("శ్రీ ", "")}
                    onValueChange={(itemValue) => setYearName(`శ్రీ ${itemValue}`)}
                    style={styles.picker}
                  >
                    {TELUGU_YEARS_CLEAN.map((yr) => (
                      <Picker.Item key={yr} label={yr} value={yr} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.monthDropdown}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={monthName}
                    onValueChange={(itemValue) => setMonthName(itemValue)}
                    style={styles.picker}
                  >
                    {TELUGU_MONTHS.map((mth) => (
                      <Picker.Item key={mth} label={mth} value={mth} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.tithiDropdown}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={tithiName}
                    onValueChange={(itemValue) => setTithiName(itemValue)}
                    style={styles.picker}
                  >
                    {TELUGU_TITHIS.map((tith) => (
                      <Picker.Item key={tith} label={tith} value={tith} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.dayDropdown}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={dayName}
                    onValueChange={(itemValue) => setDayName(itemValue)}
                    style={styles.picker}
                  >
                    {TELUGU_DAYS.map((d) => (
                      <Picker.Item key={d} label={d} value={d} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.datePick}</Text>
                <TouchableOpacity
                  style={styles.pickerTrigger}
                  onPress={() => setIsDatePickerVisible(true)}
                >
                  <Text style={styles.pickerTriggerText}>{dateValue}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.timePick}</Text>
                <TouchableOpacity
                  style={styles.pickerTrigger}
                  onPress={() => setIsTimePickerVisible(true)}
                >
                  <Text style={styles.pickerTriggerText}>{timeValue}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.nakshatramDropdown}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={nakshatram}
                    onValueChange={(itemValue) => setNakshatram(itemValue)}
                    style={styles.picker}
                  >
                    {NAKSHATRAMS.map((nak) => (
                      <Picker.Item key={nak} label={nak} value={nak} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.lagnaDropdown}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={lagna}
                    onValueChange={(itemValue) => setLagna(itemValue)}
                    style={styles.picker}
                  >
                    {TELUGU_LAGNAS.map((lag) => (
                      <Picker.Item key={lag} label={lag} value={lag} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.husbandName}</Text>
                <TextInput
                  style={styles.input}
                  value={husbandName}
                  onChangeText={setHusbandName}
                  placeholder="Husband Name"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.wifeName}</Text>
                <TextInput
                  style={styles.input}
                  value={wifeName}
                  onChangeText={setWifeName}
                  placeholder="Wife Name"
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>{labels.imagesSection}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imagePickerBtn}
                onPress={() => handleSelectImage('ganesha')}
              >
                <Text style={styles.imagePickerBtnText}>
                  {ganeshaUri ? labels.ganeshaSelected : labels.selectGanesha}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imagePickerBtn}
                onPress={() => handleSelectImage('lakshmi')}
              >
                <Text style={styles.imagePickerBtnText}>
                  {lakshmiUri ? labels.lakshmiSelected : labels.selectLakshmi}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>{labels.contactSection}</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.jyothishyalayam}</Text>
                <TextInput
                  style={styles.input}
                  value={jyothishyalayam}
                  onChangeText={setJyothishyalayam}
                  placeholder="e.g. శ్రీ జ్యోతిష్యాలయం"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.consultantName}</Text>
                <TextInput
                  style={styles.input}
                  value={consultantName}
                  onChangeText={setConsultantName}
                  placeholder="e.g. సిద్ధాంతి"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>{labels.phoneNumber}</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="e.g. 9949598627"
                />
              </View>
              <TouchableOpacity
                style={styles.imagePickerBtn}
                onPress={() => handleSelectImage('profile')}
              >
                <Text style={styles.imagePickerBtnText}>
                  {profilePicUrl ? labels.avatarSelected : labels.selectAvatar}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ===== EDITABLE PARAGRAPH ===== */}
            <Text style={styles.sectionTitle}>
              {language === 'Telugu' ? 'పత్రిక వచనం (సవరించండి)' : language === 'Hindi' ? 'पत्रिका पाठ (संपादित करें)' : 'Patrika Paragraph (Edit)'}
            </Text>
            <Text style={[styles.label, { color: '#555', marginBottom: 4 }]}>
              {language === 'Telugu' ? 'వచనాన్ని నేరుగా సవరించవచ్చు:' : language === 'Hindi' ? 'पाठ को सीधे संपादित करें:' : 'Edit the paragraph text directly:'}
            </Text>
            <TextInput
              style={[styles.input, {
                minHeight: 200,
                textAlignVertical: 'top',
                fontSize: 15,
                lineHeight: 24,
                paddingTop: 12,
                paddingBottom: 12,
                color: '#1a0000',
              }]}
              value={paragraphText}
              onChangeText={(text) => {
                setParagraphText(text);
                setIsParagraphManuallyEdited(true);
                AsyncStorage.setItem('patrika_custom_paragraph_text', text).catch(() => {});
                AsyncStorage.setItem('patrika_is_paragraph_manually_edited', 'true').catch(() => {});
              }}
              multiline={true}
              placeholder="పత్రిక వచనం ఇక్కడ సవరించండి..."
            />
            {isParagraphManuallyEdited && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#9e0000',
                  borderRadius: 8,
                  paddingVertical: 9,
                  paddingHorizontal: 18,
                  alignSelf: 'flex-end',
                  marginTop: 6,
                  marginBottom: 4,
                }}
                onPress={() => {
                  const auto = getCompiledParagraph();
                  setParagraphText(auto);
                  setIsParagraphManuallyEdited(false);
                  AsyncStorage.removeItem('patrika_custom_paragraph_text').catch(() => {});
                  AsyncStorage.setItem('patrika_is_paragraph_manually_edited', 'false').catch(() => {});
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
                  {language === 'Telugu' ? '↺ అసలు వచనానికి రీసెట్' : language === 'Hindi' ? '↺ मूल पाठ पर रीसेट' : '↺ Reset to Original'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          /* View mode - Render the high-fidelity Patrika Card */
          <View style={styles.cardWrapper}>
            <View style={styles.patrikaCard}>

              {/* Dark Red Header */}
              <View style={styles.cardHeaderRed}>
                <Text style={styles.cardHeaderRedText}>{headerText}</Text>
              </View>

              {/* Light Green Subheader */}
              <View style={styles.cardHeaderGreen}>
                <Text style={styles.cardHeaderGreenText}>{subHeader1}</Text>
                <Text style={styles.cardHeaderGreenText}>{subHeader2}</Text>
                <Text style={styles.cardHeaderGreenText}>{subHeader3}</Text>
              </View>

              {/* God Images Section */}
              <View style={styles.godSection}>
                <Image
                  source={ganeshaUri ? { uri: ganeshaUri } : require('../../assets/ganapati.jpg')}
                  style={styles.godImage}
                  resizeMode="contain"
                />
                <View style={styles.titlesBox}>
                  <Text style={styles.innerTitleGreen}>{title1}</Text>
                  <Text style={styles.innerTitleRed}>{title2}</Text>
                </View>
                <Image
                  source={lakshmiUri ? { uri: lakshmiUri } : { uri: LAKSHMI_DEFAULT }}
                  style={styles.godImage}
                  resizeMode="contain"
                />
              </View>

              {/* Paragraph Box — automatically styled red and blue using tokenization */}
              <View style={styles.paragraphBox}>
                <Text style={styles.paragraphText}>
                  {getColoredParagraphChunks(paragraphText).map((chunk, idx) => (
                    <Text key={idx} style={chunk.isBlue ? styles.textBlue : styles.textRed}>
                      {chunk.text}
                    </Text>
                  ))}
                </Text>
              </View>

              {/* Contact Block replacing Grid/Symbols/Note boxes */}
              <View style={styles.contactBlock}>
                {/* Left: Avatar/Profile picture - fills exactly 110px width and 130px height, no overflow */}
                <View style={styles.contactLeft}>
                  {profilePicUrl ? (
                    <Image source={{ uri: profilePicUrl }} style={styles.contactAvatar} />
                  ) : (
                    <View style={styles.contactAvatarPlaceholder}>
                      <Text style={{ fontSize: 32, color: '#7a4a20' }}>👤</Text>
                    </View>
                  )}
                </View>

                {/* Right: Info */}
                <View style={styles.contactRight}>
                  {jyothishyalayam ? (
                    <View style={styles.contactItem}>
                      <Text style={styles.contactLabel}>{labels.jyothishyalayam}</Text>
                      <Text style={styles.contactValueMain}>{jyothishyalayam}</Text>
                      <View style={styles.contactDivider} />
                    </View>
                  ) : null}
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>{labels.consultantName}</Text>
                    <Text style={styles.contactValueSub}>{consultantName || '—'}</Text>
                    <View style={styles.contactDivider} />
                  </View>
                  <View style={styles.contactItem}>
                    <Text style={styles.contactLabel}>{labels.whatsapp}</Text>
                    <View style={styles.whatsappRow}>
                      <Text style={styles.whatsappIcon}>💬</Text>
                      <Text style={styles.contactPhone}>{phoneNumber || '9949598627'}</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Om Watermark - rendered LAST so it overlays all content sections */}
              <View style={styles.omWatermarkContainer} pointerEvents="none">
                <Text style={styles.omWatermarkText}>🕉</Text>
              </View>
            </View>

            {/* Print/Share PDF Button */}
            <TouchableOpacity
              style={styles.pdfButton}
              onPress={handleExportPDF}
            >
              <Text style={styles.pdfButtonText}>{labels.downloadPdf}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* DATE PICKER MODAL */}
      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDatePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>సరియైన తేదీని ఎంచుకోండి (Select Date)</Text>
            <View style={styles.pickersRow}>
              {/* Day Picker */}
              <View style={styles.modalPickerCol}>
                <Text style={styles.modalPickerLabel}>తేదీ (Day)</Text>
                <Picker
                  selectedValue={tempDay}
                  onValueChange={(v) => setTempDay(v)}
                >
                  {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>
              {/* Month Picker */}
              <View style={styles.modalPickerCol}>
                <Text style={styles.modalPickerLabel}>నెల (Month)</Text>
                <Picker
                  selectedValue={tempMonth}
                  onValueChange={(v) => setTempMonth(v)}
                >
                  {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                </Picker>
              </View>
              {/* Year Picker */}
              <View style={styles.modalPickerCol}>
                <Text style={styles.modalPickerLabel}>సంవత్సరం (Year)</Text>
                <Picker
                  selectedValue={tempYear}
                  onValueChange={(v) => setTempYear(v)}
                >
                  {Array.from({ length: 11 }, (_, i) => String(2025 + i)).map(y => (
                    <Picker.Item key={y} label={y} value={y} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsDatePickerVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmDatePicker}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* TIME PICKER MODAL */}
      <Modal
        visible={isTimePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsTimePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>సరియైన సమయాన్ని ఎంచుకోండి (Select Time)</Text>
            <View style={styles.pickersRow}>
              {/* Period Picker */}
              <View style={styles.modalPickerCol}>
                <Text style={styles.modalPickerLabel}>సమయం (Period)</Text>
                <Picker
                  selectedValue={tempPeriod}
                  onValueChange={(v) => setTempPeriod(v)}
                >
                  <Picker.Item label="ఉదయం (ఉ)" value="ఉ" />
                  <Picker.Item label="మధ్యాహ్నం (మ)" value="మ" />
                  <Picker.Item label="సాయంత్రం (సా)" value="సా" />
                  <Picker.Item label="రాత్రి (రా)" value="రా" />
                </Picker>
              </View>
              {/* Hour Picker */}
              <View style={styles.modalPickerCol}>
                <Text style={styles.modalPickerLabel}>గంటలు (Hours)</Text>
                <Picker
                  selectedValue={tempHour}
                  onValueChange={(v) => setTempHour(v)}
                >
                  {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(h => (
                    <Picker.Item key={h} label={h} value={h} />
                  ))}
                </Picker>
              </View>
              {/* Minute Picker */}
              <View style={styles.modalPickerCol}>
                <Text style={styles.modalPickerLabel}>నిమిషాలు (Mins)</Text>
                <Picker
                  selectedValue={tempMinute}
                  onValueChange={(v) => setTempMinute(v)}
                >
                  {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsTimePickerVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmTimePicker}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: '#FFF8F0',
  },
  toggleButtonText: {
    color: '#FFF8F0',
    fontSize: 13,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: palette.primary,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  col: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: palette.secondaryText,
    marginBottom: 4,
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    height: 42,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 42,
  },
  pickerTrigger: {
    height: 42,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  pickerTriggerText: {
    fontSize: 14,
    color: palette.text,
  },
  imagePickerBtn: {
    flex: 1,
    height: 40,
    marginHorizontal: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: palette.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f9ff',
    marginTop: 4,
  },
  imagePickerBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: palette.primary,
  },
  cardWrapper: {
    padding: 16,
    alignItems: 'center',
  },
  patrikaCard: {
    width: width - 32,
    borderWidth: 8,
    borderColor: '#ffff00',
    backgroundColor: '#fffb15',
    padding: 8,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  omWatermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  omWatermarkText: {
    fontSize: 200,
    color: '#9e0000',
    opacity: 0.10,
  },
  cardHeaderRed: {
    width: '100%',
    backgroundColor: '#9e0000',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 6,
  },
  cardHeaderRedText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'CormorantGaramond_700Bold',
  },
  cardHeaderGreen: {
    width: '100%',
    backgroundColor: '#a8e88e',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  cardHeaderGreenText: {
    color: '#9e0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  godSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  godImage: {
    width: 80,
    height: 100,
    borderRadius: 4,
  },
  titlesBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  innerTitleGreen: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006c00',
    textAlign: 'center',
    marginBottom: 4,
  },
  innerTitleRed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c00000',
    textAlign: 'center',
  },
  paragraphBox: {
    width: '100%',
    backgroundColor: '#ffea79',
    borderWidth: 1,
    borderColor: '#9e0000',
    padding: 14,
    borderRadius: 4,
    marginVertical: 8,
  },
  paragraphText: {
    fontSize: 15,
    lineHeight: 26,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },
  textRed: {
    color: '#9e0000',
    fontWeight: '700',
  },
  textBlue: {
    color: '#0000cd',
    fontWeight: '700',
  },

  /* CONTACT BAR - Fixed height, NO overflow, NO layout stretching loops */
  contactBlock: {
    width: '100%',
    height: 130,
    flexDirection: 'row',
    backgroundColor: '#fffdf2',
    borderWidth: 1.5,
    borderColor: '#d4af37',
    marginTop: 12,
    overflow: 'hidden',
  },
  contactLeft: {
    width: 110,
    height: 130,
    borderRightWidth: 1.5,
    borderRightColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f0e8',
    overflow: 'hidden',
  },
  contactAvatar: {
    width: 110,
    height: 130,
    resizeMode: 'cover',
  },
  contactAvatarPlaceholder: {
    width: 110,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3d8c5',
  },
  contactRight: {
    flex: 1,
    height: 130,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: '#fffdf2',
  },
  contactItem: {
    marginBottom: 4,
  },
  contactLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#7a4a20',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 1,
  },
  contactValueMain: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7b0a10',
  },
  contactValueSub: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a0a00',
  },
  contactPhone: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#075E54',
    letterSpacing: 0.5,
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappIcon: {
    marginRight: 6,
    fontSize: 14,
    color: '#25D366',
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#e8d8b0',
    marginTop: 2,
  },
  pdfButton: {
    width: width - 32,
    height: 48,
    backgroundColor: palette.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pdfButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* MODAL DATE / TIME PICKER STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: palette.primary,
  },
  pickersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalPickerCol: {
    flex: 1,
    marginHorizontal: 4,
  },
  modalPickerLabel: {
    fontSize: 11,
    color: palette.secondaryText,
    textAlign: 'center',
    marginBottom: 4,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: palette.primary,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
