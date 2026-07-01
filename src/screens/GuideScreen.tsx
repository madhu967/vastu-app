import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { ScreenHeader } from "@/components/ScreenHeader";
import { guidePages } from "@/constants/content";
import { palette, spacing, typography } from "@/constants/theme";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getLocalizedGuidePages } from "@/i18n/strings";

// Map page key → hero icon
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
      <ScreenHeader title={page.title} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Hero Banner ── */}
        <LinearGradient
          colors={["#FBE8C7", "#FFF4E3", "#FFF9F2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          {/* decorative ring */}
          <View style={styles.heroRing} />
          <View style={styles.heroIconWrap}>
            <Text style={styles.heroIcon}>{icon}</Text>
          </View>
          <Text style={styles.heroTitle}>{page.title}</Text>
          <Text style={styles.heroSubtitle}>{page.subtitle}</Text>
          {/* accent dot row */}
          <View style={styles.accentDots}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[styles.accentDot, i === 1 && styles.accentDotLarge]}
              />
            ))}
          </View>
        </LinearGradient>

        {/* ── Content (no card containers) ── */}
        <View style={styles.content}>
          {page.sections.map((section, sIdx) => (
            <View key={section.title} style={styles.section}>
              {/* section heading */}
              <View style={styles.sectionHeadRow}>
                <View style={styles.sectionAccentBar} />
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>

              {/* bullet points rendered as plain prose rows */}
              {section.points.map((point, pIdx) => (
                <View key={pIdx} style={styles.pointRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}

              {/* divider between sections (except last) */}
              {sIdx < page.sections.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  scrollContent: {
    paddingBottom: spacing.xxl,
  },

  /* ── Hero ── */
  hero: {
    borderRadius: 28,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: "rgba(201,162,39,0.22)",
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#2E2118",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  heroRing: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(201,162,39,0.18)",
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.75)",
    borderWidth: 1,
    borderColor: "rgba(201,162,39,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
    shadowColor: palette.accent,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  heroIcon: {
    fontSize: 36,
    lineHeight: 42,
  },
  heroTitle: {
    ...typography.cardTitle,
    color: palette.text,
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    ...typography.description,
    color: palette.secondaryText,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  accentDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.md,
  },
  accentDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "rgba(201,162,39,0.45)",
  },
  accentDotLarge: {
    width: 10,
    height: 10,
    backgroundColor: palette.accent,
  },

  /* ── Content ── */
  content: {
    paddingHorizontal: 4,
  },
  section: {
    marginBottom: 4,
  },
  sectionHeadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionAccentBar: {
    width: 4,
    height: 22,
    borderRadius: 4,
    backgroundColor: palette.primary,
  },
  sectionTitle: {
    ...typography.cardHeading,
    color: palette.text,
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 8,
    paddingLeft: 14,
  },
  bullet: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: palette.accent,
    marginTop: 8,
  },
  pointText: {
    ...typography.body,
    color: palette.secondaryText,
    flex: 1,
    lineHeight: 26,
  },
  divider: {
    height: 1,
    backgroundColor: palette.border,
    marginTop: spacing.md,
    marginLeft: 14,
  },
});
