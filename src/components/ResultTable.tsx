import { StyleSheet, Text, View } from "react-native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";
import { ResultTable as ResultTableType } from "@/types/vastu";

type ResultTableProps = {
  table: ResultTableType;
};

export const ResultTable = ({ table }: ResultTableProps) => {
  if (!table.visible) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Report</Text>
        </View>
        <Text style={styles.title}>{table.title}</Text>
      </View>
      {table.rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={styles.label}>{row.label}</Text>
          <Text style={styles.value}>{row.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.xl,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: "#2E2118",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  headerRow: {
    marginBottom: spacing.md,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(217, 119, 6, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.caption,
    color: palette.primary,
    letterSpacing: 0.5,
  },
  title: {
    ...typography.cardHeading,
    color: palette.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  label: {
    ...typography.body,
    color: palette.text,
    flex: 1,
  },
  value: {
    ...typography.body,
    color: palette.secondary,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
});
