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
      colors={[palette.primary, palette.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.button}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.label}>{title}</Text>
      )}
    </LinearGradient>
  </Pressable>
);

const styles = StyleSheet.create({
  outer: {
    borderRadius: cornerRadius.lg,
    overflow: "hidden",
    shadowColor: palette.primary,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    paddingHorizontal: spacing.xl,
    minHeight: 60,
  },
  label: {
    color: "#FFFFFF",
    ...typography.button,
    letterSpacing: 0.4,
  },
});
