import type { ThemeMode } from '@/shared/styles/tokens';
import { applyTheme } from '@/shared/styles/tokens';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from '../shared/api/query-client.ts';
import { AppRouter } from './AppRouter.tsx';
import './reset.css';

applyTheme((localStorage.getItem('theme') as ThemeMode) || 'light');

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppRouter />
		</QueryClientProvider>{' '}
	</StrictMode>,
);
