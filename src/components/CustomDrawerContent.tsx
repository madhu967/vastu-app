import { ScrollView, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.brandBox}>
        <Text style={styles.brandMark}>ॐ</Text>
        <Text style={styles.brandTitle}>{strings.home.title}</Text>
        <Text style={styles.brandSub}>Premium calculator and guide</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
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
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: palette.background,
    paddingTop: spacing.xxl,
  },
  brandBox: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#2E2118",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  brandMark: {
    ...typography.cardTitle,
    color: palette.primary,
    marginBottom: 8,
  },
  brandTitle: {
    ...typography.cardHeading,
    color: palette.text,
  },
  brandSub: {
    ...typography.caption,
    color: palette.secondaryText,
    marginTop: 4,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  item: {
    borderRadius: cornerRadius.lg,
    marginHorizontal: spacing.sm,
    marginVertical: 4,
  },
  itemActive: {
    backgroundColor: "rgba(217, 119, 6, 0.12)",
  },
  itemLabel: {
    ...typography.label,
    color: palette.text,
  },
  itemLabelActive: {
    color: palette.primary,
    fontWeight: "700",
  },
});
