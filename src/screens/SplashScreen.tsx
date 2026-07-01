import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { palette, typography } from "@/constants/theme";

const { width, height } = Dimensions.get("window");

type SplashScreenProps = {
  onFinish: () => void;
};

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const logoScale = useRef(new Animated.Value(1.15)).current;
  const glowOpacity = useRef(new Animated.Value(0.2)).current;
  const rippleScale = useRef(new Animated.Value(0.5)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, {
            toValue: 0.42,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.18,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(rippleScale, {
          toValue: 1.8,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(onFinish, 500);
    });
  }, [fade, glowOpacity, logoScale, onFinish, rippleScale]);

  return (
    <LinearGradient
      colors={["#FFF9F2", "#FBE8C7", "#FFF9F2"]}
      style={styles.container}
    >
      <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />
      <Animated.View
        style={[styles.ripple, { transform: [{ scale: rippleScale }] }]}
      />
      <Animated.View
        style={[
          styles.content,
          { opacity: fade, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>ॐ</Text>
        </View>
        <Text style={styles.title}>Vastu</Text>
        <Text style={styles.subtitle}>
          Peaceful calculations with a premium feel
        </Text>
      </Animated.View>
      <View style={styles.particles}>
        {Array.from({ length: 12 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { left: (index * width) / 12, top: (index % 5) * 48 + 18 },
            ]}
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: palette.glow,
    shadowColor: palette.accent,
    shadowOpacity: 0.8,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  ripple: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(201, 162, 39, 0.28)",
  },
  content: {
    alignItems: "center",
  },
  logoCircle: {
    width: 138,
    height: 138,
    borderRadius: 999,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2E2118",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(201, 162, 39, 0.2)",
  },
  logoText: {
    ...typography.logo,
    color: palette.primary,
  },
  title: {
    ...typography.hero,
    color: palette.text,
    marginTop: 18,
  },
  subtitle: {
    ...typography.description,
    color: palette.secondaryText,
    marginTop: 6,
  },
  particles: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  dot: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: "rgba(201, 162, 39, 0.38)",
  },
});
