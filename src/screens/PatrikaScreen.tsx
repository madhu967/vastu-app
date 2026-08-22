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
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palette } from '@/constants/theme';
import { useAppLanguage } from '@/context/AppLanguageContext';
import { getAppStrings } from '@/i18n/strings';
import { ScreenHeader } from '@/components/ScreenHeader';

const { width } = Dimensions.get('window');

// Default Web URLs for fallbacks in PDF / Picker
const GANESHA_DEFAULT = 'https://i.imgur.com/6P26c9b.png';
const LAKSHMI_DEFAULT = 'https://i.imgur.com/kP8qQ6r.png';

// 60 Telugu Samvatsaralu
const TELUGU_YEARS = [
  "ప్రభవ", "విభవ", "శుక్ల", "ప్రమోదూత", "ప్రజోత్పత్తి", "ఆంగీరస", "శ్రీముఖ", "భావ", "యువ", "ధాత",
  "ఈశ్వర", "బహుధాన్య", "ప్రమాది", "విక్రమ", "వృష", "చిత్రభాను", "స్వభాను", "తారణ", "పార్థివ", "వ్యయ",
  "సర్వజిత్తు", "సర్వధారి", "విరోధి", "వికృతి", "ఖర", "నందన", "విజయ", "జయ", "మన్మథ", "దుర్ముఖి",
  "హేవిళంబి", "విళంబి", "వికారి", "శార్వరి", "ప్లవ", "శుభకృతు", "శోభకృతు", "క్రోధి", "విశ్వావసు", "పరాభవ",
  "ప్లవంగ", "కీలక", "సౌమ్య", "సాధారణ", "విరోధికృతు", "పరిధావి", "ప్రమాదీచ", "ఆనంద", "రాక్షస", "నల",
  "పింగళ", "కాళయుక్తి", "సిద్ధార్థి", "రౌద్రి", "దుర్మతి", "దుందుభి", "రుధిరోద్గారి", "రక్తాక్షి", "క్రోధన", "అక్షయ"
];�ముఖి",
  "హేవిళంబి", "విళంబి", "వికారి", "శార్వరి", "ప్లవ", "శుభకృతు", "శోభకృతు", "క్రోధి", "విశ్వావసు", "పరాభవ",
  "ప్లవంగ", "కీలక", "సౌమ్య", "సాధారణ", "విరోధికృతు", "పరీధావి", "ప్రమాదీచ", "ఆనంద", "రాక్షస", "నల",
  "పింగల", "కాళయుక్తి", "సిద్ధార్థి", "రౌద్రి", "దుర్మతి", "దుందుభి", "రుధిరోద్గారి", "రక్తాక్షి", "క్రోధన", "అక్షయ"
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

