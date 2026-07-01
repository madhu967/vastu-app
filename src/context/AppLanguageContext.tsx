import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type AppLanguage = "English" | "Telugu" | "Hindi";

type AppLanguageContextValue = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
};

const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(
  undefined,
);

export const AppLanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<AppLanguage>("English");

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
