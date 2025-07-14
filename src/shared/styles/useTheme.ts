import { useEffect, useState } from 'react';
import { applyTheme, type ThemeMode } from './tokens';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    (localStorage.getItem('theme') as ThemeMode) || 'light'
  );
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  return { theme, setTheme } as const;
}