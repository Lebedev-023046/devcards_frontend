import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from '../shared/api/query-client.ts';
import { AppRouter } from './AppRouter.tsx';
import './global.css';
import { ThemeProvider } from './providers/ThemeProvider.tsx';
import './reset.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AppRouter />
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>,
);
