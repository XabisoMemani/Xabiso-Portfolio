"use client";

import { useState, useEffect, createContext, useContext } from "react";

export type Theme = "dark" | "wood" | "orange" | "christmas";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("christmas"); // default to christmas(change back to orange after 25 December)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme in sessionStorage, default to christmas
    const savedTheme = sessionStorage.getItem("theme") as Theme;

    // Validate saved theme is one of our allowed themes
    if (
      savedTheme &&
      (savedTheme === "dark" ||
        savedTheme === "wood" ||
        savedTheme === "orange" ||
        savedTheme === "christmas")
    ) {
      setTheme(savedTheme);
    } else {
      setTheme("christmas");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    // Remove all theme classes from both html and body
    root.classList.remove("theme-dark", "theme-wood", "theme-orange", "theme-christmas");
    body.classList.remove("theme-dark", "theme-wood", "theme-orange", "theme-christmas");

    // Apply theme class to html element
    root.classList.add(`theme-${theme}`);

    // Save to sessionStorage (clears when tab/window closes)
    sessionStorage.setItem("theme", theme);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

