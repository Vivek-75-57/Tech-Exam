import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    
    // Check localStorage first
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    }
    
    // Default to light mode
    return false;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    // Update DOM
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, [isDark]);

  // Apply theme on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (isDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
