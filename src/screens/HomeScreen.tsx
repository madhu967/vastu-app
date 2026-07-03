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
import { LinearGradient } from "expo-linear-gradient";
import { SectionCard } from "@/components/SectionCard";
import { PremiumInput } from "@/components/PremiumInput";
import { SearchableSelect } from "@/components/SearchableSelect";
import { ResultTable } from "@/components/ResultTable";
import { ScreenHeader } from "@/components/ScreenHeader";
import { FooterSection, PhoneFAB } from "@/components/FooterSection";
import { calculateVastuReport } from "@/calculationEngine/calculateVastuReport";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { generateVastuPdf } from "@/pdf/generateVastuPdf";
import { getAppStrings } from "@/i18n/strings";
import {
  languageOptions,
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

  const [table1, setTable1] = useState<ResultTableType | null>(null);
  const [table2, setTable2] = useState<ResultTableType | null>(null);
  const [table3, setTable3] = useState<ResultTableType | null>(null);

  const [pdfLoading1, setPdfLoading1] = useState(false);
  const [pdfLoading2, setPdfLoading2] = useState(false);
  const [pdfLoading3, setPdfLoading3] = useState(false);

  const updateField = <K extends keyof VastuFormValues>(
    key: K,
    value: VastuFormValues[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCalc1 = () => { const r = calculateVastuReport(form); setTable1(r.summaryTables[0]); };
  const handleCalc2 = () => { const r = calculateVastuReport(form); setTable2(r.summaryTables[1]); };
  const handleCalc3 = () => { const r = calculateVastuReport(form); setTable3(r.summaryTables[2]); };

  const handleClear1 = () => setTable1(null);
  const handleClear2 = () => setTable2(null);
  const handleClear3 = () => setTable3(null);

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

  const ActionRow = ({ onCalc, onClear }: { onCalc: () => void; onClear: () => void }) => (
    <View style={styles.actionPair}>
      {/* Gold gradient calculate button */}
      <Pressable
        onPress={onCalc}
        style={({ pressed }) => [styles.calcBtn, pressed && styles.btnPressed]}
      >
        <LinearGradient
          colors={["#F4C430", "#C9830A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.calcBtnGradient}
        >
          <Text style={styles.calcBtnText}> {strings.home.calculate}</Text>
        </LinearGradient>
      </Pressable>
      <Pressable
        onPress={onClear}
        style={({ pressed }) => [styles.clearBtn, pressed && styles.btnPressed]}
      >
        <Text style={styles.clearBtnText}>✕ Clear</Text>
      </Pressable>
    </View>
  );

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
          style={({ pressed }) => [styles.pdfBtn, pressed && styles.btnPressed]}
          disabled={loading}
        >
          <LinearGradient
            colors={["#B71C1C", "#8B000F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pdfBtnGradient}
          >
            {loading ? (
              <ActivityIndicator color="#FFD95C" />
            ) : (
              <Text style={styles.pdfBtnText}>⬇ {strings.home.downloadPdf}</Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.flexRelative}>
        {/* CRIMSON HEADER */}
        <ScreenHeader
          title={strings.home.title}
          subtitle={strings.home.subtitle}
        />

        {/* IVORY SCROLL BODY */}
        <ScrollView
          style={styles.scrollFlex}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Festival-style banner below header */}
          <LinearGradient
            colors={["#F4C430", "#FFD95C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.festivalBanner}
          >
            <Text style={styles.festivalIcon}>🏠</Text>
            <View>
              <Text style={styles.festivalTitle}>వాస్తు శాస్త్ర విశ్లేషణ</Text>
              <Text style={styles.festivalSub}>ఈ రోజు మీ ఇంటి వాస్తు తెలుసుకోండి</Text>
            </View>
          </LinearGradient>

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

          <View style={styles.sectionDivider}>
            <View style={styles.divLine} />
            <Text style={styles.divText}>{strings.home.introSubtitle}</Text>
            <View style={styles.divLine} />
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
              options={strings.nakshatrams}
              placeholder={strings.home.nakshatramPlaceholder}
              onChange={(value) => updateField("nakshatram", value)}
            />
            <SearchableSelect
              label={strings.home.directionLabel}
              value={form.direction}
              options={strings.directions}
              placeholder={strings.home.directionPlaceholder}
              onChange={(value) => updateField("direction", value)}
            />
          </SectionCard>

          {/* Plot Width */}
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

          {/* Plot Depth */}
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

          <ActionRow onCalc={handleCalc1} onClear={handleClear1} />
          <ResultBlock
            table={table1}
            loading={pdfLoading1}
            onDownload={() => table1 && downloadPdf(table1, setPdfLoading1)}
          />

          {/* Suddha Padham */}
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

          <ActionRow onCalc={handleCalc2} onClear={handleClear2} />
          <ResultBlock
            table={table2}
            loading={pdfLoading2}
            onDownload={() => table2 && downloadPdf(table2, setPdfLoading2)}
          />

          {/* Padam with Star */}
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

          <ActionRow onCalc={handleCalc3} onClear={handleClear3} />
          <ResultBlock
            table={table3}
            loading={pdfLoading3}
            onDownload={() => table3 && downloadPdf(table3, setPdfLoading3)}
          />

          {/* Premium Footer */}
          <FooterSection />
        </ScrollView>

        {/* Floating Phone Button */}
        <PhoneFAB />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: palette.background },
  flexRelative: { flex: 1, backgroundColor: palette.background, position: "relative" },
  scrollFlex: { flex: 1 },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 0,
    backgroundColor: palette.background,
  },

  /* Festival banner */
  festivalBanner: {
    borderRadius: cornerRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    shadowColor: "#F4C430",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  festivalIcon: { fontSize: 32, lineHeight: 38 },
  festivalTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 17,
    color: "#3B1F00",
    lineHeight: 24,
  },
  festivalSub: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "#5C3800",
    marginTop: 2,
  },

  /* Section divider */
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  divLine: {
    flex: 1,
    height: 1,
    backgroundColor: palette.border,
  },
  divText: {
    ...typography.tiny,
    color: palette.secondaryText,
    letterSpacing: 0.5,
    fontStyle: "italic",
  },

  row: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  col: { flex: 1, minWidth: 88 },
  colWide: { flex: 1.3, minWidth: 120 },

  /* Action pair */
  actionPair: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
    marginTop: 2,
  },
  calcBtn: {
    flex: 3,
    borderRadius: cornerRadius.md,
    overflow: "hidden",
    shadowColor: "#F4C430",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  calcBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  calcBtnText: {
    ...typography.button,
    color: "#3B1F00",
    letterSpacing: 0.4,
  },
  clearBtn: {
    flex: 1.4,
    borderRadius: cornerRadius.md,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  clearBtnText: {
    ...typography.button,
    fontSize: 13,
    color: palette.secondaryText,
  },
  btnPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.97 }],
  },

  /* Result block */
  resultBlock: { marginBottom: spacing.md },
  pdfBtn: {
    borderRadius: cornerRadius.md,
    overflow: "hidden",
    shadowColor: "#B71C1C",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginTop: 2,
  },
  pdfBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  pdfBtnText: {
    ...typography.button,
    color: "#FFF8F0",
    letterSpacing: 0.4,
  },

  /* Bottom ornament (replaced by FooterSection) */
});
