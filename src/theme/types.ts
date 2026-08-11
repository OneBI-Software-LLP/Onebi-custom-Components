export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  /** Primary brand color (Hex, RGB, or HSL) */
  primary?: string;
  /** Hover state for primary color. Auto-calculated if omitted. */
  primaryHover?: string;
  /** Foreground text color over primary background. Auto-calculated if omitted. */
  primaryForeground?: string;

  /** Secondary / accent color */
  secondary?: string;
  secondaryHover?: string;
  secondaryForeground?: string;

  /** Background colors */
  background?: string;
  foreground?: string;
  card?: string;
  cardForeground?: string;
  popover?: string;
  popoverForeground?: string;

  /** Surface / neutral containers */
  surface?: string;
  surfaceHover?: string;
  border?: string;
  input?: string;
  ring?: string;

  /** Typography */
  text?: string;
  textMuted?: string;

  /** Status colors */
  danger?: string;
  dangerHover?: string;
  success?: string;
  successHover?: string;
  warning?: string;
  warningHover?: string;
  info?: string;
  infoHover?: string;

  /** Corner radius preset (e.g., '0.5rem', '8px', '12px') */
  radius?: string;

  /** Custom CSS key-value pairs (e.g. { '--my-custom-var': '#123456' }) */
  customVariables?: Record<string, string>;
}

export type ThemePreset =
  | 'default'
  | 'indigo'
  | 'emerald'
  | 'purple'
  | 'ocean'
  | 'amber'
  | 'rose'
  | 'midnight';

export type ThemeInput = ThemePreset | ThemeColors;

export interface ThemeContextType {
  /** Active theme object or preset name */
  theme: ThemeInput;
  /** Current mode ('light' | 'dark' | 'system') */
  mode: ThemeMode;
  /** Actual applied mode ('light' | 'dark') after resolving 'system' */
  resolvedMode: 'light' | 'dark';
  /** Applied color tokens */
  colors: ThemeColors;
  /** Update theme colors or preset */
  setTheme: (theme: ThemeInput) => void;
  /** Update mode */
  setMode: (mode: ThemeMode) => void;
  /** Toggle between light and dark mode */
  toggleMode: () => void;
}

export interface ThemeProviderProps {
  /** Initial or controlled theme preset name or theme colors object */
  theme?: ThemeInput;
  /** Default mode ('light' | 'dark' | 'system'). Defaults to 'system'. */
  defaultMode?: ThemeMode;
  /** Controlled mode override */
  mode?: ThemeMode;
  /** LocalStorage key for persisting theme mode preference. Defaults to 'custom-ui-theme-mode'. Set false to disable persistence. */
  storageKey?: string | false;
  /** Scope CSS variables to a wrapper container instead of :root (document.documentElement) */
  scoped?: boolean;
  /** Class name for scoped container when scoped=true */
  className?: string;
  /** Inline style for scoped container */
  style?: React.CSSProperties;
  children: React.ReactNode;
}
