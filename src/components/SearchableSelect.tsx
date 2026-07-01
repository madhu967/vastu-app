import { useMemo, useState } from "react";
import {
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
};

export const SearchableSelect = ({
  label,
  value,
  options,
  placeholder = "Select",
  error,
  onChange,
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

  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

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
          ]}
        >
          {selectedLabel || placeholder}
        </Text>
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
          <Text style={styles.modalTitle}>{label}</Text>
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
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => {
                  onChange(item.value);
                  setSearch("");
                  setOpen(false);
                }}
              >
                <Text style={styles.optionText}>{item.label}</Text>
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
    color: palette.text,
    marginBottom: 10,
  },
  selector: {
    backgroundColor: palette.mist,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    paddingVertical: 15,
    minHeight: 56,
    justifyContent: "center",
  },
  selectorError: {
    borderColor: palette.secondary,
  },
  selectorPressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  selectorText: {
    ...typography.body,
    color: palette.text,
  },
  placeholder: {
    color: palette.secondaryText,
  },
  error: {
    marginTop: 6,
    color: palette.secondary,
    ...typography.caption,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(46, 33, 24, 0.48)",
  },
  modalCard: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    top: "14%",
    bottom: "14%",
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#2E2118",
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  modalTitle: {
    ...typography.sectionTitle,
    color: palette.text,
    marginBottom: spacing.md,
  },
  search: {
    backgroundColor: palette.mist,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 54,
    marginBottom: spacing.md,
    color: palette.text,
    ...typography.body,
  },
  option: {
    paddingVertical: 15,
  },
  optionText: {
    ...typography.body,
    color: palette.text,
  },
  separator: {
    height: 1,
    backgroundColor: palette.border,
  },
  empty: {
    ...typography.body,
    color: palette.secondaryText,
    paddingTop: spacing.lg,
  },
});
