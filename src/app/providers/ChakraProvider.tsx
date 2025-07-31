import { ColorModeProvider } from '@/shared/styles/color-mode';
import system from '@/shared/styles/config';
import { ChakraProvider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { Fonts } from '../fonts';

export function AppChakraProvider({ children }: PropsWithChildren) {
	return (
		<ColorModeProvider>
			<ChakraProvider value={system}>
				<Fonts />
				{children}
			</ChakraProvider>
		</ColorModeProvider>
	);
}
