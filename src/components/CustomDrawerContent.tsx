import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { guidePages } from "@/constants/content";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getAppStrings, getLocalizedGuidePages } from "@/i18n/strings";

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { language } = useAppLanguage();
  const strings = getAppStrings(language);
  const localizedPages = getLocalizedGuidePages(language, guidePages);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.content}>
      {/* Brand header — crimson gradient like app header */}
      <LinearGradient
        colors={["#5A0008", "#8B000F", "#B71C1C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.brandBox}
      >
        <View style={styles.brandInner}>
          <View style={styles.omCircle}>
            <Text style={styles.brandMark}>ॐ</Text>
          </View>
          <View style={styles.brandText}>
            <Text style={styles.brandTitle}>{strings.home.title}</Text>
            <View style={styles.brandDivRow}>
              <View style={styles.brandDivLine} />
              <Text style={styles.brandDivDot}>✦</Text>
              <View style={styles.brandDivLine} />
            </View>
            <Text style={styles.brandSub}>శ్రీ వాస్తు ఫల విశ్లేషణం</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Navigation items */}
      <View style={styles.navSection}>
        <Text style={styles.navLabel}>నావిగేషన్</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {props.state.routes.map((route, index) => {
            const label =
              route.name === "Home"
                ? strings.homeRoute
                : (localizedPages.find((page) => page.key === route.name)
                    ?.title ?? route.name);
            const focused = props.state.index === index;
            return (
              <DrawerItem
                key={route.key}
                label={label}
                focused={focused}
                onPress={() => props.navigation.navigate(route.name as never)}
                labelStyle={[
                  styles.itemLabel,
                  focused ? styles.itemLabelActive : null,
                ]}
                style={[styles.item, focused ? styles.itemActive : null]}
              />
            );
          })}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <Text style={styles.footerText}>దేవో వాస్తు ప్రజావతే</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: palette.surfaceDrawer,
    paddingTop: 0,
  },
  brandBox: {
    marginBottom: 0,
  },
  brandInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 52,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  omCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFF8F0",
    borderWidth: 2,
    borderColor: "rgba(255,217,92,0.5)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFD95C",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  brandMark: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 26,
    color: "#B71C1C",
    lineHeight: 32,
  },
  brandText: { flex: 1 },
  brandTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 18,
    color: "#FFF8F0",
    lineHeight: 24,
  },
  brandDivRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 4,
  },
  brandDivLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,217,92,0.3)",
  },
  brandDivDot: { fontSize: 8, color: "#FFD95C" },
  brandSub: {
    ...typography.tiny,
    color: "rgba(255,248,240,0.6)",
    fontStyle: "italic",
  },
  navSection: {
    paddingHorizontal: spacing.md,
    flex: 1,
    paddingTop: spacing.md,
  },
  navLabel: {
    ...typography.tiny,
    color: palette.secondaryText,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: spacing.xs,
    marginLeft: spacing.sm,
  },
  list: { paddingBottom: spacing.xxl },
  item: {
    borderRadius: cornerRadius.md,
    marginHorizontal: 0,
    marginVertical: 2,
  },
  itemActive: {
    backgroundColor: palette.primaryLight,
  },
  itemLabel: {
    ...typography.body,
    color: palette.textMedium,
    fontSize: 14,
  },
  itemLabelActive: {
    color: palette.primary,
    fontFamily: "Manrope_700Bold",
  },
  footer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  footerDivider: {
    width: "60%",
    height: 1,
    backgroundColor: palette.border,
    marginBottom: spacing.sm,
  },
  footerText: {
    ...typography.tiny,
    color: palette.secondaryText,
    fontStyle: "italic",
    letterSpacing: 0.4,
  },
});
