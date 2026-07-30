import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppLanguage = "English" | "Telugu" | "Hindi";

type AppLanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
};

const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(
  undefined,
);

export const AppLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<AppLanguage>("Telugu");

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const stored = await AsyncStorage.getItem("app_language");
        if (stored === "English" || stored === "Telugu" || stored === "Hindi") {
          setLanguageState(stored as AppLanguage);
        }
      } catch (e) {
        console.error("Failed to load language", e);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (newLang: AppLanguage) => {
    setLanguageState(newLang);
    try {
      await AsyncStorage.setItem("app_language", newLang);
    } catch (e) {
      console.error("Failed to save language", e);
    }
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <AppLanguageContext.Provider value={value}>
      {children}
    </AppLanguageContext.Provider>
  );
};

export const useAppLanguage = () => {
  const context = useContext(AppLanguageContext);

  if (!context) {
    throw new Error("useAppLanguage must be used within AppLanguageProvider");
  }

  return context;
};
