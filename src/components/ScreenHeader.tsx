import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { cornerRadius, palette, spacing } from "@/constants/theme";

type ScreenHeaderProps = {
  title?: string;
  subtitle?: string;
  rightComponent?: React.ReactNode;
};

export const ScreenHeader = ({ rightComponent }: ScreenHeaderProps) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#5A0008", "#8B000F", "#B71C1C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      {/* Decorative bottom gold line */}
      <View style={styles.cornerDeco}>
        <View style={styles.cornerLine} />
      </View>

      {/* Left: App names wrapped in column for vertical stack, while keeping row alignment with menu */}
      <View style={styles.titleContainer}>
        <Text style={styles.appName} numberOfLines={1}>
          Viswakarma Vastu Sarvaswam
        </Text>
        <Text style={styles.teluguAppName} numberOfLines={1}>
          విశ్వకర్మ వాస్తు సర్వస్వం
        </Text>
      </View>

      {/* Spacer pushes menu to right */}
      <View style={styles.spacer} />

      {/* Right: Hamburger menu icon */}
      {rightComponent ?? (
        <Pressable
          style={({ pressed }) => [styles.menuButton, pressed && styles.menuButtonPressed]}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <View style={styles.menuLine} />
          <View style={[styles.menuLine, styles.menuLineMid]} />
          <View style={styles.menuLine} />
        </Pressable>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: 18,
    paddingHorizontal: spacing.lg,
  },
  cornerDeco: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  cornerLine: {
    height: 1,
    backgroundColor: "rgba(255,217,92,0.25)",
  },
  titleContainer: {
    flexDirection: "column",
    flexShrink: 1,
    gap: 1,
  },
  appName: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 21,
    color: "#FFD95C",
    lineHeight: 25,
  },
  teluguAppName: {
    fontFamily: "System",
    fontSize: 11,
    color: "#FFF8F0",
    opacity: 0.85,
    lineHeight: 14,
  },
  spacer: {
    flex: 1,
    minWidth: 8,
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: cornerRadius.sm,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 9,
    flexShrink: 0,
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
});
