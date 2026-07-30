import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";
import { OptionItem } from "@/types/vastu";

type SearchableSelectProps = {
  label: string;
  value: string;
  options: OptionItem[];
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  isBold?: boolean;
  language?: string;
};

export const SearchableSelect = ({
  label,
  value,
  options,
  placeholder = "Select",
  error,
  onChange,
  isBold = false,
  language,
}: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  );

  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label ?? "";
  const selectedTextColor = selectedOption?.textColor;

  const hasTableFormat = options.some((o) => o.relationText !== undefined);

  const renderHeader = () => {
    if (!hasTableFormat) return null;
    const col1 = language === "Telugu" ? "దిశ" : (language === "Hindi" ? "दिशा" : "Direction");
    const col2 = language === "Telugu" ? "వర్గ సంబంధం" : (language === "Hindi" ? "वर्ग संबंध" : "Relation");
    return (
      <View style={styles.tableHeaderRow}>
        <View style={styles.headerCheckSpace} />
        <Text style={[styles.tableHeaderCell, { flex: 1.2 }]}>{col1}</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}>{col2}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.selector,
          error ? styles.selectorError : null,
          pressed ? styles.selectorPressed : null,
        ]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[
            styles.selectorText,
            !selectedLabel ? styles.placeholder : null,
            (selectedTextColor && !selectedOption?.relationText) ? { color: selectedTextColor } : null,
            selectedOption?.relationText ? { color: "#000000" } : null,
            isBold ? { fontFamily: "Manrope_700Bold", fontWeight: "700" } : null,
          ]}
        >
          {selectedLabel || placeholder}
        </Text>
        <Text style={styles.chevron}>▾</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={styles.modalCard}>
          {/* Modal header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleRow}>
              <View style={styles.modalTitleAccent} />
              <Text style={styles.modalTitle}>{label}</Text>
            </View>
            <Pressable
              style={styles.closeBtn}
              onPress={() => { setSearch(""); setOpen(false); }}
            >
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.modalDivider} />

          <TextInput
            placeholder="Search..."
            placeholderTextColor={palette.secondaryText}
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  item.value === value ? styles.optionSelected : null,
                  pressed ? styles.optionPressed : null,
                  item.disabled ? { opacity: 0.5 } : null,
                ]}
                onPress={() => {
                  if (item.disabled) {
                    if (item.disabledMessage) {
                      Alert.alert(label, item.disabledMessage);
                    }
                    return;
                  }
                  onChange(item.value);
                  setSearch("");
                  setOpen(false);
                }}
              >
                {item.value === value ? (
                  <Text style={styles.checkIcon}>✔</Text>
                ) : (
                  <View style={styles.emptyCheck} />
                )}
                {item.relationText ? (
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 10 }}>
                    <Text
                      style={[
                        styles.optionText,
                        { color: "#000000", flex: 1.2 },
                        item.value === value ? styles.optionTextSelected : null,
                        isBold ? { fontFamily: "Manrope_700Bold", fontWeight: "700" } : null,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Manrope_700Bold",
                        fontWeight: "700",
                        fontSize: 14,
                        color: item.textColor || palette.text,
                        flex: 1,
                        textAlign: "right",
                      }}
                    >
                      {item.relationText}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value ? styles.optionTextSelected : null,
                      item.textColor ? { color: item.textColor } : null,
                      isBold ? { fontFamily: "Manrope_700Bold", fontWeight: "700" } : null,
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <Text style={styles.empty}>No matches found.</Text>
            }
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: palette.textMedium,
    marginBottom: 8,
  },
  selector: {
    backgroundColor: palette.surfaceInput,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    minHeight: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  selectorError: {
    borderColor: palette.errorRed,
    borderWidth: 1.5,
  },
  selectorPressed: {
    opacity: 0.9,
    backgroundColor: "#FFF0E0",
  },
  selectorText: {
    ...typography.body,
    color: palette.text,
    flex: 1,
  },
  placeholder: {
    color: palette.secondaryText,
  },
  chevron: {
    fontSize: 14,
    color: palette.primary,
    marginLeft: 8,
  },
  error: {
    marginTop: 5,
    color: palette.errorRed,
    ...typography.caption,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(90, 0, 8, 0.45)",
  },
  modalCard: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    top: "10%",
    bottom: "10%",
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#B71C1C",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  modalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalTitleAccent: {
    width: 3,
    height: 18,
    borderRadius: 2,
    backgroundColor: palette.primary,
  },
  modalTitle: {
    ...typography.sectionTitle,
    color: palette.primary,
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    fontSize: 12,
    color: palette.primary,
    fontWeight: "700",
  },
  modalDivider: {
    height: 1,
    backgroundColor: palette.border,
    marginBottom: spacing.md,
  },
  search: {
    backgroundColor: palette.surfaceInput,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 48,
    marginBottom: spacing.md,
    color: palette.text,
    ...typography.body,
  },
  option: {
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: cornerRadius.sm,
    paddingHorizontal: 6,
  },
  optionSelected: {
    backgroundColor: palette.primaryLight,
  },
  optionPressed: {
    backgroundColor: "#FFF5F5",
  },
  checkIcon: {
    fontSize: 12,
    color: palette.primary,
    width: 16,
    textAlign: "center",
  },
  emptyCheck: {
    width: 16,
  },
  optionText: {
    ...typography.body,
    color: palette.text,
    flex: 1,
  },
  optionTextSelected: {
    color: palette.primary,
    fontFamily: "Manrope_600SemiBold",
  },
  separator: {
    height: 1,
    backgroundColor: palette.border,
    marginHorizontal: 6,
  },
  empty: {
    ...typography.body,
    color: palette.secondaryText,
    paddingTop: spacing.lg,
    textAlign: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FDF2F4",
    paddingHorizontal: 8,
    borderRadius: cornerRadius.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: "#EFE3C7",
  },
  headerCheckSpace: {
    width: 26,
  },
  tableHeaderCell: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    fontWeight: "700",
    color: "#2C1A1A",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
