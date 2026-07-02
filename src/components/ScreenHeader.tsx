import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export const ScreenHeader = ({ title, subtitle }: ScreenHeaderProps) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#5A0008", "#8B000F", "#B71C1C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      {/* Decorative corner detail top-left */}
      <View style={styles.cornerDeco}>
        <View style={styles.cornerLine} />
      </View>

      {/* Hamburger menu */}
      <Pressable
        style={({ pressed }) => [styles.menuButton, pressed && styles.menuButtonPressed]}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <View style={styles.menuLine} />
        <View style={[styles.menuLine, styles.menuLineMid]} />
        <View style={styles.menuLine} />
      </Pressable>

      {/* Center title block */}
      <View style={styles.textBlock}>
        <Text style={styles.sanskrit}>|| ॐ నమో నారాయణాయ ||</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {/* Right icon */}
      <View style={styles.iconButton}>
        <Text style={styles.iconText}>🔔</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  cornerDeco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  cornerLine: {
    height: 1,
    backgroundColor: "rgba(255,217,92,0.2)",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: cornerRadius.sm,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 9,
  },
  menuButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  menuLine: {
    height: 1.5,
    width: "100%",
    backgroundColor: "#FFF8F0",
    borderRadius: 1,
  },
  menuLineMid: {
    width: "70%",
    alignSelf: "flex-start",
  },
  textBlock: {
    flex: 1,
    alignItems: "center",
  },
  sanskrit: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: "rgba(255,217,92,0.8)",
    letterSpacing: 0.4,
    marginBottom: 2,
    fontStyle: "italic",
  },
  title: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 22,
    color: "#FFF8F0",
    textAlign: "center",
    lineHeight: 30,
  },
  subtitle: {
    ...typography.description,
    color: "rgba(255,248,240,0.65)",
    marginTop: 2,
    textAlign: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: cornerRadius.sm,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
    lineHeight: 22,
  },
});
