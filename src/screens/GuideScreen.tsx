import { useRef, useEffect } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { ScreenHeader } from "@/components/ScreenHeader";
import { guidePages } from "@/constants/content";
import { palette, spacing, cornerRadius } from "@/constants/theme";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getLocalizedGuidePages } from "@/i18n/strings";

// ── icon map ─────────────────────────────────────────────────────────────────
const pageIcons: Record<string, string> = {
  "main-entrance": "🚪",

  kitchen:         "🍳",
  bedroom:         "🛏️",
  bathroom:        "🚿",
  "pooja-room":    "🪔",
  "dining-room":   "🍽️",
  staircase:       "🪜",
  parking:         "🚗",
  borewell:        "💧",
  "septic-tank":   "🔧",
  "plot-shapes":   "📐",
  faq:             "❓",
  contact:         "📞",
  about:           "ℹ️",
  "soil-testing":  "🌱",
  vargu:           "🔠",
  "shanku-sthapana": "🏗️",
};

// ── section number labels ─────────────────────────────────────────────────────
const romanNumerals = ["I", "II", "III", "IV", "V", "VI"];

export const GuideScreen = () => {
  const { language } = useAppLanguage();
  const route = useRoute<any>();
  const localizedPages = getLocalizedGuidePages(language, guidePages);
  const page =
    localizedPages.find((item) => item.key === route.params?.pageKey) ??
    localizedPages[0];

  const icon = pageIcons[page.key] ?? "ॐ";

  // hero entrance animation
  const heroFade  = useRef(new Animated.Value(0)).current;
  const heroShift = useRef(new Animated.Value(20)).current;
  const glowPulse = useRef(new Animated.Value(0.5)).current;
  const ringRotate= useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFade,  { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(heroShift, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1,   duration: 2000, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.5, duration: 2000, useNativeDriver: true }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(ringRotate, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [page.key]);

  const rotateDeg = ringRotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={s.container}>
      <ScreenHeader title={page.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        {/* ══════════ HERO BANNER ══════════ */}
        <Animated.View style={[s.heroWrap, { opacity: heroFade, transform: [{ translateY: heroShift }] }]}>
          <LinearGradient
            colors={["#5A0008", "#8B000F", "#B71C1C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.hero}
          >
            {/* Subtle corner ornaments */}
            <Text style={[s.heroCorner, { top: 12, left: 16 }]}>✦</Text>
            <Text style={[s.heroCorner, { top: 12, right: 16 }]}>✦</Text>

            {/* Animated icon ring */}
            <View style={s.iconWrap}>
              <Animated.View style={[s.iconRingOuter, { transform: [{ rotate: rotateDeg }] }]} />
              <Animated.View style={[s.iconGlow, { opacity: glowPulse }]} />
              <View style={s.iconCircle}>
                <Text style={s.heroIcon}>{icon}</Text>
              </View>
            </View>

            {/* Gold rule */}
            <View style={s.heroDivider}>
              <View style={s.heroDivLine} />
              <Text style={s.heroDivDot}>◆</Text>
              <View style={s.heroDivLine} />
            </View>

            <Text style={s.heroTitle}>{page.title}</Text>
            <Text style={s.heroSubtitle}>{page.subtitle}</Text>
          </LinearGradient>
        </Animated.View>

        {/* ══════════ CONTENT PARAGRAPHS ══════════ */}
        <View style={s.content}>
          {page.paragraphs && page.paragraphs.length > 0 && (
            <View style={s.paraCard}>
              {page.paragraphs.map((paragraph, pIdx) => (
                <View key={pIdx} style={s.paraRow}>
                  {/* Slim gold left accent line */}
                  <View style={s.accentBar} />
                  <Text style={s.paraText}>{paragraph}</Text>
                </View>
              ))}
            </View>
          )}

          {/* ══════════ TABLE DATA ══════════ */}
          {page.tableData && page.tableData.length > 0 && (
            <View style={s.tableCard}>
              {page.tableData.map((row, rIdx) => (
                <View key={rIdx} style={[s.tableRow, rIdx === page.tableData!.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={s.tableLabel}>{row.label}</Text>
                  <Text style={[s.tableFormula, !row.value && { textAlign: "right", flex: 2 }]}>{row.formula}</Text>
                  {row.value && <Text style={s.tableValue}>{row.value}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* ══════════ MULTI-COLUMN TABLES ══════════ */}
          {page.multiColumnTables && page.multiColumnTables.length > 0 && (
            <View style={s.multiTablesWrap}>
              {page.multiColumnTables.map((table, tIdx) => (
                <View key={tIdx} style={s.multiTableBlock}>
                  {table.title && <Text style={s.multiTableTitle}>{table.title}</Text>}
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.multiTableScroll}>
                    <View style={s.multiTableContainer}>
                      {/* Headers */}
                      <View style={[s.multiTableRow, s.multiTableHeaderRow]}>
                        {table.headers.map((header, hIdx) => (
                          <Text key={hIdx} style={[s.multiTableCell, s.multiTableHeaderCell]}>{header}</Text>
                        ))}
                      </View>
                      {/* Rows */}
                      {table.rows.map((row, rIdx) => (
                        <View key={rIdx} style={[s.multiTableRow, rIdx === table.rows.length - 1 && { borderBottomWidth: 0 }]}>
                          {row.map((cell, cIdx) => (
                            <Text key={cIdx} style={s.multiTableCell}>{cell}</Text>
                          ))}
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              ))}
            </View>
          )}

          {/* ══════════ BOTTOM CONTENT ══════════ */}
          {page.bottomContent && page.bottomContent.length > 0 && (
            <View style={s.bottomContentWrap}>
              {page.bottomContent.map((item, bIdx) => (
                <View key={bIdx} style={s.bottomItem}>
                  {item.heading ? (
                    <Text style={s.bottomHeading}>{item.heading}</Text>
                  ) : null}
                  {item.text ? (
                    <Text style={s.bottomText}>{item.text}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* ══════════ BOTTOM ORNAMENT ══════════ */}
        <View style={s.footerOrnament}>
          <View style={s.footerLine} />
          <View style={s.footerOmCircle}>
            <Text style={s.footerOmText}>ॐ</Text>
          </View>
          <View style={s.footerLine} />
        </View>
        <Text style={s.footerShanti}>ॐ शान्तिः शान्तिः शान्तिः</Text>

      </ScrollView>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    paddingBottom: 60,
    backgroundColor: palette.background,
  },

  // ══ HERO ══
  heroWrap: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    borderRadius: cornerRadius.xl,
    overflow: "hidden",
    shadowColor: "#8B000F",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  hero: {
    borderRadius: cornerRadius.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl + 4,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.25)",
  },
  heroCorner: {
    position: "absolute",
    fontSize: 12,
    color: "rgba(255,217,92,0.45)",
  },

  // icon area
  iconWrap: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  iconRingOuter: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.35)",
    borderStyle: "dashed",
  },
  iconGlow: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,217,92,0.1)",
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FFF8F0",
    borderWidth: 2,
    borderColor: "rgba(255,217,92,0.5)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFD95C",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  heroIcon: { fontSize: 30, lineHeight: 36 },

  heroDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 140,
    marginBottom: 10,
  },
  heroDivLine: { flex: 1, height: 1, backgroundColor: "rgba(255,217,92,0.4)" },
  heroDivDot:  { fontSize: 9, color: "#FFD95C" },

  heroTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 26,
    color: "#FFF8F0",
    textAlign: "center",
    lineHeight: 34,
    marginBottom: spacing.sm,
    textShadowColor: "rgba(255,217,92,0.15)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: "rgba(255,248,240,0.72)",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.md,
    fontStyle: "italic",
    letterSpacing: 0.2,
  },

  // ══ CONTENT ══
  content: {
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.sm,
  },

  // paragraph card
  paraCard: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  paraRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  accentBar: {
    width: 3,
    borderRadius: 2,
    backgroundColor: palette.primary,
    opacity: 0.5,
    marginTop: 4,
    alignSelf: "stretch",
    minHeight: 16,
  },
  paraText: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: palette.textMedium,
    lineHeight: 28,
    letterSpacing: 0.1,
  },

  // ══ TABLE ══
  tableCard: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginTop: spacing.md,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    alignItems: "center",
  },
  tableLabel: {
    flex: 1,
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 18,
    color: palette.primary,
  },
  tableFormula: {
    flex: 1.5,
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: palette.textMedium,
  },
  tableValue: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: palette.textMedium,
    textAlign: "right",
  },

  // ══ MULTI-COLUMN TABLE ══
  multiTablesWrap: {
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  multiTableBlock: {},
  multiTableTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 20,
    color: palette.primary,
    marginBottom: spacing.sm,
    paddingHorizontal: 16,
  },
  multiTableScroll: {},
  multiTableContainer: {
    backgroundColor: palette.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: "hidden",
    minWidth: '100%',
  },
  multiTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    paddingVertical: 12,
  },
  multiTableHeaderRow: {
    backgroundColor: "rgba(255,217,92,0.1)",
  },
  multiTableCell: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    color: palette.textMedium,
    width: 120, // fixed width for scrollable table
    paddingHorizontal: 12,
    textAlign: "center",
  },
  multiTableHeaderCell: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 16,
    color: palette.primary,
  },

  // ══ BOTTOM CONTENT ══
  bottomContentWrap: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  bottomItem: {
    marginBottom: spacing.sm,
  },
  bottomHeading: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 20,
    color: palette.text,
    marginBottom: 6,
  },
  bottomText: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    color: palette.textMedium,
    lineHeight: 26,
    letterSpacing: 0.2,
  },

  // ══ FOOTER ORNAMENT ══
  footerOrnament: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: spacing.xl + 4,
    marginHorizontal: spacing.xxl,
  },
  footerLine: { flex: 1, height: 1, backgroundColor: palette.border },
  footerOmCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(183,28,28,0.25)",
    backgroundColor: palette.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  footerOmText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 22,
    color: palette.primary,
    lineHeight: 28,
  },
  footerShanti: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: palette.secondaryText,
    textAlign: "center",
    letterSpacing: 0.8,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    opacity: 0.65,
  },
});
