
export const themeColors = {
  blue: {
    primary: '#3B82F6',
    light: '#93C5FD',
    dark: '#1E40AF',
    hover: '#2563EB',
    bg: {
      light: '#EFF6FF',
      dark: '#0F1629',
    }
  },
  red: {
    primary: '#EF4444',
    light: '#FCA5A5',
    dark: '#B91C1C',
    hover: '#DC2626',
    bg: {
      light: '#FEF2F2',
      dark: '#1F1315',
    }
  },
  green: {
    primary: '#10B981',
    light: '#6EE7B7',
    dark: '#047857',
    hover: '#059669',
    bg: {
      light: '#ECFDF5',
      dark: '#0F1F1B',
    }
  },
  yellow: {
    primary: '#F59E0B',
    light: '#FCD34D',
    dark: '#B45309',
    hover: '#D97706',
    bg: {
      light: '#FFFBEB',
      dark: '#1F1B0F',
    }
  },
  gray: {
    primary: '#6B7280',
    light: '#F3F4F6',
    dark: '#374151',
    hover: '#4B5563',
    bg: {
      light: '#F9FAFB',
      dark: '#111827',
    }
  },
  // Dark mode specific colors - enhanced for better contrast
  dark: {
    background: '#0b0f14',
    card: '#0d1117',
    border: '#1f2937',
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db', // Lightened for better contrast
      muted: '#9ca3af',     // Lightened for better contrast
    },
    interactive: {
      default: '#1f2937',
      hover: '#374151',
      disabled: '#111827',
      focus: '#2563eb',
    }
  },
  // Light mode specific colors - enhanced for better contrast
  light: {
    background: '#ffffff',
    card: '#f9fafb',
    border: '#e5e7eb',
    text: {
      primary: '#111827',
      secondary: '#374151', // Darkened for better contrast
      muted: '#6b7280',     // Darkened for better contrast
    },
    interactive: {
      default: '#f3f4f6',
      hover: '#e5e7eb',
      disabled: '#f9fafb',
      focus: '#3b82f6',
    }
  },
  
  // High contrast versions
  highContrast: {
    dark: {
      background: '#000000',
      card: '#0d1117',
      border: '#374151',
      text: {
        primary: '#ffffff',
        secondary: '#e5e7eb',
        muted: '#d1d5db',
      }
    },
    light: {
      background: '#ffffff',
      card: '#ffffff',
      border: '#6b7280',
      text: {
        primary: '#000000',
        secondary: '#1f2937',
        muted: '#4b5563',
      }
    }
  }
};

export const themeSizing = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  density: {
    compact: {
      padding: '0.5rem',
      spacing: '0.75rem',
      fontSize: '0.875rem',
    },
    comfortable: {
      padding: '0.75rem',
      spacing: '1rem',
      fontSize: '1rem',
    },
  },
  mobile: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
    }
  }
};

export const themeBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const themeShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  // Improved shadows for dark mode
  dark: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.26)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
  }
};

// Helper function for getting theme-aware values
export const getThemeValue = (
  mode: 'light' | 'dark',
  lightValue: string,
  darkValue: string,
  highContrast: boolean = false
): string => {
  if (highContrast) {
    return mode === 'light' 
      ? themeColors.highContrast.light.text.primary 
      : themeColors.highContrast.dark.text.primary;
  }
  return mode === 'light' ? lightValue : darkValue;
};

// Helper function for getting contrast-adaptive colors
export const getContrastColor = (
  bgColor: string,
  mode: 'light' | 'dark'
): string => {
  // In a real implementation, this would calculate contrast based on the background
  // For simplicity, we're just returning preset values
  return mode === 'light' ? themeColors.light.text.primary : themeColors.dark.text.primary;
};

// Helper functions for responsive text sizes
export const getResponsiveSize = (
  baseSizePx: number,
  deviceType: 'mobile' | 'tablet' | 'desktop'
): string => {
  const scaleFactor = deviceType === 'mobile' ? 0.85 : deviceType === 'tablet' ? 0.92 : 1;
  return `${baseSizePx * scaleFactor}px`;
};
