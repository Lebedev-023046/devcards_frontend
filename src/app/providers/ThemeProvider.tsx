import { useTheme } from '@/shared/styles/useTheme';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
	useTheme();
	return <>{children}</>;
}
