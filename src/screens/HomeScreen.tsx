import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SectionCard } from "@/components/SectionCard";
import { PremiumInput } from "@/components/PremiumInput";
import { SearchableSelect } from "@/components/SearchableSelect";
import { ResultTable } from "@/components/ResultTable";
import { ScreenHeader } from "@/components/ScreenHeader";
import { calculateVastuReport } from "@/calculationEngine/calculateVastuReport";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { generateVastuPdf } from "@/pdf/generateVastuPdf";
import { getAppStrings } from "@/i18n/strings";
import {
  directionOptions,
  languageOptions,
  nakshatramOptions,
  padhamOptions,
} from "@/constants/content";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";
import { ResultTable as ResultTableType, VastuFormValues } from "@/types/vastu";
import { digitsOnly } from "@/utils/number";

const initialForm: VastuFormValues = {
  language: "English",
  ownerName: "",
  nakshatram: "",
  direction: "",
  widthFeet: "",
  widthInch: "",
  widthNullu: "",
  depthFeet: "",
  depthInch: "",
  depthNullu: "",
  suddhaPadham: "",
  suddhaFeet: "",
  suddhaInch: "",
  suddhaNullu: "",
  firstSuddhaPadham: "",
  secondSuddhaPadham: "",
};

export const HomeScreen = () => {
  const { language, setLanguage } = useAppLanguage();
  const strings = getAppStrings(language);

  const [form, setForm] = useState<VastuFormValues>(initialForm);

  // Three independent result tables
  const [table1, setTable1] = useState<ResultTableType | null>(null);
  const [table2, setTable2] = useState<ResultTableType | null>(null);
  const [table3, setTable3] = useState<ResultTableType | null>(null);

  // PDF loading states per table
  const [pdfLoading1, setPdfLoading1] = useState(false);
  const [pdfLoading2, setPdfLoading2] = useState(false);
  const [pdfLoading3, setPdfLoading3] = useState(false);

  const updateField = <K extends keyof VastuFormValues>(
    key: K,
    value: VastuFormValues[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  // ── Calculate handlers — each extracts its own table ──
  const handleCalc1 = () => {
    const report = calculateVastuReport(form);
    setTable1(report.summaryTables[0]);
  };

  const handleCalc2 = () => {
    const report = calculateVastuReport(form);
    setTable2(report.summaryTables[1]);
  };

  const handleCalc3 = () => {
    const report = calculateVastuReport(form);
    setTable3(report.summaryTables[2]);
  };

  // ── Clear handlers — clear respective table ──
  const handleClear1 = () => { setTable1(null); };
  const handleClear2 = () => { setTable2(null); };
  const handleClear3 = () => { setTable3(null); };

  // ── PDF download — wraps the single table into a minimal report ──
  const downloadPdf = async (
    table: ResultTableType,
    setLoading: (v: boolean) => void,
  ) => {
    setLoading(true);
    try {
      const fakeReport = {
        summaryTables: [table, table, table] as [ResultTableType, ResultTableType, ResultTableType],
        status: "success" as const,
        notes: [],
      };
      await generateVastuPdf(form, fakeReport);
    } finally {
      setLoading(false);
    }
  };

  // ── Reusable inline Calculate / Clear row ──
  const ActionRow = ({
    onCalc,
    onClear,
  }: {
    onCalc: () => void;
    onClear: () => void;
  }) => (
    <View style={styles.actionPair}>
      <Pressable
        onPress={onCalc}
        style={({ pressed }) => [styles.calcBtn, pressed && styles.btnPressed]}
      >
        <Text style={styles.calcBtnText}>⚡ {strings.home.calculate}</Text>
      </Pressable>
      <Pressable
        onPress={onClear}
        style={({ pressed }) => [styles.clearBtn, pressed && styles.btnPressed]}
      >
        <Text style={styles.clearBtnText}>✕ Clear</Text>
      </Pressable>
    </View>
  );

  // ── Result block: table + PDF button ──
  const ResultBlock = ({
    table,
    loading,
    onDownload,
  }: {
    table: ResultTableType | null;
    loading: boolean;
    onDownload: () => void;
  }) => {
    if (!table) return null;
    return (
      <View style={styles.resultBlock}>
        <ResultTable table={{ ...table, visible: true }} />
        <Pressable
          onPress={onDownload}
          style={({ pressed }) => [
            styles.pdfBtn,
            pressed && styles.btnPressed,
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.pdfBtnText}>⬇ {strings.home.downloadPdf}</Text>
          )}
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title={strings.home.title}
          subtitle={strings.home.subtitle}
        />

        {/* Language */}
        <SectionCard title={strings.home.languageLabel}>
          <SearchableSelect
            label={strings.home.languageLabel}
            value={language}
            options={languageOptions}
            placeholder={strings.home.languagePlaceholder}
            onChange={(value) => {
              setLanguage(value as typeof language);
              updateField("language", value);
            }}
          />
        </SectionCard>

        <View style={styles.formIntro}>
          <Text style={styles.formSubtitle}>{strings.home.introSubtitle}</Text>
        </View>

        {/* Owner Information */}
        <SectionCard
          title={strings.home.ownerInfoTitle}
          subtitle={strings.home.ownerInfoSubtitle}
        >
          <PremiumInput
            label={strings.home.ownerNameLabel}
            value={form.ownerName}
            placeholder={strings.home.ownerNamePlaceholder}
            autoCapitalize="words"
            onChangeText={(text) =>
              updateField("ownerName", text.replace(/[^A-Za-z\s]/g, ""))
            }
          />
        </SectionCard>

        {/* Property Details */}
        <SectionCard
          title={strings.home.propertyTitle}
          subtitle={strings.home.propertySubtitle}
        >
          <SearchableSelect
            label={strings.home.nakshatramLabel}
            value={form.nakshatram}
            options={nakshatramOptions}
            placeholder={strings.home.nakshatramPlaceholder}
            onChange={(value) => updateField("nakshatram", value)}
          />
          <SearchableSelect
            label={strings.home.directionLabel}
            value={form.direction}
            options={directionOptions}
            placeholder={strings.home.directionPlaceholder}
            onChange={(value) => updateField("direction", value)}
          />
        </SectionCard>

        {/* ════════════════════════════════════════
            Plot Width
        ════════════════════════════════════════ */}
        <SectionCard
          title={strings.home.plotWidthTitle}
          subtitle={strings.home.plotWidthSubtitle}
        >
          <View style={styles.row}>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.widthFeetLabel}
                value={form.widthFeet}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("widthFeet", digitsOnly(t))}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.widthInchLabel}
                value={form.widthInch}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("widthInch", digitsOnly(t))}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.widthNulluLabel}
                value={form.widthNullu}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("widthNullu", digitsOnly(t))}
              />
            </View>
          </View>
        </SectionCard>

        {/* ════════════════════════════════════════
            Plot Depth
        ════════════════════════════════════════ */}
        <SectionCard
          title={strings.home.plotDepthTitle}
          subtitle={strings.home.plotDepthSubtitle}
        >
          <View style={styles.row}>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.depthFeetLabel}
                value={form.depthFeet}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("depthFeet", digitsOnly(t))}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.depthInchLabel}
                value={form.depthInch}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("depthInch", digitsOnly(t))}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.depthNulluLabel}
                value={form.depthNullu}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("depthNullu", digitsOnly(t))}
              />
            </View>
          </View>
        </SectionCard>

        {/* ── Action Row 1 ── */}
        <ActionRow onCalc={handleCalc1} onClear={handleClear1} />

        {/* ── Table 1 Result + PDF ── */}
        <ResultBlock
          table={table1}
          loading={pdfLoading1}
          onDownload={() => table1 && downloadPdf(table1, setPdfLoading1)}
        />

        {/* ════════════════════════════════════════
            Suddha Padham
        ════════════════════════════════════════ */}
        <SectionCard
          title={strings.home.suddhaTitle}
          subtitle={strings.home.suddhaSubtitle}
        >
          <View style={styles.row}>
            <View style={styles.colWide}>
              <SearchableSelect
                label={strings.home.suddhaPadhamLabel}
                value={form.suddhaPadham}
                options={padhamOptions}
                placeholder={strings.home.suddhaPadhamPlaceholder}
                onChange={(value) => updateField("suddhaPadham", value)}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.feetLabel}
                value={form.suddhaFeet}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("suddhaFeet", digitsOnly(t))}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.inchLabel}
                value={form.suddhaInch}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("suddhaInch", digitsOnly(t))}
              />
            </View>
            <View style={styles.col}>
              <PremiumInput
                label={strings.home.nulluLabel}
                value={form.suddhaNullu}
                placeholder="0"
                keyboardType="number-pad"
                onChangeText={(t) => updateField("suddhaNullu", digitsOnly(t))}
              />
            </View>
          </View>
        </SectionCard>

        {/* ── Action Row 2 ── */}
        <ActionRow onCalc={handleCalc2} onClear={handleClear2} />

        {/* ── Table 2 Result + PDF ── */}
        <ResultBlock
          table={table2}
          loading={pdfLoading2}
          onDownload={() => table2 && downloadPdf(table2, setPdfLoading2)}
        />

        {/* ════════════════════════════════════════
            Padam with Star
        ════════════════════════════════════════ */}
        <SectionCard
          title={strings.home.padamTitle}
          subtitle={strings.home.padamSubtitle}
        >
          <View style={styles.row}>
            <View style={styles.col}>
              <SearchableSelect
                label={strings.home.firstSuddhaPadhamLabel}
                value={form.firstSuddhaPadham}
                options={padhamOptions}
                placeholder="Select"
                onChange={(value) => updateField("firstSuddhaPadham", value)}
              />
            </View>
            <View style={styles.col}>
              <SearchableSelect
                label={strings.home.secondSuddhaPadhamLabel}
                value={form.secondSuddhaPadham}
                options={padhamOptions}
                placeholder="Select"
                onChange={(value) => updateField("secondSuddhaPadham", value)}
              />
            </View>
          </View>
        </SectionCard>

        {/* ── Action Row 3 ── */}
        <ActionRow onCalc={handleCalc3} onClear={handleClear3} />

        {/* ── Table 3 Result + PDF ── */}
        <ResultBlock
          table={table3}
          loading={pdfLoading3}
          onDownload={() => table3 && downloadPdf(table3, setPdfLoading3)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    backgroundColor: palette.background,
  },

  formIntro: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  formSubtitle: {
    ...typography.description,
    color: palette.secondaryText,
  },

  row: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  col: { flex: 1, minWidth: 100 },
  colWide: { flex: 1.3, minWidth: 140 },

  /* ── Inline Calculate / Clear pair ── */
  actionPair: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
    marginTop: 2,
  },
  calcBtn: {
    flex: 3,
    borderRadius: cornerRadius.md,
    backgroundColor: palette.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    shadowColor: palette.primary,
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  calcBtnText: {
    ...typography.button,
    fontSize: 14,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  clearBtn: {
    flex: 1.4,
    borderRadius: cornerRadius.md,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#2E2118",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  clearBtnText: {
    ...typography.button,
    fontSize: 14,
    color: palette.secondaryText,
  },
  btnPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },

  /* ── Result block (table + PDF button) ── */
  resultBlock: {
    marginBottom: spacing.lg,
  },
  pdfBtn: {
    borderRadius: cornerRadius.md,
    backgroundColor: palette.secondary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: spacing.lg,
    marginTop: 2,
    shadowColor: palette.secondary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pdfBtnText: {
    ...typography.button,
    fontSize: 14,
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
