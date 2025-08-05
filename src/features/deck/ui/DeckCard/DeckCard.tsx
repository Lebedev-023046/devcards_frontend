import { ROUTES } from '@/shared/routes';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import cn from 'clsx';
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DeckCard.module.css';

interface Props {
	deckId: string;
	title: string;
	description: string;
	totalCards: number;
	tagNames: string[];
	// coverImageUrl: string;
	// tags: { id: string; name: string }[];
	// totalReviews: number;
	// views: number;
	// isPublic: boolean;
}

export function DeckCard({
	deckId,
	title,
	description,
	totalCards,
	tagNames,
}: Props) {
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	const [isMarkedAsFavorite, setIsMarkedAsFavorite] = useState(false);

	return (
		<Box className={cn(styles.deckCardWrapper, isInfoOpen && styles.open)}>
			<Box className={cn(styles.deckSide, styles.front)}>
				<Stack height={'100%'} overflow={'auto'} gap={2}>
					<Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
						<Heading as={'h2'}>{title}</Heading>
						{renderStar({
							state: isMarkedAsFavorite,
							cb: () => setIsMarkedAsFavorite(p => !p),
						})}
					</Flex>

					<Text>{description}</Text>
					<Flex wrap={'wrap'} mt={'auto'} gap={2} alignItems={'center'}>
						<Button
							asChild
							flex={'1 0 50%'}
							bg={'button-secondary-gradient'}
							onClick={() => setIsInfoOpen(true)}
						>
							<Link to={ROUTES.DECK(deckId)}>
								Перейти к колоде <ArrowUpRight />
							</Link>
						</Button>
						<Button
							flex={'1 0 50%'}
							bg={'button-primary-gradient'}
							onClick={() => setIsInfoOpen(true)}
						>
							Подробнее <ArrowRight />
						</Button>
					</Flex>
				</Stack>
			</Box>
			<Box className={cn(styles.deckSide, styles.back)}>
				<Stack height={'100%'} overflow={'auto'} gap={2}>
					<Text>Количество карточек: {totalCards}</Text>
					<Text>Теги: {tagNames.length ? tagNames.join(', ') : 'нет'}</Text>
					<Button
						mt={'auto'}
						bg={'button-primary-gradient'}
						onClick={() => setIsInfoOpen(false)}
					>
						<ArrowLeft /> Вернуться
					</Button>
				</Stack>
			</Box>
		</Box>
		// <div className={cn(styles.deckCardWrapper, isInfoOpen && styles.open)}>
		// 	<div className={cn(styles.deckSide, styles.front)}>
		// 		<div className={styles.frontHeader}>
		// 			<h3>{title}</h3>
		// 			<Star
		// 				size='1.5rem'
		// 				className={cn(styles.favorite, isMarkedAsFavorite && styles.rotate)}
		// 				fill={
		// 					isMarkedAsFavorite ? 'var(--chakra-colors-yellow-300)' : 'none'
		// 				}
		// 				onClick={() => setIsMarkedAsFavorite(p => !p)}
		// 			/>
		// 		</div>

		// 		<div>Карт в колоде: 22</div>
		// 		<div>Теги: здоровье, психология</div>

		// 		<Button onClick={() => setIsInfoOpen(true)}>Подробнее</Button>
		// 	</div>
		// 	<div className={cn(styles.deckSide, styles.back)}>
		// 		<p>Описание колоды</p>
		// 		<p>Сложность колоды</p>
		// 		<Button
		// 			// startIcon={<ArrowLeft />}
		// 			onClick={() => setIsInfoOpen(false)}
		// 		>
		// 			Вернуться
		// 		</Button>
		// 	</div>
		// </div>
	);
}

function renderStar({ state, cb }: { state: boolean; cb: () => void }) {
	return (
		<Star
			size='1.5rem'
			className={cn(styles.favorite, state && styles.rotate)}
			fill={state ? 'var(--chakra-colors-yellow-300)' : 'none'}
			onClick={cb}
		/>
	);
}
