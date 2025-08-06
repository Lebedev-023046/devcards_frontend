import { ROUTES } from '@/shared/routes';
import { useColorModeValue } from '@/shared/styles/color-mode';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import cn from 'clsx';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useManageFavoriteDeck } from '../../favorite-decks/hooks/useManageFavoriteDeck';
import { useDeleteDeckView } from '../../hooks/useManageDeckDeletion';
import styles from './DeckCard.module.css';

interface Props {
	deckId: string;
	title: string;
	description: string;
	totalCards: number;
	tagNames: string[];
	deckCoverUrl: string;
}

export function DeckCard({
	deckId,
	title,
	description,
	totalCards,
	tagNames,
	deckCoverUrl,
}: Props) {
	const [isInfoOpen, setIsInfoOpen] = useState(false);

	const { renderConfirmDeckDeletionDialog, renderRemoveIcon } =
		useDeleteDeckView();
	const { renderFavoriteDeckIcon } = useManageFavoriteDeck({ deckId });

	const bgImagePath = deckCoverUrl
		? `${import.meta.env.VITE_API_URL}${deckCoverUrl}`
		: undefined;

	const overlay = useColorModeValue(
		'',
		'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)),', // Чёрный полупрозрачный градиент для dark
	);

	return (
		<>
			{renderConfirmDeckDeletionDialog()}
			<Box className={cn(styles.deckCardWrapper, isInfoOpen && styles.open)}>
				<Box
					bg={bgImagePath ? 'transparent' : 'bg-accent'}
					bgImage={`${overlay} url(${bgImagePath})`}
					bgRepeat='no-repeat'
					bgSize='cover'
					className={cn(styles.deckSide, styles.front)}
				>
					<Stack height={'100%'} overflow={'auto'} gap={2}>
						<Flex
							gap={2}
							alignItems={'flex-start'}
							justifyContent={'space-between'}
						>
							<Heading as={'h2'}>{title}</Heading>
							<Flex gap={2} mt='0.2rem'>
								{renderRemoveIcon(deckId)}
								{renderFavoriteDeckIcon()}
							</Flex>
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
				<Box
					bg={bgImagePath ? 'transparent' : 'bg-accent'}
					bgImage={`${overlay} url(${bgImagePath})`}
					bgRepeat='no-repeat'
					bgSize='cover'
					className={cn(styles.deckSide, styles.back)}
				>
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
		</>
	);
}
