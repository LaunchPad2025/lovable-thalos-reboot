
import { useTheme } from '@/providers/ThemeProvider';
import { themeColors, themeSizing, themeShadows } from '@/lib/theme';
import { useEffect, useState } from 'react';

export function useThemeStyles() {
  const { theme } = useTheme();
  const [systemIsDark, setSystemIsDark] = useState(false);
  
  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };
    
    // Set initial value
    setSystemIsDark(mediaQuery.matches);
    
    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  const isDark = theme === 'dark' || (theme === 'system' && systemIsDark);
  const currentMode = isDark ? 'dark' : 'light';
  const density = 'comfortable'; // Default density since we aren't using it
  
  const getColor = (colorPath: string) => {
    const parts = colorPath.split('.');
    let current: any = themeColors;
    
    for (const part of parts) {
      if (current[part] === undefined) {
        console.warn(`Color path ${colorPath} not found in theme colors`);
        return '';
      }
      current = current[part];
    }
    
    return current;
  };
  
  const getDensityValue = (key: keyof typeof themeSizing.density.comfortable) => {
    return themeSizing.density[density][key];
  };
  
  // Enhanced contrast helpers
  const getContrastText = (bgColor: string) => {
    // Simple contrast ratio calculation
    const isLight = isDark ? false : true;
    return isLight ? themeColors.dark.text.primary : themeColors.light.text.primary;
  };
  
  // Get high contrast version of a color (for hover states, etc.)
  const getHighContrastColor = (color: string, amount: number = 0.2) => {
    // This is just a placeholder - in a real app this would adjust the color
    return `${color}${isDark ? 'aa' : '55'}`;
  };
  
  // Utility functions to get theme-aware values
  return {
    isDark,
    currentMode,
    colors: themeColors,
    sizing: themeSizing,
    shadows: themeShadows,
    getColor,
    getDensityValue,
    getContrastText,
    getHighContrastColor,
    
    // Derived values with improved contrast
    bg: isDark ? themeColors.dark.background : themeColors.light.background,
    cardBg: isDark ? themeColors.dark.card : themeColors.light.card,
    borderColor: isDark ? themeColors.dark.border : themeColors.light.border,
    textPrimary: isDark ? themeColors.light.text.primary : themeColors.dark.text.primary,
    textSecondary: isDark ? '#E1E3E6' : '#303540', // Enhanced contrast for secondary text
    textMuted: isDark ? '#A0A8B5' : '#555E70',    // Enhanced contrast for muted text
    interactive: {
      hover: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      disabled: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      selected: isDark ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.2)',
    },
    // Mobile-specific adjustments
    mobile: {
      padding: '0.75rem',
      fontSize: {
        small: '0.875rem',
        normal: '1rem',
        large: '1.125rem',
      },
      lineHeight: 1.5,
    }
  };
}
