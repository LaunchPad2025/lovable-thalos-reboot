
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light' | 'system';
type ThemeDensity = 'comfortable' | 'compact';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  density: ThemeDensity;
  setDensity: (density: ThemeDensity) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [density, setDensity] = useState<ThemeDensity>('comfortable');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);

  // Apply theme mode on change
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (mode === 'system') {
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemPreference);
      return;
    }
    
    root.classList.remove('light', 'dark');
    root.classList.add(mode);
  }, [mode]);

  // Apply density on change
  useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.density = density;
  }, [density]);
  
  // Apply animations setting
  useEffect(() => {
    const root = window.document.documentElement;
    if (animationsEnabled) {
      root.classList.remove('no-animations');
    } else {
      root.classList.add('no-animations');
    }
  }, [animationsEnabled]);

  const value = {
    mode,
    setMode,
    density,
    setDensity,
    sidebarCollapsed,
    setSidebarCollapsed,
    animationsEnabled,
    setAnimationsEnabled
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
