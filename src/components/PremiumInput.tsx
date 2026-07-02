import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";

type PremiumInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export const PremiumInput = ({
  label,
  error,
  style,
  ...props
}: PremiumInputProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={palette.secondaryText}
      style={[styles.input, style, error ? styles.inputError : null]}
      {...props}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: palette.textMedium,
    marginBottom: 8,
  },
  input: {
    backgroundColor: palette.surfaceInput,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    minHeight: 50,
    color: palette.text,
    ...typography.body,
    fontFamily: "Manrope_500Medium",
  },
  inputError: {
    borderColor: palette.errorRed,
    borderWidth: 1.5,
  },
  error: {
    marginTop: 5,
    color: palette.errorRed,
    ...typography.caption,
  },
});
