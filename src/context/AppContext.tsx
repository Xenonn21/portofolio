// src/context/AppContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type ThemeMode = "dark" | "light";
export type Language = "id" | "en";

type AppContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;

  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  resetLanguageToAuto: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const lang =
    navigator.language ||
    (Array.isArray(navigator.languages) ? navigator.languages[0] : "") ||
    "";

  return lang.toLowerCase().startsWith("id") ? "id" : "en";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [language, setLanguageState] = useState<Language>("en");

  // load saved settings + auto detect language on first load
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("portfolio-theme") as ThemeMode | null;
    const savedLanguage = localStorage.getItem("portfolio-language") as Language | null;

    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
    } else {
      // optional: detect OS theme
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      setThemeState(prefersLight ? "light" : "dark");
    }

    if (savedLanguage === "id" || savedLanguage === "en") {
      setLanguageState(savedLanguage);
    } else {
      setLanguageState(detectBrowserLanguage());
    }
  }, []);

  // apply theme class to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  // save language
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const setTheme = (next: ThemeMode) => setThemeState(next);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => {
      const next = prev === "id" ? "en" : "id";
      localStorage.setItem("portfolio-language", next);
      return next;
    });
  };

  const resetLanguageToAuto = () => {
    const auto = detectBrowserLanguage();
    setLanguageState(auto);
    localStorage.removeItem("portfolio-language");
  };

  const value = useMemo<AppContextType>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      language,
      setLanguage,
      toggleLanguage,
      resetLanguageToAuto,
    }),
    [theme, language]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside <AppProvider>");
  }
  return ctx;
}