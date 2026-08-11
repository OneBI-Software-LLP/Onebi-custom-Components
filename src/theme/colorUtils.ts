import { ThemeColors } from './types';

/**
 * Converts a hex color string (#fff, #ffffff) to RGB object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.trim().replace(/^#/, '');

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (cleanHex.length !== 6) {
    return null;
  }

  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Parses any color format (hex, rgb, rgba, hsl) into an RGB object
 */
export function parseToRgb(color: string): { r: number; g: number; b: number } {
  const hexMatch = hexToRgb(color);
  if (hexMatch) return hexMatch;

  const rgbMatch = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: Math.min(255, Math.max(0, parseInt(rgbMatch[1], 10))),
      g: Math.min(255, Math.max(0, parseInt(rgbMatch[2], 10))),
      b: Math.min(255, Math.max(0, parseInt(rgbMatch[3], 10))),
    };
  }

  // Default fallback if parsing fails
  return { r: 99, g: 102, b: 241 }; // #6366f1
}

/**
 * Converts RGB object to HSL tuple format string (`221.2 83.2% 53.3%`) for Tailwind CSS variable compatibility
 */
export function rgbToHslTuple(r: number, g: number, b: number): string {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = (h * 360).toFixed(1);
  const sPct = (s * 100).toFixed(1);
  const lPct = (l * 100).toFixed(1);

  return `${hDeg} ${sPct}% ${lPct}%`;
}

/**
 * Determines contrast color (#ffffff or #0f172a) based on background luminance
 */
export function getContrastColor(color: string): string {
  const { r, g, b } = parseToRgb(color);
  // Relative luminance formula (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#0f172a' : '#ffffff';
}

/**
 * Adjusts color brightness (positive for lighter, negative for darker)
 */
