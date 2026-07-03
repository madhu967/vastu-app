import { useRef, useEffect } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { guidePages } from "@/constants/content";
import { cornerRadius, palette, spacing } from "@/constants/theme";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getAppStrings, getLocalizedGuidePages } from "@/i18n/strings";

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { language } = useAppLanguage();
  const strings      = getAppStrings(language);
  const localizedPages = getLocalizedGuidePages(language, guidePages);

  // slow rotating ring behind OM in drawer header
  const spin = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1,   duration: 1800, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0.4, duration: 1800, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const rotateDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={s.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ══════════ BRAND HEADER ══════════ */}
      <LinearGradient
        colors={["#5A0008", "#8B000F", "#B71C1C"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.brandBox}
      >
        {/* corner ornaments */}
        <Text style={[s.cDeco, { top: 14, left: 16 }]}>✦</Text>
        <Text style={[s.cDeco, { top: 14, right: 16 }]}>✦</Text>

        {/* OM circle with rotating ring */}
        <View style={s.omWrap}>
          <Animated.View style={[s.omRing, { transform: [{ rotate: rotateDeg }] }]} />
          <Animated.View style={[s.omGlow, { opacity: glow }]} />
          <View style={s.omCircle}>
            <Text style={s.omText}>ॐ</Text>
          </View>
        </View>

        {/* Brand text */}
        <Text style={s.brandTitle}>{strings.home.title}</Text>
        <Text style={s.brandEn}>SRI VASTU</Text>

        {/* gold rule */}
        <View style={s.brandRule}>
          <View style={s.brandRuleLine} />
          <Text style={s.brandRuleDot}>◆</Text>
          <View style={s.brandRuleLine} />
        </View>

        <Text style={s.brandTagline}>వాస్తు శాస్త్ర విశ్లేషణ</Text>
      </LinearGradient>

      {/* ══════════ NAV SECTION LABEL ══════════ */}
      <View style={s.navLabelRow}>
        <View style={s.navLabelLine} />
        <Text style={s.navLabel}>MENU</Text>
        <View style={s.navLabelLine} />
      </View>

      {/* ══════════ NAV ITEMS ══════════ */}
      <View style={s.navList}>
        {props.state.routes.map((route, index) => {
          const label =
            route.name === "Home"
              ? strings.homeRoute
              : (localizedPages.find((page) => page.key === route.name)?.title ?? route.name);
          const focused = props.state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => props.navigation.navigate(route.name as never)}
              style={({ pressed }) => [
                s.navItem,
                focused && s.navItemActive,
                pressed && s.navItemPressed,
              ]}
            >
              {focused && (
                <LinearGradient
                  colors={["rgba(183,28,28,0.12)", "rgba(183,28,28,0.04)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={s.navItemGradient}
                />
              )}
              {/* Active left bar */}
              {focused && <View style={s.navActiveBar} />}

              <Text style={[s.navItemLabel, focused && s.navItemLabelActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ══════════ DRAWER FOOTER ══════════ */}
      <View style={s.drawerFooter}>
        <View style={s.footerRule}>
          <View style={s.footerLine} />
          <Text style={s.footerDot}>✦</Text>
          <View style={s.footerLine} />
        </View>
        <Text style={s.footerTagline}>దేవో వాస్తు ప్రజావతే</Text>
        <Text style={s.footerCopy}>© 2025 Sri Vastu</Text>
      </View>
    </DrawerContentScrollView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    backgroundColor: palette.surfaceDrawer,
    paddingTop: 0,
    paddingBottom: 0,
  },

  // ══ BRAND HEADER ══
  brandBox: {
    paddingTop: 56,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    overflow: "hidden",
  },
  cDeco: {
    position: "absolute",
    fontSize: 12,
    color: "rgba(255,217,92,0.45)",
  },

  // OM with animated ring
  omWrap: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  omRing: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.4)",
    borderStyle: "dashed",
  },
  omGlow: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,217,92,0.1)",
  },
  omCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF8F0",
    borderWidth: 2,
    borderColor: "rgba(255,217,92,0.55)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFD95C",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },
  omText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 30,
    color: "#B71C1C",
    lineHeight: 36,
  },

  brandTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 24,
    color: "#FFF8F0",
    lineHeight: 32,
    textShadowColor: "rgba(255,217,92,0.2)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  brandEn: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "rgba(255,217,92,0.75)",
    letterSpacing: 5,
    marginTop: 2,
  },
  brandRule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 120,
    marginVertical: 10,
  },
  brandRuleLine: { flex: 1, height: 1, backgroundColor: "rgba(255,217,92,0.35)" },
  brandRuleDot:  { fontSize: 8, color: "rgba(255,217,92,0.7)" },
  brandTagline: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: "rgba(255,248,240,0.55)",
    letterSpacing: 0.4,
    fontStyle: "italic",
  },

  // ══ NAV LABEL ══
  navLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  navLabelLine: { flex: 1, height: 1, backgroundColor: palette.border },
  navLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: palette.secondaryText,
    letterSpacing: 2,
  },

  // ══ NAV ITEMS ══
  navList: {
    paddingHorizontal: spacing.md,
    gap: 2,
  },
  navItem: {
    borderRadius: cornerRadius.md,
    paddingVertical: 13,
    paddingHorizontal: spacing.md,
    overflow: "hidden",
    position: "relative",
  },
  navItemActive: {
    borderRadius: cornerRadius.md,
  },
  navItemPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  navItemGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: "rgba(183,28,28,0.15)",
  },
  navActiveBar: {
    position: "absolute",
    left: 0,
    top: "20%",
    bottom: "20%",
    width: 3,
    borderRadius: 2,
    backgroundColor: palette.primary,
  },
  navItemLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 15,
    color: palette.textMedium,
    lineHeight: 22,
    paddingLeft: 6,
  },
  navItemLabelActive: {
    fontFamily: "Manrope_700Bold",
    color: palette.primary,
  },

  // ══ DRAWER FOOTER ══
  drawerFooter: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    marginTop: "auto",
  },
  footerRule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "80%",
    marginBottom: spacing.sm,
  },
  footerLine: { flex: 1, height: 1, backgroundColor: palette.border },
  footerDot:  { fontSize: 9, color: palette.gold, opacity: 0.5 },
  footerTagline: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: palette.secondaryText,
    fontStyle: "italic",
    letterSpacing: 0.4,
    textAlign: "center",
  },
  footerCopy: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: palette.secondaryText,
    opacity: 0.5,
    marginTop: 4,
    letterSpacing: 0.3,
  },
});
