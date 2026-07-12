import { useState, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  Linking,
  Pressable,
  Modal,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { spacing } from "@/constants/theme";
import { useAppLanguage } from "@/context/AppLanguageContext";

// ─────────────────────────────────────────────────────────────────────────────
//  Phone FAB  (floating action button – bottom right, separate from footer)
// ─────────────────────────────────────────────────────────────────────────────

const getContacts = (lang: string) => {
  if (lang === "English") {
    return [
      { title: "Almanac Maker", name: "Brahmasri Pedagadi Mohan Ravishankar Daivagna", location: "Andhra Pradesh", phone: "9949598627" },
      { title: "Vastu Ratna", name: "Sri Namana Siddhanti", location: "Andhra Pradesh", phone: "9949250888" },
      { title: "Yuva Ratna", name: "Sri Namana Pavan", location: "Andhra Pradesh", phone: "9949753939" },
    ];
  }
  if (lang === "Hindi") {
    return [
      { title: "पंचांगकर्ता", name: "ब्रह्मश्री पेदगाडी मोहन रविशंकर दैवज्ञ", location: "आंध्र प्रदेश", phone: "9949598627" },
      { title: "वास्तुरत्न", name: "श्री नामना सिद्धान्ती", location: "आंध्र प्रदेश", phone: "9949250888" },
      { title: "युवरत्न", name: "श्रीनामना पवन", location: "आंध्र प्रदेश", phone: "9949753939" },
    ];
  }
  return [
    { title: "పంచాంగకర్త", name: "బ్రహ్మశ్రీ పెదగాడి మోహన్ రవిశంకర్ దైవజ్ఞ", location: "ఆంధ్రప్రదేశ్", phone: "9949598627" },
    { title: "వాస్తురత్న", name: "శ్రీ నామన సిద్ధాంతి", location: "ఆంధ్ర ప్రదేశ్", phone: "9949250888" },
    { title: "యువరత్న", name: "శ్రీనామన పవన్", location: "ఆంధ్ర ప్రదేశ్", phone: "9949753939" },
  ];
};

const getHeader = (lang: string) => {
  if (lang === "English") return "Contact Us";
  if (lang === "Hindi") return "संपर्क करें";
  return "సంప్రదించండి";
};

export const PhoneFAB = () => {
  const { language } = useAppLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const ripple = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0.65)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.1, duration: 600, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1,   duration: 600, useNativeDriver: true }),
      ]),
    ).start();

    Animated.loop(
      Animated.parallel([
        Animated.timing(ripple, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(rippleOpacity, { toValue: 0.4, duration: 750, useNativeDriver: true }),
          Animated.timing(rippleOpacity, { toValue: 0,   duration: 750, useNativeDriver: true }),
        ]),
      ]),
    ).start();
  }, []);

  const rippleScale = ripple.interpolate({ inputRange: [0, 1], outputRange: [1, 2.2] });

  return (
    <>
      <View style={fab.wrapper}>
        <Animated.View
          style={[fab.rippleRing, { transform: [{ scale: rippleScale }], opacity: rippleOpacity }]}
        />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={({ pressed }) => [fab.btn, pressed && fab.pressed]}
          hitSlop={12}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <LinearGradient
              colors={["#F4C430", "#C9830A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={fab.inner}
            >
              <Text style={fab.icon}>📞</Text>
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={fab.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={fab.modalContent}>
            <Text style={fab.modalHeader}>{getHeader(language)}</Text>
            {getContacts(language).map((contact, i) => (
              <View key={i} style={[fab.contactRow, i === getContacts(language).length - 1 && { borderBottomWidth: 0 }]}>
                <View style={fab.contactInfo}>
                  <Text style={fab.contactTitle}>{contact.title}</Text>
                  <Text style={fab.contactName}>{contact.name}</Text>
                  <Text style={fab.contactLoc}>{contact.location}</Text>
                </View>
                <TouchableOpacity
                  style={fab.phoneBtn}
                  onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                >
                  <Text style={fab.phoneBtnIcon}>📞</Text>
                </TouchableOpacity>
              </View>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Footer Section
//  Design: deep dark warm charcoal (#130605) — luxury premium look
//  Gold + ivory accents, NO phone icon
// ─────────────────────────────────────────────────────────────────────────────
export const FooterSection = () => {
  const spin  = useRef(new Animated.Value(0)).current;
  const glowA = useRef(new Animated.Value(0.3)).current;
  const glowB = useRef(new Animated.Value(0)).current;
  const shimX = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    // Slow mandala rotation
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 22000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // OM glow breathe
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowA, { toValue: 1,   duration: 1800, useNativeDriver: true }),
        Animated.timing(glowA, { toValue: 0.3, duration: 1800, useNativeDriver: true }),
      ]),
    ).start();

    // Particle drift B
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowB, { toValue: 1,   duration: 2400, useNativeDriver: true }),
        Animated.timing(glowB, { toValue: 0,   duration: 2400, useNativeDriver: true }),
      ]),
    ).start();

    // Shimmer sweep on the gold line
    Animated.loop(
      Animated.timing(shimX, {
        toValue: 400,
        duration: 3000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spinDeg   = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
  const spinDegRv = spin.interpolate({ inputRange: [0, 1], outputRange: ["360deg", "0deg"] });

  return (
    <View style={ft.outer}>
      {/* ── Shimmer gold stripe at the very top ── */}
      <View style={ft.shimmerTrack} pointerEvents="none">
        <Animated.View style={[ft.shimmerBar, { transform: [{ translateX: shimX }] }]} />
      </View>

      <LinearGradient
        colors={["#5A0008", "#8B000F", "#B71C1C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={ft.gradient}
      >
        {/* ── Background mandala rings ── */}
        <Animated.View style={[ft.bgRingLg, { transform: [{ rotate: spinDeg }] }]} />
        <Animated.View style={[ft.bgRingMd, { transform: [{ rotate: spinDegRv }] }]} />
        <View style={ft.bgRingSm} />

        {/* ── corner glyphs ── */}
        <Text style={[ft.corner, ft.cTL]}>✦</Text>
        <Text style={[ft.corner, ft.cTR]}>✦</Text>
        <Text style={[ft.corner, ft.cBL]}>✦</Text>
        <Text style={[ft.corner, ft.cBR]}>✦</Text>

        {/* ══════════ HERO BLOCK ══════════ */}
        <View style={ft.heroBlock}>
          {/* Outer glow behind OM */}
          <Animated.View style={[ft.omGlow, { opacity: glowA }]} />

          {/* OM Circle */}
          <View style={ft.omCircleOuter}>
            <View style={ft.omCircleInner}>
              <Animated.Text style={[ft.omText, { opacity: glowA }]}>ॐ</Animated.Text>
            </View>
          </View>

          {/* Gold divider */}
          <View style={ft.heroDivider}>
            <View style={ft.heroDivLine} />
            <Text style={ft.heroDivDot}>◆</Text>
            <View style={ft.heroDivLine} />
          </View>

          {/* Brand title */}
          <Text style={ft.brandTe}>విశ్వకర్మ వాస్తు సర్వస్వం</Text>
          <Text style={ft.brandEn}>VISWAKARMA VASTU SARVASWAM</Text>

          {/* Gold divider */}
          <View style={[ft.heroDivider, { marginTop: 10 }]}>
            <View style={ft.heroDivLine} />
            <Text style={ft.heroDivDot}>✦</Text>
            <View style={ft.heroDivLine} />
          </View>

          <Text style={ft.taglineTe}>దేవో వాస్తు ప్రజావతే</Text>
          <Text style={ft.taglineEn}>Harmonise your home · align with the cosmos</Text>
        </View>


        {/* ══════════ SANSKRIT VERSE BLOCK ══════════ */}
        <View style={ft.verseCard}>
          <Text style={ft.verseQuote}>"</Text>
          <Text style={ft.verseText}>
            వాస్తు శాస్త్రం ద్వారా మీ గృహం{"\n"}శాంతి, సమృద్ధి పొందుతుంది
          </Text>
          <View style={ft.verseDivider}>
            <View style={ft.verseLine} />
            <Text style={ft.verseOm}>ॐ</Text>
            <View style={ft.verseLine} />
          </View>
          <Text style={ft.verseShanti}>ॐ शान्तिः शान्तिः शान्तिः</Text>
        </View>

        {/* ══════════ BOTTOM COPYRIGHT ══════════ */}
        <View style={ft.bottomStrip}>
          <View style={ft.bottomLine} />
        </View>
        <Text style={ft.copyright}>© 2025 Viswakarma Vastu Sarvaswam · All Rights Reserved</Text>
      </LinearGradient>
    </View>
  );
};



// ─── Styles ───────────────────────────────────────────────────────────────────

const fab = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 28,
    right: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  rippleRing: {
    position: "absolute",
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: "rgba(201,131,10,0.5)",
    backgroundColor: "transparent",
  },
  btn: {},
  pressed: { opacity: 0.82 },
  inner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F4C430",
    shadowOpacity: 0.55,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  icon: { fontSize: 22, lineHeight: 28 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFFDF8",
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: "#D4AF37",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 20,
    textAlign: "center",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8D8B0",
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 12,
    color: "#D4AF37",
    fontWeight: "bold",
    marginBottom: 2,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2C1000",
    marginBottom: 2,
  },
  contactLoc: {
    fontSize: 12,
    color: "#5A3000",
  },
  phoneBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F4C430",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  phoneBtnIcon: {
    fontSize: 18,
  },
});

const ft = StyleSheet.create({
  outer: {
    marginHorizontal: -spacing.lg,
    overflow: "hidden",
  },

  // ── shimmer top stripe ──
  shimmerTrack: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    zIndex: 10,
    overflow: "hidden",
    backgroundColor: "rgba(255,217,92,0.18)",
  },
  shimmerBar: {
    width: 140,
    height: 2,
    backgroundColor: "#FFD95C",
    borderRadius: 1,
    opacity: 0.9,
  },

  gradient: {
    paddingTop: spacing.lg + 10,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    overflow: "hidden",
  },

  // ── rotating background rings ──
  bgRingLg: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.22)",
    top: -60,
    alignSelf: "center",
  },
  bgRingMd: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.28)",
    top: -10,
    alignSelf: "center",
  },
  bgRingSm: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.22)",
    top: 30,
    alignSelf: "center",
  },

  // ── corner glyphs ──
  corner: { position: "absolute", fontSize: 13, color: "rgba(255,217,92,0.65)" },
  cTL: { top: 16, left: 18 },
  cTR: { top: 16, right: 18 },
  cBL: { bottom: 16, left: 18 },
  cBR: { bottom: 16, right: 18 },

  // ══ HERO ══
  heroBlock: { alignItems: "center", width: "100%", marginBottom: spacing.lg },
  omGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(183,28,28,0.18)",
    top: -10,
  },
  omCircleOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    borderColor: "rgba(255,217,92,0.65)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,217,92,0.12)",
    marginBottom: 14,
  },
  omCircleInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,248,240,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  omText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 40,
    color: "#FFD95C",
    lineHeight: 50,
  },

  heroDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 160,
    marginVertical: 8,
  },
  heroDivLine: { flex: 1, height: 1, backgroundColor: "rgba(255,217,92,0.5)" },
  heroDivDot:  { fontSize: 9, color: "rgba(255,217,92,0.9)" },

  brandTe: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 28,
    color: "#FFF8F0",
    lineHeight: 36,
    textShadowColor: "rgba(255,217,92,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    textAlign: "center",
  },
  brandEn: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "rgba(255,217,92,0.95)",
    letterSpacing: 4,
    marginTop: 2,
    textAlign: "center",
  },
  taglineTe: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 14,
    color: "rgba(255,248,240,0.75)",
    fontStyle: "italic",
    letterSpacing: 0.4,
    marginTop: 2,
    textAlign: "center",
  },
  taglineEn: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: "rgba(255,248,240,0.38)",
    letterSpacing: 0.3,
    marginTop: 5,
    textAlign: "center",
  },


  // ══ VERSE CARD ══
  verseCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.35)",
    borderRadius: 14,
    backgroundColor: "rgba(255,248,240,0.04)",
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  verseQuote: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 36,
    color: "rgba(255,217,92,0.5)",
    lineHeight: 30,
    alignSelf: "flex-start",
    marginTop: -6,
  },
  verseText: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 15,
    color: "rgba(255,248,240,0.7)",
    textAlign: "center",
    lineHeight: 24,
    fontStyle: "italic",
    letterSpacing: 0.3,
  },
  verseDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "60%",
    marginVertical: 10,
  },
  verseLine: { flex: 1, height: 1, backgroundColor: "rgba(255,217,92,0.4)" },
  verseOm: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 14,
    color: "rgba(255,217,92,0.85)",
  },
  verseShanti: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "rgba(255,217,92,0.75)",
    letterSpacing: 1,
    textAlign: "center",
  },

  // ══ BOTTOM ══
  bottomStrip: { width: "100%", marginBottom: 10 },
  bottomLine:  { height: 1, backgroundColor: "rgba(255,217,92,0.28)" },
  copyright: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: "rgba(255,248,240,0.25)",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