export function adjustColorBrightness(color: string, percent: number): string {
  const { r, g, b } = parseToRgb(color);

  const factor = 1 + percent / 100;
  const newR = Math.min(255, Math.max(0, Math.round(r * factor)));
  const newG = Math.min(255, Math.max(0, Math.round(g * factor)));
  const newB = Math.min(255, Math.max(0, Math.round(b * factor)));

  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

/**
 * Generates an RGBA string given a color and opacity (0-1)
 */
export function colorToRgba(color: string, opacity: number): string {
  const { r, g, b } = parseToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Maps ThemeColors into a record of CSS variable key-value pairs
 */
export function generateCssVariablesMap(
  colors: ThemeColors,
  isDark: boolean
): Record<string, string> {
  const variables: Record<string, string> = {};

  const primary = colors.primary || (isDark ? '#818cf8' : '#4f46e5');
  const primaryHover =
    colors.primaryHover || adjustColorBrightness(primary, isDark ? 12 : -12);
  const primaryForeground =
    colors.primaryForeground || getContrastColor(primary);

  const secondary = colors.secondary || (isDark ? '#334155' : '#f1f5f9');
  const secondaryHover =
    colors.secondaryHover || adjustColorBrightness(secondary, isDark ? 10 : -8);
  const secondaryForeground =
    colors.secondaryForeground || (isDark ? '#f8fafc' : '#0f172a');

  const background = colors.background || (isDark ? '#090d16' : '#ffffff');
  const foreground = colors.foreground || (isDark ? '#f8fafc' : '#0f172a');

  const card = colors.card || (isDark ? '#1e293b' : '#ffffff');
  const cardForeground = colors.cardForeground || (isDark ? '#f8fafc' : '#0f172a');

  const popover = colors.popover || (isDark ? '#1e293b' : '#ffffff');
  const popoverForeground = colors.popoverForeground || (isDark ? '#f8fafc' : '#0f172a');

  const surface = colors.surface || (isDark ? '#1e293b' : '#f3f4f6');
  const surfaceHover =
    colors.surfaceHover || (isDark ? '#334155' : '#e5e7eb');

  const border = colors.border || (isDark ? '#334155' : '#e2e8f0');
  const input = colors.input || (isDark ? '#334155' : '#e2e8f0');
  const ring = colors.ring || primary;

  const text = colors.text || (isDark ? '#f8fafc' : '#111827');
  const textMuted = colors.textMuted || (isDark ? '#94a3b8' : '#6b7280');

  const danger = colors.danger || '#ef4444';
  const dangerHover = colors.dangerHover || adjustColorBrightness(danger, -10);

  const success = colors.success || '#10b981';
  const successHover = colors.successHover || adjustColorBrightness(success, -10);

  const warning = colors.warning || '#f59e0b';
  const warningHover = colors.warningHover || adjustColorBrightness(warning, -10);

  const info = colors.info || '#3b82f6';
  const infoHover = colors.infoHover || adjustColorBrightness(info, -10);

  const radius = colors.radius || '0.5rem';

  // Helper to safely format HSL for Tailwind
  const toHsl = (col: string) => {
    const rgb = parseToRgb(col);
    return rgbToHslTuple(rgb.r, rgb.g, rgb.b);
  };

  // 1. OneBI & direct CSS variable tokens (used in button.css, navbar.css, table.css, etc.)
  variables['--color-primary'] = primary;
  variables['--color-primary-hover'] = primaryHover;
  variables['--color-secondary'] = secondary;
  variables['--color-secondary-hover'] = secondaryHover;
  variables['--color-surface'] = surface;
  variables['--color-surface-hover'] = surfaceHover;
  variables['--color-border'] = border;
  variables['--color-text'] = text;
  variables['--color-text-muted'] = textMuted;
  variables['--color-danger'] = danger;
  variables['--color-danger-hover'] = dangerHover;
  variables['--color-success'] = success;
  variables['--color-success-hover'] = successHover;
  variables['--color-warning'] = warning;
  variables['--color-warning-hover'] = warningHover;
  variables['--color-info'] = info;
  variables['--color-info-hover'] = infoHover;
  variables['--ring-primary'] = colorToRgba(ring, 0.25);
  variables['--ring-danger'] = colorToRgba(danger, 0.35);
  variables['--ring-success'] = colorToRgba(success, 0.35);
  variables['--ring-warning'] = colorToRgba(warning, 0.35);
  variables['--ring-info'] = colorToRgba(info, 0.35);

  // 2. Tailwind HSL CSS variable tokens (hsl(var(--primary)))
  variables['--primary'] = toHsl(primary);
  variables['--primary-foreground'] = toHsl(primaryForeground);
  variables['--secondary'] = toHsl(secondary);
  variables['--secondary-foreground'] = toHsl(secondaryForeground);
  variables['--background'] = toHsl(background);
  variables['--foreground'] = toHsl(foreground);
  variables['--card'] = toHsl(card);
  variables['--card-foreground'] = toHsl(cardForeground);
  variables['--popover'] = toHsl(popover);
  variables['--popover-foreground'] = toHsl(popoverForeground);
  variables['--muted'] = toHsl(surface);
  variables['--muted-foreground'] = toHsl(textMuted);
  variables['--accent'] = toHsl(secondary);
  variables['--accent-foreground'] = toHsl(secondaryForeground);
  variables['--destructive'] = toHsl(danger);
  variables['--destructive-foreground'] = toHsl(getContrastColor(danger));
  variables['--border'] = toHsl(border);
  variables['--input'] = toHsl(input);
  variables['--ring'] = toHsl(ring);
  variables['--radius'] = radius;

  // 3. Custom variables if provided
  if (colors.customVariables) {
    Object.entries(colors.customVariables).forEach(([key, val]) => {
      const varKey = key.startsWith('--') ? key : `--${key}`;
      variables[varKey] = val;
    });
  }

  return variables;
}

/**
 * Applies a map of CSS variables to an HTMLElement (or document.documentElement)
 */
export function applyCssVariables(
  element: HTMLElement,
  variables: Record<string, string>
): void {
  Object.entries(variables).forEach(([name, value]) => {
    element.style.setProperty(name, value);
  });
}
