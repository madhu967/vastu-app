import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: ViewStyle;
};

export const PrimaryButton = ({
  title,
  onPress,
  loading,
  style,
}: PrimaryButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.outer, pressed && styles.pressed, style]}
  >
    <LinearGradient
      colors={["#C9A227", "#A07B10"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.button}
    >
      {loading ? (
        <ActivityIndicator color="#0D0404" />
      ) : (
        <Text style={styles.label}>{title}</Text>
      )}
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  outer: {
    borderRadius: cornerRadius.md,
    overflow: "hidden",
    shadowColor: palette.primary,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  label: {
    color: "#0D0404",
    ...typography.button,
    letterSpacing: 0.6,
    fontFamily: "Manrope_700Bold",
  },
});
