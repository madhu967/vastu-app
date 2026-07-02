import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette, typography } from "@/constants/theme";

const { width } = Dimensions.get("window");

type SplashScreenProps = {
  onFinish: () => void;
};

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const logoScale = useRef(new Animated.Value(0.75)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(16)).current;
  const ringScale = useRef(new Animated.Value(0.5)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, tension: 55, friction: 8, useNativeDriver: true }),
        Animated.spring(ringScale, { toValue: 1, tension: 40, friction: 10, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(textTranslate, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start(() => setTimeout(onFinish, 900));

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 1100, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.6, duration: 1100, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["#5A0008", "#8B000F", "#B71C1C"]}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      {/* Decorative corner marks */}
      <View style={[styles.corner, styles.cornerTL]}><Text style={styles.cornerText}>✦</Text></View>
      <View style={[styles.corner, styles.cornerTR]}><Text style={styles.cornerText}>✦</Text></View>
      <View style={[styles.corner, styles.cornerBL]}><Text style={styles.cornerText}>✦</Text></View>
      <View style={[styles.corner, styles.cornerBR]}><Text style={styles.cornerText}>✦</Text></View>

      {/* Outer decorative ring */}
      <Animated.View style={[styles.outerRing, { transform: [{ scale: ringScale }], opacity: fade }]} />

      {/* Glow behind OM circle */}
      <Animated.View style={[styles.glow, { opacity: glowPulse }]} />

      {/* OM Circle — ivory on crimson */}
      <Animated.View style={[styles.logoCircle, { transform: [{ scale: logoScale }], opacity: fade }]}>
        <Text style={styles.omText}>ॐ</Text>
      </Animated.View>

      {/* Text */}
      <Animated.View style={[styles.textSection, { opacity: textOpacity, transform: [{ translateY: textTranslate }] }]}>
        <View style={styles.divider}>
          <View style={styles.divLine} />
          <Text style={styles.divDot}>✦</Text>
          <View style={styles.divLine} />
        </View>
        <Text style={styles.title}>శ్రీ వాస్తు</Text>
        <Text style={styles.titleEn}>SRI VASTU</Text>
        <View style={[styles.divider, { marginTop: 10 }]}>
          <View style={styles.divLine} />
          <Text style={styles.divDot}>✦</Text>
          <View style={styles.divLine} />
        </View>
        <Text style={styles.tagline}>దేవో వాస్తు ప్రజావతే</Text>
      </Animated.View>

      {/* Bottom dots */}
      <View style={styles.dots}>
        {[0,1,2,3,4].map(i => (
          <View key={i} style={[styles.dot, i === 2 && styles.dotCenter]} />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  corner: { position: "absolute", width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  cornerTL: { top: 48, left: 20 },
  cornerTR: { top: 48, right: 20 },
  cornerBL: { bottom: 48, left: 20 },
  cornerBR: { bottom: 48, right: 20 },
  cornerText: { fontSize: 18, color: "rgba(255, 217, 92, 0.6)" },
  outerRing: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1,
    borderColor: "rgba(255, 217, 92, 0.25)",
  },
  glow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(255, 217, 92, 0.08)",
  },
  logoCircle: {
    width: 155,
    height: 155,
    borderRadius: 78,
    backgroundColor: "#FFF8F0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 217, 92, 0.5)",
    shadowColor: "#FFD95C",
    shadowOpacity: 0.4,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },
  omText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 70,
    color: "#B71C1C",
    lineHeight: 80,
  },
  textSection: { marginTop: 28, alignItems: "center" },
  divider: { flexDirection: "row", alignItems: "center", gap: 8, width: 180, marginBottom: 10 },
  divLine: { flex: 1, height: 1, backgroundColor: "rgba(255, 217, 92, 0.4)" },
  divDot: { fontSize: 10, color: "#FFD95C" },
  title: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 42,
    color: "#FFF8F0",
    lineHeight: 50,
    textShadowColor: "rgba(255,217,92,0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleEn: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "rgba(255, 217, 92, 0.75)",
    letterSpacing: 5,
    marginTop: 2,
  },
  tagline: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "rgba(255, 248, 240, 0.55)",
    letterSpacing: 0.4,
    fontStyle: "italic",
  },
  dots: { position: "absolute", bottom: 52, flexDirection: "row", gap: 7, alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,217,92,0.3)" },
  dotCenter: { width: 10, height: 10, borderRadius: 5, backgroundColor: "rgba(255,217,92,0.7)" },
});
