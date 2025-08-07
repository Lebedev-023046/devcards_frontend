import { Flex } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export function CommonCard({ children }: PropsWithChildren) {
	return (
		<Flex
			alignItems={'center'}
			justifyContent={'center'}
			flex={'1 1 320px'}
			maxW={{ base: '100%', sm: '100%', md: '50%' }}
			borderRadius='1rem'
			boxShadow='lg'
			p='1.5rem 1rem'
			bg='bg-accent'
			color='text-primary'
			cursor='pointer'
		>
			{children}
		</Flex>
	);
}