const getPatrikaLabels = (lang: string) => {
  if (lang === 'Telugu') {
    return {
      jyothishyalayam: 'జ్యోతిష్యాలయం',
      consultantName: 'సిద్ధాంతి పేరు',
      whatsapp: 'సంప్రదించండి (WhatsApp)',
    };
  }
  if (lang === 'Hindi') {
    return {
      jyothishyalayam: 'ज्योतिष्यालय',
      consultantName: 'सलाहकार का नाम',
      whatsapp: 'संपर्क करें (WhatsApp)',
    };
  }
  return {
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
  const [title1, setTitle1] = useState<string>('గృహారంభే');
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

    return () => {
      unsubscribeAuth();
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (target === 'ganesha') {
        setGaneshaUri(uri);
      } else if (target === 'lakshmi') {
        setLakshmiUri(uri);
      } else {
        setProfilePicUrl(uri);
      }
    }
  };

  // Compile paragraph
  const getCompiledParagraph = () => {
    return `స్వస్తిశ్రీ చాంద్రమాన ${yearName} నామ సంవత్సర ${monthName} ${tithiName} ${dayName} అనగా ది ${dateValue} తేదీ ఉ ${timeValue} ${nakshatram} నక్షత్ర యుక్త ${lagna} లగ్నమందు ${husbandName}, ${wifeName} దంపతులు నూతన గృహారంభం (శంకుస్థాపన) చేయుటకు చంద్ర తారాబల యుక్తముగా యున్నది.`;
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
      const paragraph = getCompiledParagraph();

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
              padding: 20px;
              display: flex;
              justify-content: center;
            }
            .patrika-card {
              width: 650px;
              border: 15px solid #ffff00;
              background-color: #fffb15;
              padding: 15px;
              box-sizing: border-box;
              text-align: center;
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
            }
            .red-header {
              background-color: #9e0000;
              color: white;
              padding: 12px;
              font-size: 26px;
              font-weight: bold;
              border-radius: 4px;
              margin-bottom: 8px;
            }
            .green-subheader {
              background-color: #a8e88e;
              display: flex;
              justify-content: space-around;
              padding: 8px;
              font-size: 19px;
              font-weight: bold;
              color: #9e0000;
              border-radius: 4px;
              margin-bottom: 12px;
            }
            .gods-section {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
            }
            .god-img {
              width: 100px;
              height: 120px;
              object-fit: contain;
              border-radius: 4px;
            }
            .titles-center {
              flex: 1;
              padding: 0 10px;
            }
            .title-green {
              color: #006c00;
              font-size: 20px;
              font-weight: bold;
              margin: 0 0 6px 0;
            }
            .title-red {
              color: #c00000;
              font-size: 22px;
              font-weight: bold;
              margin: 0;
            }
            .paragraph-box {
              background-color: #ffea79;
              border: 1.5px solid #9e0000;
              padding: 18px;
              font-size: 17px;
              line-height: 1.9;
              color: #000000;
              font-weight: 600;
              text-align: justify;
              margin-bottom: 20px;
              border-radius: 4px;
            }

            /* CONTACT BAR Styling identical to PDF main tables */
            .contact {
              background: linear-gradient(135deg, #FFFDF2 0%, #FFF8E1 100%);
              display: flex;
              align-items: stretch;
              padding: 0;
              gap: 0;
              border: 2px solid #D4AF37;
              min-height: 150px;
              margin-top: 15px;
            }
            .contact-left {
              width: 160px;
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
              padding: 16px 24px;
              gap: 8px;
              text-align: left;
            }
            .contact-name-lbl  { font-size: 11px; color:#7A4A20; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:2px; }
            .contact-name-val  { font-size: 22px; font-weight:900; color:#1A0A00; letter-spacing:0.3px; line-height:1.1; }
            .contact-phone-lbl { font-size: 11px; color:#7A4A20; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:2px; }
            .contact-phone-val { font-size: 20px; font-weight:900; color:#1A0A00; letter-spacing:2px; }
            .contact-divider   { height:1px; background: linear-gradient(90deg, transparent, #D4AF37, transparent); margin: 2px 0; }
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
              <img class="god-img" src="${ganeshaUri || GANESHA_DEFAULT}" />
              <div class="titles-center">
                <p class="title-green">${title1}</p>
                <p class="title-red">${title2}</p>
              </div>
              <img class="god-img" src="${lakshmiUri || LAKSHMI_DEFAULT}" />
            </div>

            <div class="paragraph-box">
              ${paragraph}
            </div>

            <!-- Contact Bar footer replacing Grid & Note boxes -->
            <div class="contact">
              <!-- LEFT: Image only -->
              <div class="contact-left">
                ${profilePicUrl
                  ? `<img src="${profilePicUrl}" style="width: 100%; height: 100%; object-fit: cover;" />`
                  : `<div style="width:100%; height:100%; background:#F5F0E8; display:flex; align-items:center; justify-content:center; font-size:48px; color:#7A4A20;">👤</div>`
                }
              </div>
              <!-- RIGHT: Name + WhatsApp + Jyothishyalayam -->
              <div class="contact-right">
                ${jyothishyalayam ? `
                <div>
                  <div class="contact-name-lbl">${labels.jyothishyalayam}</div>
                  <div class="contact-name-val" style="color:#7B0A10; font-size:20px;">${jyothishyalayam}</div>
                  <div class="contact-divider"></div>
                </div>
                ` : ''}
                <div>
                  <div class="contact-name-lbl">${labels.consultantName}</div>
                  <div class="contact-name-val" style="${jyothishyalayam ? 'font-size:18px;' : ''}">${consultantName || '—'}</div>
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
          </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share Lagna Patrika' });

    } catch (error) {
      console.warn('PDF export failed:', error);
      Alert.alert('Error', 'Failed to generate PDF.');
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
              {isEditMode ? 'View Card' : 'Edit Fields'}
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
            <Text style={styles.sectionTitle}>Patrika Headers</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Top Title</Text>
                <TextInput
                  style={styles.input}
                  value={headerText}
                  onChangeText={setHeaderText}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Subhead 1</Text>
                <TextInput
                  style={styles.input}
                  value={subHeader1}
                  onChangeText={setSubHeader1}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Subhead 2</Text>
                <TextInput
                  style={styles.input}
                  value={subHeader2}
                  onChangeText={setSubHeader2}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Subhead 3</Text>
                <TextInput
                  style={styles.input}
                  value={subHeader3}
                  onChangeText={setSubHeader3}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Inner Header 1 (Dropdown)</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={title1}
                    onValueChange={(itemValue) => setTitle1(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="గృహారంభే" value="గృహారంభే" />
                    <Picker.Item label="శంకుస్థాపనే" value="శంకుస్థాపనే" />
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Inner Header 2</Text>
                <TextInput
                  style={styles.input}
                  value={title2}
                  onChangeText={setTitle2}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Muhurtham Details</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Year (Samvatsaram Dropdown)</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={yearName.replace("శ్రీ ", "")}
                    onValueChange={(itemValue) => setYearName(`శ్రీ ${itemValue}`)}
                    style={styles.picker}
                  >
                    {TELUGU_YEARS.map((yr) => (
                      <Picker.Item key={yr} label={yr} value={yr} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Month (Masam Dropdown)</Text>
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
                <Text style={styles.label}>Tithi (తిథి)</Text>
                <TextInput
                  style={styles.input}
                  value={tithiName}
                  onChangeText={setTithiName}
                  placeholder="e.g. శు.ఏకాదశి"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Day (వారం)</Text>
                <TextInput
                  style={styles.input}
                  value={dayName}
                  onChangeText={setDayName}
                  placeholder="e.g. ఆదివారం"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Date (Tap to Pick)</Text>
                <TouchableOpacity
                  style={styles.pickerTrigger}
                  onPress={() => setIsDatePickerVisible(true)}
                >
                  <Text style={styles.pickerTriggerText}>{dateValue}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Time (Tap to Pick)</Text>
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
                <Text style={styles.label}>Nakshatram (Dropdown)</Text>
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
                <Text style={styles.label}>Lagna (లగ్నం)</Text>
                <TextInput
                  style={styles.input}
                  value={lagna}
                  onChangeText={setLagna}
                  placeholder="e.g. తుల"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Husband's Name (Home default)</Text>
                <TextInput
                  style={styles.input}
                  value={husbandName}
                  onChangeText={setHusbandName}
                  placeholder="Husband Name"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Wife's Name (Home default)</Text>
                <TextInput
                  style={styles.input}
                  value={wifeName}
                  onChangeText={setWifeName}
                  placeholder="Wife Name"
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Image Selectors (Tap to pick custom)</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.imagePickerBtn}
                onPress={() => handleSelectImage('ganesha')}
              >
                <Text style={styles.imagePickerBtnText}>
                  {ganeshaUri ? 'Ganesha Selected ✓' : 'Select Ganesha'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imagePickerBtn}
                onPress={() => handleSelectImage('lakshmi')}
              >
                <Text style={styles.imagePickerBtnText}>
                  {lakshmiUri ? 'Lakshmi Selected ✓' : 'Select Lakshmi'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Contact / Context Info</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Jyothishyalayam</Text>
                <TextInput
                  style={styles.input}
                  value={jyothishyalayam}
                  onChangeText={setJyothishyalayam}
                  placeholder="e.g. శ్రీ జ్యోతిష్యాలయం"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Consultant Name</Text>
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
                <Text style={styles.label}>Phone Number</Text>
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
                  {profilePicUrl ? 'Avatar Selected ✓' : 'Select Avatar'}
                </Text>
              </TouchableOpacity>
            </View>
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

              {/* Paragraph Box */}
              <View style={styles.paragraphBox}>
                <Text style={styles.paragraphText}>
                  {getCompiledParagraph()}
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
            </View>

            {/* Print/Share PDF Button */}
            <TouchableOpacity
              style={styles.pdfButton}
              onPress={handleExportPDF}
            >
              <Text style={styles.pdfButtonText}>Download Patrika PDF</Text>
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
    flexGrow: 1, // Ensures ScrollView content container stretches correctly to allow scroll logic
    paddingBottom: 120, // Ample space at the bottom to scroll past bottom tab bar
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
    fontSize: 22, // Prominent card title size
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
    fontSize: 15, // Perfect readable text size
    lineHeight: 26,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'center',
  },

  /* CONTACT BAR - Fixed height, NO overflow, NO layout stretching loops */
  contactBlock: {
    width: '100%',
    height: 130, // Fixed height to prevent layout calculation loops
    flexDirection: 'row',
    backgroundColor: '#fffdf2',
    borderWidth: 1.5,
    borderColor: '#d4af37',
    marginTop: 12,
    overflow: 'hidden', // Ensures container never overflows the card boundaries
  },
  contactLeft: {
    width: 110, // Occupies exact width of 110px
    height: 130, // Occupies exact height of 130px
    borderRightWidth: 1.5,
    borderRightColor: '#d4af37',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f0e8',
    overflow: 'hidden', // Forces the image to clip and never overflow the left block
  },
  contactAvatar: {
    width: 110, // Exact width to fit the column width
    height: 130, // Exact height to fit the column height
    resizeMode: 'cover', // Clips the image proportionally, preventing stretching
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
    height: 130, // Fits exact height
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    backgroundColor: '#fffdf2',
  },
  contactItem: {
    marginBottom: 4,
  },
  contactLabel: {
    fontSize: 9, // Slightly reduced text size
    fontWeight: 'bold',
    color: '#7a4a20',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 1,
  },
  contactValueMain: {
    fontSize: 15, // Slightly reduced text size
    fontWeight: 'bold',
    color: '#7b0a10',
  },
  contactValueSub: {
    fontSize: 13, // Slightly reduced text size
    fontWeight: 'bold',
    color: '#1a0a00',
  },
  contactPhone: {
    fontSize: 13, // Slightly reduced text size
    fontWeight: 'bold',
    color: '#075E54', // WhatsApp dark green
    letterSpacing: 0.5,
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whatsappIcon: {
    marginRight: 6,
    fontSize: 14, // Slightly reduced size
    color: '#25D366', // WhatsApp bright green
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
