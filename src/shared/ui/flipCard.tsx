import { Box } from '@chakra-ui/react';
// import styles from './FlipCard.module.css';

interface FlipCardProps {
	isFlipped: boolean;
	front: React.ReactNode;
	back: React.ReactNode;
	className?: string;
}

export function FlipCard({ isFlipped, front, back, className }: FlipCardProps) {
	const deckSideProps = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: '1rem',
		color: 'text-primary',
		bg: 'bg-accent',
		boxShadow: 'lg',
		backfaceVisibility: 'hidden',
		transition: 'transform 0.8s ease',
		overflow: 'hidden',
	};

	return (
		<Box
			position='relative'
			minH='360px'
			h='100%'
			flex={'1 1 320px'}
			maxW={{ base: '100%', sm: '100%', md: '50%' }}
			css={{
				perspective: '150rem',
				mozPerspective: '150rem',
			}}
			className={className}
		>
			<Box
				{...deckSideProps}
				transform={isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'}
			>
				{front}
			</Box>
			<Box
				{...deckSideProps}
				transform={isFlipped ? 'rotateY(0)' : 'rotateY(180deg)'}
			>
				{back}
			</Box>
		</Box>
	);
}
