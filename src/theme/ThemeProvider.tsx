'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ThemeColors,
  ThemeContextType,
  ThemeInput,
  ThemeMode,
  ThemeProviderProps,
} from './types';
import { applyCssVariables, generateCssVariablesMap } from './colorUtils';
import { resolveThemeColors } from './presets';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const DEFAULT_STORAGE_KEY = 'custom-ui-theme-mode';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme: initialTheme = 'default',
  defaultMode = 'system',
  mode: controlledMode,
  storageKey = DEFAULT_STORAGE_KEY,
  scoped = false,
  className = '',
  style = {},
  children,
}) => {
  const [themeState, setThemeState] = useState<ThemeInput>(initialTheme);
  const [internalMode, setInternalMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey) as ThemeMode | null;
        if (saved && ['light', 'dark', 'system'].includes(saved)) {
          return saved;
        }
      } catch {
        // Ignore localStorage error (e.g. iframe privacy)
      }
    }
    return defaultMode;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Allow updating controlled theme prop
  useEffect(() => {
    if (initialTheme !== undefined) {
      setThemeState(initialTheme);
    }
  }, [initialTheme]);

  const activeMode = controlledMode !== undefined ? controlledMode : internalMode;

  // Resolve 'system' mode to actual light/dark
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    setSystemIsDark(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const resolvedMode: 'light' | 'dark' =
    activeMode === 'system' ? (systemIsDark ? 'dark' : 'light') : activeMode;

  const isDark = resolvedMode === 'dark';

  // Calculate applied theme colors
  const resolvedColors: ThemeColors = useMemo(() => {
    return resolveThemeColors(themeState, isDark);
  }, [themeState, isDark]);

  // Apply CSS Variables and .dark class to target element
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targetElement: HTMLElement | null = scoped
      ? containerRef.current
      : document.documentElement;

    if (!targetElement) return;

    // Toggle dark class
    if (isDark) {
      targetElement.classList.add('dark');
    } else {
      targetElement.classList.remove('dark');
    }

    // Generate and apply CSS custom properties
    const cssVars = generateCssVariablesMap(resolvedColors, isDark);
    applyCssVariables(targetElement, cssVars);
  }, [resolvedColors, isDark, scoped]);

  const setMode = (newMode: ThemeMode) => {
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, newMode);
      } catch {
        // Ignore
      }
    }
    setInternalMode(newMode);
  };

  const toggleMode = () => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark');
  };

  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme: themeState,
      mode: activeMode,
      resolvedMode,
      colors: resolvedColors,
      setTheme: setThemeState,
      setMode,
      toggleMode,
    }),
    [themeState, activeMode, resolvedMode, resolvedColors]
  );

  if (scoped) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          className={`custom-ui-theme-provider ${className}`.trim()}
          style={style}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
