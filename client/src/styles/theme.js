// styles/theme.js
export const theme = {
  colors: {
    // Dark hacker theme colors
    background: '#0a0a0a',
    backgroundSecondary: '#111111',
    backgroundTertiary: '#1a1a1a',
    surface: '#1e1e1e',
    surfaceHover: '#252525',

    // Terminal green accents
    primary: '#00ff41',
    primaryDark: '#00cc33',
    primaryLight: '#66ff80',

    // Text colors
    text: '#e0e0e0',
    textLight: '#a0a0a0',
    textSecondary: '#a0a0a0',
    textMuted: '#666666',
    textInverse: '#0a0a0a',

    // Accent colors
    accent: '#ff6b35',
    warning: '#ffaa00',
    error: '#ff4444',
    success: '#00ff41',
    successLight: '#1a3d1a',

    // Border colors
    border: '#333333',
    borderLight: '#444444',

    // Legacy colors for compatibility
    dark: '#1a1a1a',
    light: '#333333',
    disabled: '#555555'
  },
  fonts: {
    primary: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    secondary: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    body: '"Inter", "Segoe UI", system-ui, sans-serif'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  },
  maxWidth: '1200px',
  shadows: {
    small: '0 2px 4px rgba(0, 255, 65, 0.1)',
    medium: '0 4px 8px rgba(0, 255, 65, 0.15)',
    large: '0 8px 16px rgba(0, 255, 65, 0.2)',
    glow: '0 0 20px rgba(0, 255, 65, 0.3)'
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  }
};