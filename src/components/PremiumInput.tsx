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
    color: palette.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: palette.mist,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    paddingVertical: 15,
    minHeight: 56,
    color: palette.text,
    ...typography.body,
  },
  inputError: {
    borderColor: palette.secondary,
  },
  error: {
    marginTop: 6,
    color: palette.secondary,
    ...typography.caption,
  },
});
