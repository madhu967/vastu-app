import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette, typography } from "@/constants/theme";

const { width } = Dimensions.get("window");

type SplashScreenProps = {
  onFinish: () => void;
};

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const logoScale    = useRef(new Animated.Value(0.5)).current;
  const fade         = useRef(new Animated.Value(0)).current;
  const textOpacity  = useRef(new Animated.Value(0)).current;
  const textTranslate= useRef(new Animated.Value(20)).current;
  const ringScale    = useRef(new Animated.Value(0.3)).current;
  const glowPulse    = useRef(new Animated.Value(0.4)).current;
  const spinValue    = useRef(new Animated.Value(0)).current;
  const reverseSpin  = useRef(new Animated.Value(0)).current;
  const screenFade   = useRef(new Animated.Value(1)).current; // for fade-out

  useEffect(() => {
    // Entrance animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade,      { toValue: 1, duration: 800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, tension: 40, friction: 7, useNativeDriver: true }),
        Animated.spring(ringScale, { toValue: 1, tension: 35, friction: 8, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(textTranslate,{ toValue: 0, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      ]),
      // Hold on screen for 2.5 seconds
      Animated.delay(2500),
      // Smooth fade-out over 600ms
      Animated.timing(screenFade, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start(() => onFinish());

    // Continuous Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1,   duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.4, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    ).start();

    // Continuous slow rotations for compass rings
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(reverseSpin, {
        toValue: 1,
        duration: 25000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinReverse = reverseSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  return (
    <Animated.View style={[styles.wrapper, { opacity: screenFade }]}>
      <LinearGradient
        colors={["#4A0006", "#7A000D", "#A61515"]}
        locations={[0, 0.6, 1]}
        style={styles.container}
      >
        {/* Decorative corner marks */}
        <View style={[styles.corner, styles.cornerTL]}><Text style={styles.cornerText}>✦</Text></View>
        <View style={[styles.corner, styles.cornerTR]}><Text style={styles.cornerText}>✦</Text></View>
        <View style={[styles.corner, styles.cornerBL]}><Text style={styles.cornerText}>✦</Text></View>
        <View style={[styles.corner, styles.cornerBR]}><Text style={styles.cornerText}>✦</Text></View>

        {/* Glow behind OM circle */}
        <Animated.View style={[styles.glow, { opacity: glowPulse }]} />

        {/* Vastu Compass Assembly */}
        <View style={styles.compassContainer}>
          {/* Outer Reverse Spinning Ring */}
          <Animated.View style={[styles.outerRing, { opacity: fade, transform: [{ scale: ringScale }, { rotate: spinReverse }] }]}>
            <View style={styles.dashedBorder} />
            <View style={[styles.ringNode, { top: -4, left: 116 }]} />
            <View style={[styles.ringNode, { bottom: -4, left: 116 }]} />
            <View style={[styles.ringNode, { top: 116, left: -4 }]} />
            <View style={[styles.ringNode, { top: 116, right: -4 }]} />
          </Animated.View>

          {/* Inner Spinning Direction Ring */}
          <Animated.View style={[styles.innerRing, { opacity: fade, transform: [{ scale: ringScale }, { rotate: spin }] }]}>
            {directions.map((dir, index) => {
              const angle = (index * 45 * Math.PI) / 180;
              const radius = 84;
              const x = radius * Math.sin(angle);
              const y = -radius * Math.cos(angle);
              
              return (
                <View key={dir} style={[styles.directionContainer, { transform: [{ translateX: x }, { translateY: y }, { rotate: `${index * 45}deg` }] }]}>
                  <Text style={styles.directionText}>{dir}</Text>
                  <View style={styles.directionTick} />
                </View>
              );
            })}
          </Animated.View>

          {/* Central OM */}
          <Animated.View style={[styles.logoCircle, { transform: [{ scale: logoScale }], opacity: fade }]}>
            <View style={styles.innerLogoGlow} />
            <Text style={styles.omText}>ॐ</Text>
          </Animated.View>
        </View>

        {/* Text block */}
        <Animated.View
          style={[styles.textSection, { opacity: textOpacity, transform: [{ translateY: textTranslate }] }]}
        >
          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDot}>✦</Text>
            <View style={styles.divLine} />
          </View>
          <Text style={styles.title}>వాస్తు సర్వస్వం</Text>
          <Text style={styles.titleEn}>VASTU SARVASWAM</Text>
          <View style={[styles.divider, { marginTop: 15 }]}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  corner: { position: "absolute", width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  cornerTL: { top: 48, left: 20 },
  cornerTR: { top: 48, right: 20 },
  cornerBL: { bottom: 48, left: 20 },
  cornerBR: { bottom: 48, right: 20 },
  cornerText: { fontSize: 18, color: "rgba(255, 217, 92, 0.8)", textShadowColor: "#FFD95C", textShadowRadius: 6 },
  
  compassContainer: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: "rgba(255, 217, 92, 0.4)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedBorder: {
    position: "absolute",
    width: 224,
    height: 224,
    borderRadius: 112,
    borderWidth: 1,
    borderColor: "rgba(255, 217, 92, 0.6)",
    borderStyle: 'dashed',
  },
  ringNode: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFD95C",
    shadowColor: "#FFD95C",
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  innerRing: {
    position: "absolute",
    width: 194,
    height: 194,
    borderRadius: 97,
    borderWidth: 2,
    borderColor: "rgba(255, 217, 92, 0.2)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionText: {
    color: "#FFD95C",
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    marginBottom: 2,
    textShadowColor: "rgba(255, 217, 92, 0.6)",
    textShadowRadius: 4,
  },
  directionTick: {
    width: 2,
    height: 8,
    backgroundColor: "#FFD95C",
    borderRadius: 1,
  },
  glow: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 217, 92, 0.15)",
    shadowColor: "#FFD95C",
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255, 248, 240, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFD95C",
    shadowColor: "#FFD95C",
    shadowOpacity: 0.6,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 15,
  },
  innerLogoGlow: {
    position: 'absolute',
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 1,
    borderColor: "rgba(183, 28, 28, 0.15)",
  },
  omText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 54,
    color: "#A61515",
    lineHeight: 62,
    textShadowColor: "rgba(166, 21, 21, 0.3)",
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 2 },
  },
  textSection: { marginTop: 40, alignItems: "center" },
  divider: { flexDirection: "row", alignItems: "center", gap: 8, width: 220, marginBottom: 12 },
  divLine: { flex: 1, height: 1, backgroundColor: "rgba(255, 217, 92, 0.6)" },
  divDot: { fontSize: 12, color: "#FFD95C" },
  title: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 32,
    color: "#FFF8F0",
    lineHeight: 38,
    textShadowColor: "rgba(255,217,92,0.4)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  titleEn: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#FFD95C",
    letterSpacing: 6,
    marginTop: 4,
    textShadowColor: "rgba(255,217,92,0.3)",
    textShadowRadius: 8,
  },
  tagline: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "rgba(255, 248, 240, 0.7)",
    letterSpacing: 0.5,
    fontStyle: "italic",
  },
  dots: { position: "absolute", bottom: 40, flexDirection: "row", gap: 8, alignItems: "center" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,217,92,0.4)" },
  dotCenter: { width: 10, height: 10, borderRadius: 5, backgroundColor: "rgba(255,217,92,0.9)", shadowColor: "#FFD95C", shadowRadius: 4, shadowOpacity: 0.8 },
});
