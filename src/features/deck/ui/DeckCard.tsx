import { ROUTES } from '@/shared/routes';
import { useColorModeValue } from '@/shared/styles/color-mode';

import { FlipCard } from '@/shared/ui/flipCard';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useManageFavoriteDeck } from '../favorite-decks/hooks/useManageFavoriteDeck';
import { useDeleteDeckView } from '../hooks/useManageDeckDeletion';

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
		'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)),',
	);

	const front = (
		<Box
			bg={bgImagePath ? 'transparent' : 'bg-accent'}
			bgImage={`${overlay} url(${bgImagePath})`}
			p='1.5rem 1rem'
			h='100%'
			bgRepeat='no-repeat'
			bgSize='cover'
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
	);

	const back = (
		<Box
			bg={bgImagePath ? 'transparent' : 'bg-accent'}
			bgImage={`${overlay} url(${bgImagePath})`}
			p='1.5rem 1rem'
			h={'100%'}
			bgRepeat='no-repeat'
			bgSize='cover'
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
	);

	return (
		<>
			{renderConfirmDeckDeletionDialog()}
			<FlipCard front={front} back={back} isFlipped={isInfoOpen} />
		</>
	);
}
