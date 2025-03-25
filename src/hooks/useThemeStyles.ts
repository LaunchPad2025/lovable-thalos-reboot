
import { useTheme } from '@/providers/ThemeProvider';
import { themeColors, themeSizing, themeShadows } from '@/lib/theme';

export function useThemeStyles() {
  const { mode, density } = useTheme();
  
  const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const currentMode = isDark ? 'dark' : 'light';
  
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
  
  // Utility functions to get theme-aware values
  return {
    isDark,
    currentMode,
    colors: themeColors,
    sizing: themeSizing,
    shadows: themeShadows,
    getColor,
    getDensityValue,
    
    // Derived values
    bg: isDark ? themeColors.dark.background : themeColors.light.background,
    cardBg: isDark ? themeColors.dark.card : themeColors.light.card,
    borderColor: isDark ? themeColors.dark.border : themeColors.light.border,
    textPrimary: isDark ? themeColors.dark.text.primary : themeColors.light.text.primary,
    textSecondary: isDark ? themeColors.dark.text.secondary : themeColors.light.text.secondary,
    textMuted: isDark ? themeColors.dark.text.muted : themeColors.light.text.muted,
  };
}
