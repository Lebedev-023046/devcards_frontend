import { Button, Stack } from '@chakra-ui/react';

interface CardLayoutProps {
	children: React.ReactNode;
	buttonText: string;
	onButtonClick: () => void;
}

export function CardLayout({
	children,
	buttonText,
	onButtonClick,
}: CardLayoutProps) {
	return (
		<Stack p='1.5rem 1rem' h='100%'>
			{children}
			<Button
				mt='auto'
				bg='button-primary-gradient'
				w='100%'
				onClick={onButtonClick}
			>
				{buttonText}
			</Button>
		</Stack>
	);
}
