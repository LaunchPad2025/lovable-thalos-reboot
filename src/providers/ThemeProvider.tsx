
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'dark' | 'light' | 'system';
type ThemeDensity = 'comfortable' | 'compact';
type ContrastMode = 'normal' | 'high';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  density: ThemeDensity;
  setDensity: (density: ThemeDensity) => void;
  contrast: ContrastMode;
  setContrast: (contrast: ContrastMode) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Persist theme settings in localStorage
const getStoredValue = <T extends string>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(`thalos-theme-${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading theme setting: ${key}`, error);
    return defaultValue;
  }
};

const storeValue = <T extends any>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(`thalos-theme-${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing theme setting: ${key}`, error);
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize from localStorage or default values
  const [mode, setModeState] = useState<ThemeMode>(getStoredValue('mode', 'dark'));
  const [density, setDensityState] = useState<ThemeDensity>(getStoredValue('density', 'comfortable'));
  const [contrast, setContrastState] = useState<ContrastMode>(getStoredValue('contrast', 'normal'));
  const [sidebarCollapsed, setSidebarCollapsedState] = useState<boolean>(getStoredValue('sidebarCollapsed', false));
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(getStoredValue('animationsEnabled', true));

  // Wrapped setters that also update localStorage
  const setMode = (value: ThemeMode) => {
    setModeState(value);
    storeValue('mode', value);
  };
  
  const setDensity = (value: ThemeDensity) => {
    setDensityState(value);
    storeValue('density', value);
  };
  
  const setContrast = (value: ContrastMode) => {
    setContrastState(value);
    storeValue('contrast', value);
  };
  
  const setSidebarCollapsed = (value: boolean) => {
    setSidebarCollapsedState(value);
    storeValue('sidebarCollapsed', value);
  };
  
  const setAnimationsEnabled = (value: boolean) => {
    setAnimationsEnabledState(value);
    storeValue('animationsEnabled', value);
  };

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
  
  // Apply contrast on change
  useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.contrast = contrast;
  }, [contrast]);
  
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
    contrast,
    setContrast,
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
