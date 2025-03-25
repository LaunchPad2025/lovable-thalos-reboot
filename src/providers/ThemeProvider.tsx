
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  // Added new properties for appearance settings
  density: 'comfortable' | 'compact';
  setDensity: (density: 'comfortable' | 'compact') => void;
  contrast: 'normal' | 'high';
  setContrast: (contrast: 'normal' | 'high') => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  setTheme: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
  // Default values for new properties
  density: 'comfortable',
  setDensity: () => {},
  contrast: 'normal',
  setContrast: () => {},
  animationsEnabled: true,
  setAnimationsEnabled: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Initialize new state variables
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Load theme preference from localStorage if available
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load sidebar preference from localStorage if available
    const savedSidebarState = localStorage.getItem('sidebar-collapsed');
    setSidebarCollapsed(savedSidebarState === 'true');
    
    // Load other appearance preferences from localStorage
    const savedDensity = localStorage.getItem('density');
    if (savedDensity) setDensity(savedDensity as 'comfortable' | 'compact');
    
    const savedContrast = localStorage.getItem('contrast');
    if (savedContrast) setContrast(savedContrast as 'normal' | 'high');
    
    const savedAnimations = localStorage.getItem('animations-enabled');
    setAnimationsEnabled(savedAnimations !== 'false');
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSidebarChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  };

  const handleDensityChange = (newDensity: 'comfortable' | 'compact') => {
    setDensity(newDensity);
    localStorage.setItem('density', newDensity);
  };

  const handleContrastChange = (newContrast: 'normal' | 'high') => {
    setContrast(newContrast);
    localStorage.setItem('contrast', newContrast);
  };

  const handleAnimationsChange = (enabled: boolean) => {
    setAnimationsEnabled(enabled);
    localStorage.setItem('animations-enabled', String(enabled));
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme: handleThemeChange,
        sidebarCollapsed,
        setSidebarCollapsed: handleSidebarChange,
        density,
        setDensity: handleDensityChange,
        contrast,
        setContrast: handleContrastChange,
        animationsEnabled,
        setAnimationsEnabled: handleAnimationsChange
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
