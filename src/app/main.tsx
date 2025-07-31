import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { queryClient } from '../shared/api/query-client.ts';
import { AppRouter } from './AppRouter.tsx';
import { AppChakraProvider } from './providers/ChakraProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppChakraProvider>
			<QueryClientProvider client={queryClient}>
				<AppRouter />
			</QueryClientProvider>
		</AppChakraProvider>
	</StrictMode>,
);
