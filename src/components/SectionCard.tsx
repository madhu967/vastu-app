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
        {title ? (
          <View style={styles.titleRow}>
            <View style={styles.titleAccent} />
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : null}
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    )}
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#B71C1C",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  header: {
    marginBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleAccent: {
    width: 3,
    height: 18,
    borderRadius: 2,
    backgroundColor: palette.primary,
  },
  title: {
    ...typography.sectionTitle,
    color: palette.primary,
  },
  subtitle: {
    ...typography.description,
    color: palette.secondaryText,
    marginTop: 4,
    marginLeft: 11,
  },
});
