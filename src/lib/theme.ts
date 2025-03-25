
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
  // Dark mode specific colors
  dark: {
    background: '#0b0f14',
    card: '#0d1117',
    border: '#1f2937',
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
      muted: '#6b7280',
    }
  },
  // Light mode specific colors
  light: {
    background: '#ffffff',
    card: '#f9fafb',
    border: '#e5e7eb',
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      muted: '#9ca3af',
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
};

export const getThemeValue = (
  mode: 'light' | 'dark',
  lightValue: string,
  darkValue: string
): string => {
  return mode === 'light' ? lightValue : darkValue;
};
