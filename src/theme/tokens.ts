export const colors = {
  bg: '#242C3C',
  surface: '#293246',
  accent: '#36B9F4',
  accentDark: '#3458EA',

  background: "#242C3B",
  surfaceRaised: "#2D3950",

  textPrimary: "#FFFFFF",
  textSecondary: "#AAB2C0",

  halfRectangle: "#37B6E9",


  accentBlue: "#34C8E8",
  accentPurple: "#4E4AF2",

  border: "rgba(255,255,255,0.08)",
};

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
  
export const shadows = {
    raised:
      '6px 6px 12px rgba(0,0,0,0.45), -4px -4px 10px rgba(255,255,255,0.05)',
    inset:
      'inset 4px 4px 8px rgba(0,0,0,0.45), inset -3px -3px 6px rgba(255,255,255,0.04)',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  };
  
export const radius = {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
};
  
export const fontSize = {
    caption: 11,
    body: 13,
    label: 14,
    title: 18,
    price: 20,
};