// ══════════════════════════════════════════════════════
//  Sri Vastu — Premium Hindu Devotional Design System
//  Light Ivory + Crimson Header palette
// ══════════════════════════════════════════════════════

export const palette = {
  // ── Backgrounds ──
  background: "#FFF8F0",       // Warm ivory app background
  surface: "#FFFFFF",          // Card white
  surfaceWarm: "#FFFDF9",      // Main white area / slight warm white
  surfaceIcon: "#FFF7EC",      // Icon circle background
  surfaceInput: "#FFFBF5",     // Input field background
  surfaceDrawer: "#FFFDF9",    // Drawer/menu background
  surfaceSelected: "#FFF1CC",  // Selected bottom tab

  // ── Header / Hero (dark crimson gradient) ──
  headerStart: "#5A0008",
  headerMid: "#8B000F",
  headerEnd: "#B71C1C",

  // ── Brand colours ──
  primary: "#B71C1C",          // Deep crimson (main brand)
  primaryDark: "#8B000F",      // Darker crimson
  primaryDeep: "#5A0008",      // Deepest crimson
  primaryLight: "#FFEBEE",     // Very light crimson tint

  // ── Gold accent ──
  gold: "#C9830A",             // Deep gold for text/icons
  goldLight: "#F4C430",        // Festival banner gold start
  goldBright: "#FFD95C",       // Festival banner gold end
  goldText: "#A07000",         // Gold text on light backgrounds

  // ── Text ──
  text: "#2C1A1A",             // Dark warm brown (primary text)
  textMedium: "#5C3D3D",       // Medium warm brown
  secondaryText: "#8C6A6A",    // Subdued warm red-grey
  textOnCrimson: "#FFFFFF",    // White text on crimson header
  textGoldOnCrimson: "#FFD95C",// Gold text on crimson header

  // ── Borders & dividers ──
  border: "#EFE3C7",           // Warm divider lines
  borderLight: "#F5EDD8",      // Lighter border
  borderCrimson: "rgba(183, 28, 28, 0.2)",

  // ── Utility ──
  mist: "#FFF8F0",
  glow: "rgba(183, 28, 28, 0.12)",
  glowGold: "rgba(201, 131, 10, 0.15)",
  overlay: "rgba(90, 0, 8, 0.7)",
  success: "#2E7D32",
  successBg: "#E8F5E9",
  errorRed: "#C62828",
  accent: "#C9830A",
};

export const typography = {
  logo: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 44,
    lineHeight: 52,
    fontWeight: "700" as const,
  },
  hero: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 38,
    lineHeight: 46,
    fontWeight: "700" as const,
  },
  screenTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "700" as const,
  },
  cardTitle: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "600" as const,
  },
  sectionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700" as const,
    letterSpacing: 0.8,
    textTransform: "uppercase" as const,
  },
  cardHeading: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
  },
  body: {
    fontFamily: "Manrope_400Regular",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  description: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  button: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700" as const,
    letterSpacing: 0.5,
  },
  label: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600" as const,
    letterSpacing: 0.4,
  },
  caption: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "500" as const,
  },
  tiny: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400" as const,
  },
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 40,
};

export const cornerRadius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
};
