import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
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
  vargu: "",
  phoneNumber: "",
  wifeName: "",
  wifeNakshatram: "",
  wifeVargu: "",
  direction: "",
  lengthFeet: "",
  lengthInch: "",
  lengthNullu: "",
  widthFeet: "",
  widthInch: "",
  widthNullu: "",
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
  const [table1a, setTable1a] = useState<ResultTableType | null>(null);
  const [table1b, setTable1b] = useState<ResultTableType | null>(null);
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

  const handleCalc1 = () => { 
    const r = calculateVastuReport(form); 
    setTable1(r.summaryTables[0]); 
    setTable1a(r.splitTable1a || null);
    setTable1b(r.splitTable1b || null);
  };
  const handleCalc2 = () => { const r = calculateVastuReport(form); setTable2(r.summaryTables[1]); };
  const handleCalc3 = () => { const r = calculateVastuReport(form); setTable3(r.summaryTables[2]); };

  const handleClear1 = () => { setTable1(null); setTable1a(null); setTable1b(null); };
  const handleClear2 = () => setTable2(null);
  const handleClear3 = () => setTable3(null);

  const downloadPdf = async (
    table: ResultTableType,
    setLoading: (v: boolean) => void,
  ) => {
    setLoading(true);
    // Allow UI to render loading spinner before heavy PDF task
    await new Promise(r => setTimeout(r, 100));
    try {
      const fakeReport = {
        summaryTables: [table, table, table] as [ResultTableType, ResultTableType, ResultTableType],
        status: "success" as const,
        notes: [],
      };
      await generateVastuPdf(form, fakeReport);
    } catch (e) {
      console.error(e);
      alert("Failed to generate PDF. Please try again.");
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

  const ResultBlock1 = () => {
    if (!table1 || !table1a || !table1b) return null;
    return (
      <View style={styles.resultBlock}>
        <ResultTable table={{ ...table1a, visible: true }} />
        <ResultTable table={{ ...table1b, visible: true }} />
        <Pressable
          onPress={() => downloadPdf(table1, setPdfLoading1)}
          style={({ pressed }) => [styles.pdfBtn, pressed && styles.btnPressed]}
          disabled={pdfLoading1}
        >
          <LinearGradient
            colors={["#B71C1C", "#8B000F"]} // Trigger fast refresh
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.pdfBtnGradient}
          >
            {pdfLoading1 ? (
              <ActivityIndicator color="#FFD95C" />
            ) : (
              <Text style={styles.pdfBtnText}>⬇ {strings.home.downloadPdf}</Text>
            )}
          </LinearGradient>
        </Pressable>
      </View>
    );
  };

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
            <Image 
              source={require("../../assets/icon1.jpg")} 
              style={styles.bannerIconImage} 
            />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.festivalTitle}>{strings.home.festivalTitle}</Text>
              <Text style={styles.festivalSub}>{strings.home.festivalSub}</Text>
            </View>
            <Text style={styles.festivalIcon}>🏠</Text>
          </LinearGradient>

          {/* App Title & Language Banner */}
          <LinearGradient
            colors={["#5A0008", "#8B000F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.appTitleBanner}
          >
            <View style={styles.appTitleRow}>
              <View style={styles.appTitleLeft}>
                <Text style={styles.appTitleText}>{strings.home.title}</Text>
                <Text style={styles.appTitleSub}>Viswakarma Vastu Sarvaswam</Text>
              </View>
              
              <View style={styles.appTitleRight}>
                <Pressable
                  style={styles.bannerLangDropdown}
                  onPress={() => {
                     const nextMap: Record<string, string> = {
                        English: "Telugu",
                        Telugu: "Hindi",
                        Hindi: "English",
                     };
                     const nextLang = nextMap[language] || "English";
                     setLanguage(nextLang as typeof language);
                     updateField("language", nextLang);
                  }}
                >
                  <Text style={styles.bannerLangText}>
                    {language === "English" ? "English" : language === "Telugu" ? "తెలుగు" : "हिंदी"}
                  </Text>
                  <Text style={styles.bannerLangIcon}>▾</Text>
                </Pressable>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.sectionDivider}>
            <View style={styles.divLine} />
            <Text style={styles.divText}>{strings.home.introSubtitle}</Text>
            <View style={styles.divLine} />
          </View>

          {/* Owner Information (Yajamani) */}
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
            <View style={styles.rowEqual}>
              <View style={styles.col}>
                <SearchableSelect
                  label={strings.home.nakshatramLabel}
                  value={form.nakshatram}
                  options={strings.nakshatrams}
                  placeholder={strings.home.nakshatramPlaceholder}
                  onChange={(value) => updateField("nakshatram", value)}
                />
              </View>
              <View style={styles.col}>
                <SearchableSelect
                  label={strings.home.varguLabel}
                  value={form.vargu}
                  options={strings.vargus}
                  placeholder={strings.home.varguPlaceholder}
                  onChange={(value) => updateField("vargu", value)}
                />
              </View>
            </View>
          </SectionCard>

          {/* Contact Information */}
          <SectionCard
            title={strings.home.phoneLabel || "Contact Information"}
            subtitle="Enter WhatsApp number for the report"
          >
            <PremiumInput
              label={strings.home.phoneLabel || "Phone Number"}
              value={form.phoneNumber}
              placeholder="e.g. 9949598627"
              keyboardType="phone-pad"
              onChangeText={(text) =>
                updateField("phoneNumber", digitsOnly(text))
              }
            />
          </SectionCard>

          {/* Wife Information (Yajamaniralu) */}
          <SectionCard
            title={strings.home.wifeInfoTitle}
            subtitle={strings.home.wifeInfoSubtitle}
          >
            <PremiumInput
              label={strings.home.wifeNameLabel}
              value={form.wifeName}
              placeholder={strings.home.wifeNamePlaceholder}
              autoCapitalize="words"
              onChangeText={(text) =>
                updateField("wifeName", text.replace(/[^A-Za-z\s]/g, ""))
              }
            />
            <View style={styles.rowEqual}>
              <View style={styles.col}>
                <SearchableSelect
                  label={strings.home.wifeNakshatramLabel}
                  value={form.wifeNakshatram}
                  options={strings.nakshatrams}
                  placeholder={strings.home.wifeNakshatramPlaceholder}
                  onChange={(value) => updateField("wifeNakshatram", value)}
                />
              </View>
              <View style={styles.col}>
                <SearchableSelect
                  label={strings.home.wifeVarguLabel}
                  value={form.wifeVargu}
                  options={strings.vargus}
                  placeholder={strings.home.wifeVarguPlaceholder}
                  onChange={(value) => updateField("wifeVargu", value)}
                />
              </View>
            </View>
          </SectionCard>

          {/* Direction Details */}
          <SectionCard
            title={strings.home.propertyTitle}
            subtitle={strings.home.propertySubtitle}
          >
            <SearchableSelect
              label={strings.home.directionLabel}
              value={form.direction}
              options={strings.directions}
              placeholder={strings.home.directionPlaceholder}
              onChange={(value) => updateField("direction", value)}
            />
          </SectionCard>

          {/* Plot Length */}
          <SectionCard
            title={strings.home.plotLengthTitle}
            subtitle={strings.home.plotLengthSubtitle}
          >
            <View style={styles.row}>
              <View style={styles.col}>
                <PremiumInput
                  label={strings.home.lengthFeetLabel}
                  value={form.lengthFeet}
                  placeholder="0"
                  keyboardType="number-pad"
                  onChangeText={(t) => updateField("lengthFeet", digitsOnly(t))}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.inlinePickerLabel}>{strings.home.lengthInchLabel}</Text>
                <View style={styles.inlinePickerBox}>
                  <Picker
                    selectedValue={form.lengthInch || "0"}
                    onValueChange={(v) => updateField("lengthInch", String(v))}
                    style={styles.inlinePicker}
                    dropdownIconColor="#8B000F"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <Picker.Item key={i} label={String(i)} value={String(i)} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.inlinePickerLabel}>{strings.home.lengthNulluLabel}</Text>
                <View style={styles.inlinePickerBox}>
                  <Picker
                    selectedValue={form.lengthNullu || "0"}
                    onValueChange={(v) => updateField("lengthNullu", String(v))}
                    style={styles.inlinePicker}
                    dropdownIconColor="#8B000F"
                  >
                    {Array.from({ length: 8 }, (_, i) => (
                      <Picker.Item key={i} label={String(i)} value={String(i)} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
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
                <Text style={styles.inlinePickerLabel}>{strings.home.widthInchLabel}</Text>
                <View style={styles.inlinePickerBox}>
                  <Picker
                    selectedValue={form.widthInch || "0"}
                    onValueChange={(v) => updateField("widthInch", String(v))}
                    style={styles.inlinePicker}
                    dropdownIconColor="#8B000F"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <Picker.Item key={i} label={String(i)} value={String(i)} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.inlinePickerLabel}>{strings.home.widthNulluLabel}</Text>
                <View style={styles.inlinePickerBox}>
                  <Picker
                    selectedValue={form.widthNullu || "0"}
                    onValueChange={(v) => updateField("widthNullu", String(v))}
                    style={styles.inlinePicker}
                    dropdownIconColor="#8B000F"
                  >
                    {Array.from({ length: 8 }, (_, i) => (
                      <Picker.Item key={i} label={String(i)} value={String(i)} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </SectionCard>

          <ActionRow onCalc={handleCalc1} onClear={handleClear1} />
          <ResultBlock1 />

          {/* Suddha Padham */}
          <SectionCard
            title={strings.home.suddhaTitle}
            subtitle={strings.home.suddhaSubtitle}
          >
            <View style={styles.row}>
              <View style={styles.colWide}>
                <PremiumInput
                  label={strings.home.suddhaPadhamLabel}
                  value={form.suddhaPadham}
                  placeholder={strings.home.suddhaPadhamPlaceholder}
                  keyboardType="numeric"
                  onChangeText={(t) => updateField("suddhaPadham", t)}
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
                <Text style={styles.inlinePickerLabel}>{strings.home.inchLabel}</Text>
                <View style={styles.inlinePickerBox}>
                  <Picker
                    selectedValue={form.suddhaInch || "0"}
                    onValueChange={(v) => updateField("suddhaInch", String(v))}
                    style={styles.inlinePicker}
                    dropdownIconColor="#8B000F"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <Picker.Item key={i} label={String(i)} value={String(i)} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.col}>
                <Text style={styles.inlinePickerLabel}>{strings.home.nulluLabel}</Text>
                <View style={styles.inlinePickerBox}>
                  <Picker
                    selectedValue={form.suddhaNullu || "0"}
                    onValueChange={(v) => updateField("suddhaNullu", String(v))}
                    style={styles.inlinePicker}
                    dropdownIconColor="#8B000F"
                  >
                    {Array.from({ length: 8 }, (_, i) => (
                      <Picker.Item key={i} label={String(i)} value={String(i)} />
                    ))}
                  </Picker>
                </View>
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

  /* App Title & Language Banner */
  appTitleBanner: {
    borderRadius: cornerRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: "#8B000F",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.3)",
  },
  appTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appTitleLeft: {
    flex: 1,
    paddingRight: 10,
  },
  appTitleText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 20,
    color: "#FFD95C",
    lineHeight: 26,
  },
  appTitleSub: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: "#FFF8F0",
    opacity: 0.8,
  },
  appTitleRight: {
    flexShrink: 0,
  },
  bannerLangDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.4)",
    borderRadius: cornerRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  bannerLangText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#FFF8F0",
  },
  bannerLangIcon: {
    fontSize: 14,
    color: "#FFD95C",
  },

  /* Festival banner */
  festivalBanner: {
    borderRadius: cornerRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#F4C430",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bannerIconImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  bannerTextContainer: {
    flex: 1,
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
  rowEqual: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  col: { flex: 1, minWidth: 88 },
  colWide: { flex: 1.3, minWidth: 120 },

  /* Inline Picker — matches SearchableSelect visually */
  inlinePickerLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: palette.textMedium,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  inlinePickerBox: {
    backgroundColor: palette.surfaceInput,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    minHeight: 50,
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  inlinePicker: {
    height: 50,
    color: palette.text,
    marginHorizontal: -4,
  },

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
});
