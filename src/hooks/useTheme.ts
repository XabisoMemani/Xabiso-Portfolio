"use client";

import { useState, useEffect } from "react";

export type Theme = "dark" | "wood" | "orange";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("orange");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme, default to orange
    const savedTheme = localStorage.getItem("theme") as Theme;

    // Validate saved theme is one of our allowed themes
    if (
      savedTheme &&
      (savedTheme === "dark" ||
        savedTheme === "wood" ||
        savedTheme === "orange")
    ) {
      setTheme(savedTheme);
    } else {
      setTheme("orange");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const body = document.body;

    // Remove all theme classes from both html and body
    root.classList.remove("theme-dark", "theme-wood", "theme-orange");
    body.classList.remove("theme-dark", "theme-wood", "theme-orange");

    // Apply theme class to html element
    root.classList.add(`theme-${theme}`);

    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  return { theme, setTheme, mounted };
}
