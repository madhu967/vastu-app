import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";
import { ResultTable as ResultTableType } from "@/types/vastu";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getAppStrings } from "@/i18n/strings";

type ResultTableProps = {
  table: ResultTableType;
};

export const ResultTable = ({ table }: ResultTableProps) => {
  const { language } = useAppLanguage();
  const strings = getAppStrings(language);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  useEffect(() => {
    setCurrentPage(1);
  }, [table]);

  if (!table.visible) {
    return null;
  }

  const totalPages = Math.ceil((table.rows?.length || 0) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = table.rows?.slice(startIndex, startIndex + rowsPerPage) || [];

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

      {/* Scrollable multi-column table if headers are present */}
      {table.headers ? (
        <View style={{ overflow: "scroll" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header Row */}
              <View style={[styles.row, { backgroundColor: palette.surfaceWarm, paddingVertical: 8, paddingHorizontal: spacing.sm }]}>
                {table.headers.map((header, i) => (
                  <Text key={i} style={[styles.value, { width: 80, textAlign: "center", fontWeight: "bold", fontSize: 12 }]}>
                    {strings.resultTableLabels?.[header] || header}
                  </Text>
                ))}
              </View>
              
              {currentRows.map((row, index) => {
                const translatedLabel = strings.resultTableLabels?.[row.label] || row.label;
                return (
                <View
                  key={`${row.label}-${index}`}
                  style={[
                    styles.row,
                    { paddingHorizontal: spacing.sm },
                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                  ]}
                >
                  <Text style={[styles.label, { width: 80, textAlign: "center", fontSize: 12 }]}>{translatedLabel}</Text>
                  {row.columns?.map((col, i) => (
                    <Text key={i} style={[styles.value, { width: 80, textAlign: "center", fontSize: 12 }]}>
                      {col}
                    </Text>
                  ))}
                </View>
              )})}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          {/* Header for columns if rounded values exist */}
          {table.rows.some((r) => r.roundedValue) && (
            <View style={[styles.row, { backgroundColor: palette.surfaceWarm, paddingVertical: 8 }]}>
              <Text style={[styles.label, { fontWeight: "bold" }]}>Field</Text>
              <Text style={[styles.value, { flex: 1, textAlign: "center", fontWeight: "bold" }]}>Actual</Text>
              <Text style={[styles.value, { fontWeight: "bold" }]}>Rounded</Text>
            </View>
          )}

          {/* Rows */}
          {currentRows.map((row, index) => {
            const translatedLabel = strings.resultTableLabels?.[row.label] || row.label;
            return (
              <View
                key={`${row.label}-${index}`}
                style={[
                  styles.row,
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                ]}
              >
                <Text style={styles.label}>{translatedLabel}</Text>
                <Text style={[styles.value, row.roundedValue ? { flex: 1, textAlign: "center" } : {}]}>{row.value}</Text>
                {row.roundedValue && <Text style={styles.value}>{row.roundedValue}</Text>}
              </View>
            );
          })}
        </View>
      )}

      {totalPages > 1 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity 
            style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
            onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <Text style={[styles.pageButtonText, currentPage === 1 && styles.pageButtonTextDisabled]}>Prev</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
          <TouchableOpacity 
            style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
            onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <Text style={[styles.pageButtonText, currentPage === totalPages && styles.pageButtonTextDisabled]}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: palette.surfaceWarm,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  pageButton: {
    backgroundColor: palette.gold,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: cornerRadius.sm,
  },
  pageButtonDisabled: {
    backgroundColor: palette.border,
  },
  pageButtonText: {
    color: "#3B1F00",
    fontWeight: "bold",
    fontSize: 14,
  },
  pageButtonTextDisabled: {
    color: palette.textLight,
  },
  pageInfo: {
    color: palette.textMedium,
    fontSize: 14,
  }
});
