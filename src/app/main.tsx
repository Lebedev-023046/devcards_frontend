import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { queryClient } from '../shared/api/query-client.ts';
import { AppRouter } from './AppRouter.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppRouter />
		</QueryClientProvider>{' '}
		d
	</StrictMode>,
);
