import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";
import { ResultTable as ResultTableType } from "@/types/vastu";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getAppStrings } from "@/i18n/strings";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type ResultTableProps = {
  table: ResultTableType;
};

const getColWidth = (hdr: string) => {
  if (hdr === "Nakshatram Name") return 110;
  if (hdr === "Padamu Decimal") return 95;
  return 80;
};

export const ResultTable = ({ table }: ResultTableProps) => {
  const { language } = useAppLanguage();
  const strings = getAppStrings(language);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAayamu, setSelectedAayamu] = useState<string[]>(['1', '3', '5', '7']);
  const [selectedNakshatram, setSelectedNakshatram] = useState<string[]>(
    Array.from({ length: 27 }, (_, i) => String(i + 1))
  );
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [tempAayamu, setTempAayamu] = useState<string[]>(selectedAayamu);
  const [tempNakshatram, setTempNakshatram] = useState<string[]>(selectedNakshatram);
  const rowsPerPage = 50;

  // Sync state when modal is opened
  useEffect(() => {
    if (filterModalVisible) {
      setTempAayamu(selectedAayamu);
      setTempNakshatram(selectedNakshatram);
    }
  }, [filterModalVisible, selectedAayamu, selectedNakshatram]);

  useEffect(() => {
    setCurrentPage(1);
  }, [table, selectedAayamu, selectedNakshatram]);

  if (!table.visible) {
    return null;
  }

  const filteredRows = useMemo(() => {
    return table.rows?.filter((row) => {
      if (table.title !== "Result Table 3") return true;
      if (!row.columns || row.columns.length === 0) return true;
      
      const aayamuRounded = row.columns[row.columns.length - 1];
      const nakshatramVal = row.columns[5]; // Nakshatram index in columns list is 5 (decimal, dhan, run, tith, vaar, nakshatram)
      
      return selectedAayamu.includes(aayamuRounded.trim()) &&
             selectedNakshatram.includes(nakshatramVal.trim());
    }) || [];
  }, [table, selectedAayamu, selectedNakshatram]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = useMemo(() => filteredRows.slice(startIndex, startIndex + rowsPerPage), [filteredRows, startIndex, rowsPerPage]);

  const renderedTableBody = useMemo(() => {
    if (table.headers) {
      return (
        <View style={{ overflow: "scroll" }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Header Row */}
              <View style={[styles.row, { backgroundColor: palette.surfaceWarm, paddingVertical: 8, paddingHorizontal: spacing.sm }]}>
                {table.headers.map((header, i) => {
                  const translatedHeader = strings.resultTableLabels?.[header] || header;
                  const isPadamu = header === "Padamu" || translatedHeader === "పదము" || translatedHeader === "पदम";
                  return (
                    <Text key={i} style={[styles.value, { width: getColWidth(header), textAlign: "center", fontWeight: "bold", fontSize: 12 }, isPadamu && { color: "#8B0000" }]}>
                      {translatedHeader}
                    </Text>
                  );
                })}
              </View>
              
              {currentRows.map((row, index) => {
                const translatedLabel = strings.resultTableLabels?.[row.label] || row.label;
                const isTara = row.label === "Owner Tara Phalam" || row.label === "Wife Tara Phalam";
                const translateTara = (v: string) => {
                  if (!isTara) return v;
                  const idx = parseInt(v, 10) - 1;
                  let res = (idx >= 0 && idx <= 8) ? (strings.taraPhalam?.[idx] || v) : v;
                  res = res.replace(/^\d+\.\s*/, "");
                  if (row.label === "Wife Tara Phalam") {
                    res = res.split(/\s*[-–]\s*/)[0];
                  }
                  return res;
                };
                return (
                <View
                  key={`${row.label}-${index}`}
                  style={[
                    styles.row,
                    { paddingHorizontal: spacing.sm },
                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                  ]}
                >
                  <Text style={[styles.value, { width: 80, textAlign: "center", fontSize: 12, color: "#8B0000", fontWeight: "bold" }]}>{translatedLabel}</Text>
                  {row.columns?.map((col, i) => {
                    const headerKey = table.headers[i + 1] || "";
                    return (
                      <Text key={i} style={[styles.value, { width: getColWidth(headerKey), textAlign: "center", fontSize: 12 }]}>
                        {translateTara(col)}
                      </Text>
                    );
                  })}
                </View>
                );
              })}</View>
          </ScrollView>
        </View>
      );
    } else {
      return (
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
            const isPadamu = row.label === "Padamu" || translatedLabel === "పదము" || translatedLabel === "पदम";
            const isTara = row.label === "Owner Tara Phalam" || row.label === "Wife Tara Phalam";
            const translateTara = (v?: string) => {
              if (!isTara || !v) return v;
              const idx = parseInt(v, 10) - 1;
              let res = (idx >= 0 && idx <= 8) ? (strings.taraPhalam?.[idx] || v) : v;
              res = res.replace(/^\d+\.\s*/, "");
              if (row.label === "Wife Tara Phalam") {
                res = res.split(/\s*[-–]\s*/)[0];
              }
              return res;
            };
            return (
              <View
                key={`${row.label}-${index}`}
                style={[
                  styles.row,
                  index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                ]}
              >
                <Text style={[styles.label, isPadamu && { color: "#8B0000", fontWeight: "bold" }]}>{translatedLabel}</Text>
                {isTara ? (
                  <Text style={[styles.value, { flex: 1, textAlign: "right" }]}>{translateTara(row.value)}</Text>
                ) : (
                  <>
                    <Text style={[styles.value, row.roundedValue ? { flex: 1, textAlign: "center" } : {}, isPadamu && { color: "#8B0000" }]}>{row.value}</Text>
                    {row.roundedValue && <Text style={[styles.value, isPadamu && { color: "#8B0000" }]}>{row.roundedValue}</Text>}
                  </>
                )}
              </View>
            );
          })}
        </View>
      );
    }
  }, [table.headers, table.rows, currentRows, strings]);

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
        {table.title === "Result Table 3" && (
          <TouchableOpacity 
            style={styles.filterBtn}
            onPress={() => setFilterModalVisible(true)}
          >
            <FontAwesome name="filter" size={14} color="#FFFFFF" />
            <Text style={styles.filterBtnText}>
              Filters ({selectedAayamu.length} Aayamu, {selectedNakshatram.length === 27 ? "All" : `${selectedNakshatram.length}`} Nakshatram)
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Memoized Table Body */}
      {renderedTableBody}

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

      {/* Bottom Sheet Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Table 3 Results</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Aayamu Section */}
              <Text style={styles.filterSectionTitle}>Aayamu</Text>
              <View style={styles.chipContainer}>
                {['1', '3', '5', '7'].map((val) => {
                  const isSelected = tempAayamu.includes(val);
                  return (
                    <TouchableOpacity
                      key={val}
                      style={[
                        styles.chip,
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() => {
                        if (tempAayamu.includes(val)) {
                          setTempAayamu(tempAayamu.filter(item => item !== val));
                        } else {
                          setTempAayamu([...tempAayamu, val].sort());
                        }
                      }}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                        Aayamu {val}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Nakshatram Section */}
              <View style={styles.shortcutRow}>
                <Text style={[styles.filterSectionTitle, { marginTop: 0 }]}>Nakshatram</Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <TouchableOpacity onPress={() => setTempNakshatram(Array.from({ length: 27 }, (_, i) => String(i + 1)))}>
                    <Text style={styles.shortcutText}>Select All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setTempNakshatram([])}>
                    <Text style={styles.shortcutText}>Clear All</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.gridContainer}>
                {Array.from({ length: 27 }, (_, i) => String(i + 1)).map((val) => {
                  const isSelected = tempNakshatram.includes(val);
                  return (
                    <TouchableOpacity
                      key={val}
                      style={[
                        styles.gridChip,
                        isSelected && styles.gridChipSelected,
                      ]}
                      onPress={() => {
                        if (tempNakshatram.includes(val)) {
                          setTempNakshatram(tempNakshatram.filter(item => item !== val));
                        } else {
                          setTempNakshatram([...tempNakshatram, val].sort((a, b) => parseInt(a) - parseInt(b)));
                        }
                      }}
                    >
                      <Text style={[styles.gridChipText, isSelected && styles.gridChipTextSelected]}>
                        {val}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Apply Button */}
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.applyBtn}
                onPress={() => {
                  setSelectedAayamu(tempAayamu);
                  setSelectedNakshatram(tempNakshatram);
                  setFilterModalVisible(false);
                }}
              >
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF8F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 28,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EFE3C7",
    paddingBottom: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A0008",
  },
  closeBtn: {
    fontSize: 20,
    color: "#8C6A6A",
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  modalBody: {
    flexGrow: 0,
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#C9830A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#EFE3C7",
    backgroundColor: "#FFFFFF",
  },
  chipSelected: {
    borderColor: "#B71C1C",
    backgroundColor: "#FFEBEE",
  },
  chipText: {
    fontSize: 13,
    color: "#5C3D3D",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#B71C1C",
    fontWeight: "bold",
  },
  shortcutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  shortcutText: {
    fontSize: 12,
    color: "#B71C1C",
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  gridChip: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#EFE3C7",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  gridChipSelected: {
    borderColor: "#B71C1C",
    backgroundColor: "#FFEBEE",
  },
  gridChipText: {
    fontSize: 12,
    color: "#5C3D3D",
    fontWeight: "600",
  },
  gridChipTextSelected: {
    color: "#B71C1C",
    fontWeight: "bold",
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: "#EFE3C7",
    paddingTop: 16,
    marginTop: 12,
  },
  applyBtn: {
    backgroundColor: "#B71C1C",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#B71C1C",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  filterBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    marginLeft: 6,
  }
});
