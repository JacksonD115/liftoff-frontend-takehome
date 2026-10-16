
import '@/global.css';
import { Platform } from 'react-native';

const Palette = {
  midnight:  '#242C3C',
  navy:      '#2D426B',
  brandBlue: '#3458EA',
} as const;

export const Colors = {
  bg: '#242C3C',
  surface: '#293246',
  accent: '#36B9F4',
  accentDark: '#3458EA',

  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export const gradients = {
  accent: {
    colors: ['#37B6E9', '#4B4CED'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  listingBackground: {
    colors: [
      '#242C3C',
      '#242C3C',
      '#3498EA',
      '#3458EA',
    ] as const,
    locations: [0, 0.48, 0.52, 1] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};

export const BrandGradient = {
  colors: [Palette.midnight, Palette.navy, Palette.brandBlue] as const,
  locations: [0, 0.6, 1] as const,
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
