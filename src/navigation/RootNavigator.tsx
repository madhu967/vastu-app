import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainScreen from "@/screens/MainScreen";
import { GuideScreen } from "@/screens/GuideScreen";
import AdminLoginScreen from "@/screens/AdminLoginScreen";
import AdminApprovalsScreen from "@/screens/AdminApprovalsScreen";
import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { guidePages } from "@/constants/content";
import { palette } from "@/constants/theme";
import { RootDrawerParamList } from "@/navigation/types";
import { useAppLanguage } from "@/context/AppLanguageContext";
import { getLocalizedGuidePages } from "@/i18n/strings";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: palette.background,
    card: palette.surface,
    text: palette.text,
    primary: palette.primary,
    border: palette.border,
    notification: palette.accent,
  },
};

export const RootNavigator = () => {
  const { language } = useAppLanguage();
  const localizedPages = getLocalizedGuidePages(language, guidePages);

  return (
    <NavigationContainer theme={appTheme}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: palette.background,
            width: 336,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={MainScreen}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{ title: "Admin Login" }}
        />
        <Drawer.Screen
          name="AdminApprovals"
          component={AdminApprovalsScreen}
          options={{ title: "Admin Approvals" }}
        />
        {localizedPages.map((page) => (
          <Drawer.Screen
            key={page.key}
            name={page.key}
            component={GuideScreen}
            initialParams={{ pageKey: page.key }}
            options={{ title: page.title }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
