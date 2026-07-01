import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";

type SectionCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export const SectionCard = ({
  title,
  subtitle,
  children,
}: SectionCardProps) => (
  <View style={styles.card}>
    {(title || subtitle) && (
      <View style={styles.header}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    )}
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#2E2118",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.sectionTitle,
    color: palette.text,
  },
  subtitle: {
    ...typography.description,
    color: palette.secondaryText,
    marginTop: 4,
  },
});
