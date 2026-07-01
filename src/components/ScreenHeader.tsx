import { Pressable, StyleSheet, Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { cornerRadius, palette, spacing, typography } from "@/constants/theme";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export const ScreenHeader = ({ title, subtitle }: ScreenHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Pressable
        style={styles.menuButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: cornerRadius.md,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.border,
    marginLeft: spacing.md,
  },
  menuIcon: {
    fontSize: 20,
    color: palette.text,
    lineHeight: 22,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    ...typography.screenTitle,
    color: palette.text,
  },
  subtitle: {
    ...typography.description,
    color: palette.secondaryText,
    marginTop: 5,
  },
});
