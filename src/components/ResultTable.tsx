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
      {/* Crimson header band — like the reference image */}
      <View style={styles.headerSection}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ఫల విశ్లేషణ</Text>
          </View>
        </View>
        <Text style={styles.title}>{table.title}</Text>
      </View>

      {/* Header for columns if rounded values exist */}
      {table.rows.some((r) => r.roundedValue) && (
        <View style={[styles.row, { backgroundColor: palette.surfaceWarm, paddingVertical: 8 }]}>
          <Text style={[styles.label, { fontWeight: "bold" }]}>Field</Text>
          <Text style={[styles.value, { flex: 1, textAlign: "center", fontWeight: "bold" }]}>Actual</Text>
          <Text style={[styles.value, { fontWeight: "bold" }]}>Rounded</Text>
        </View>
      )}

      {/* Rows */}
      {table.rows.map((row, index) => (
        <View
          key={`${row.label}-${index}`}
          style={[
            styles.row,
            index % 2 === 0 ? styles.rowEven : styles.rowOdd,
          ]}
        >
          <Text style={styles.label}>{row.label}</Text>
          <Text style={[styles.value, row.roundedValue ? { flex: 1, textAlign: "center" } : {}]}>{row.value}</Text>
          {row.roundedValue && <Text style={styles.value}>{row.roundedValue}</Text>}
        </View>
      ))}

      {/* Footer gold divider */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <Text style={styles.footerDot}>✦</Text>
        <View style={styles.footerLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    marginBottom: spacing.md,
    overflow: "hidden",
    shadowColor: "#B71C1C",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  headerSection: {
    backgroundColor: palette.primary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  badgeRow: {
    marginBottom: 6,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,217,92,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.4)",
  },
  badgeText: {
    ...typography.caption,
    color: "#FFD95C",
    letterSpacing: 0.4,
  },
  title: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 20,
    color: "#FFF8F0",
    lineHeight: 28,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
  },
  rowEven: {
    backgroundColor: "#FFFDF9",
  },
  rowOdd: {
    backgroundColor: palette.surface,
  },
  label: {
    ...typography.body,
    color: palette.textMedium,
    flex: 1,
    fontSize: 14,
  },
  value: {
    ...typography.body,
    color: palette.primary,
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: palette.surfaceWarm,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: palette.border,
  },
  footerDot: {
    fontSize: 9,
    color: palette.gold,
  },
});
