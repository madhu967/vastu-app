import "react-native-get-random-values";
import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { AppLanguageProvider } from "@/context/AppLanguageContext";
import { RootNavigator } from "@/navigation/RootNavigator";
import { SplashScreen } from "@/screens/SplashScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (fontsLoaded) {
        setShowSplash(false);
      }
    }, 2600);

    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppLanguageProvider>
          <SplashScreen onFinish={() => setShowSplash(false)} />
        </AppLanguageProvider>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppLanguageProvider>
        <RootNavigator />
      </AppLanguageProvider>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}
