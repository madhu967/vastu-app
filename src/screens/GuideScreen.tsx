import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { ScreenHeader } from "@/components/ScreenHeader";
import { guidePages } from "@/constants/content";
import { palette, spacing, typography, cornerRadius } from "@/constants/theme";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getLocalizedGuidePages } from "@/i18n/strings";

const pageIcons: Record<string, string> = {
  "main-entrance": "🚪",
  "living-room": "🛋️",
  kitchen: "🍳",
  bedroom: "🛏️",
  bathroom: "🚿",
  "pooja-room": "🪔",
  "dining-room": "🍽️",
  staircase: "🪜",
  parking: "🚗",
  borewell: "💧",
  "septic-tank": "🔧",
  garden: "🌿",
  "plot-shapes": "📐",
  faq: "❓",
  contact: "📞",
  about: "ℹ️",
};

export const GuideScreen = () => {
  const { language } = useAppLanguage();
  const route = useRoute<any>();
  const localizedPages = getLocalizedGuidePages(language, guidePages);
  const page =
    localizedPages.find((item) => item.key === route.params?.pageKey) ??
    localizedPages[0];

  const icon = pageIcons[page.key] ?? "ॐ";

  return (
    <View style={styles.container}>
      {/* Crimson header */}
      <ScreenHeader title={page.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero banner — crimson gradient like reference */}
        <LinearGradient
          colors={["#5A0008", "#8B000F", "#B71C1C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroIconWrap}>
            <Text style={styles.heroIcon}>{icon}</Text>
          </View>
          <Text style={styles.heroTitle}>{page.title}</Text>
          <View style={styles.heroDivider}>
            <View style={styles.heroDivLine} />
            <Text style={styles.heroDivDot}>✦</Text>
            <View style={styles.heroDivLine} />
          </View>
          <Text style={styles.heroSubtitle}>{page.subtitle}</Text>
        </LinearGradient>

        {/* Content on ivory background */}
        <View style={styles.content}>
          {page.sections.map((section, sIdx) => (
            <View key={section.title} style={styles.section}>
              <View style={styles.sectionHeadRow}>
                <View style={styles.sectionAccentBar} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              <View style={styles.pointsCard}>
                {section.points.map((point, pIdx) => (
                  <View key={pIdx} style={styles.pointRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.pointText}>{point}</Text>
                  </View>
                ))}
              </View>

              {sIdx < page.sections.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* Bottom ornament */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerOm}>ॐ</Text>
          <View style={styles.footerLine} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + 20,
    backgroundColor: palette.background,
  },

  hero: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderRadius: cornerRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.3)",
    alignItems: "center",
    shadowColor: "#B71C1C",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF8F0",
    borderWidth: 2,
    borderColor: "rgba(255,217,92,0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    shadowColor: "#FFD95C",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  heroIcon: { fontSize: 34, lineHeight: 40 },
  heroTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 22,
    color: "#FFF8F0",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: spacing.sm,
  },
  heroDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 150,
    marginBottom: 8,
  },
  heroDivLine: { flex: 1, height: 1, backgroundColor: "rgba(255,217,92,0.4)" },
  heroDivDot: { fontSize: 10, color: "#FFD95C" },
  heroSubtitle: {
    ...typography.description,
    color: "rgba(255,248,240,0.7)",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.md,
    fontStyle: "italic",
  },

  content: {
    paddingHorizontal: spacing.lg,
    gap: 4,
  },
  section: { marginBottom: 4 },
  sectionHeadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionAccentBar: {
    width: 3,
    height: 18,
    borderRadius: 2,
    backgroundColor: palette.primary,
  },
  sectionTitle: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 20,
    color: palette.text,
    lineHeight: 28,
  },
  pointsCard: {
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.md,
    gap: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 7,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.primary,
    marginTop: 8,
    flexShrink: 0,
  },
  pointText: {
    ...typography.body,
    color: palette.textMedium,
    flex: 1,
    lineHeight: 26,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginTop: spacing.lg,
    marginHorizontal: spacing.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.xxl,
  },
  footerLine: { flex: 1, height: 1, backgroundColor: palette.border },
  footerOm: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 20,
    color: palette.primary,
    lineHeight: 26,
    opacity: 0.5,
  },
});
