import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("boss-burger-dark");
    if (stored !== null) return stored === "true";
    return true; // default dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("boss-burger-dark", String(isDark));
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((d) => !d) };
}
