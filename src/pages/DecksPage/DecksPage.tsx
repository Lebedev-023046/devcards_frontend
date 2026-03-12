import { useGetPublicDecks } from '@/features/deck/hooks/useGetPublicDecks';
import { DeckCard } from '@/features/deck/ui/DeckCard';
import { ROUTES } from '@/shared/routes';
import { Box, Button, Heading, Wrap } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import styles from './DecksPage.module.css';

function DecksPage() {
	const navigate = useNavigate();
	const { data: publicDecks } = useGetPublicDecks();

	console.log(publicDecks);

	return (
		<Box height={'100%'}>
			<div className={styles.sectionHeader}>
				<Heading as={'h1'} fontSize={'3xl'} color='text-contrast'>
					Публичные колоды
				</Heading>
				<div className={styles.sectionControls}>
					<Button
						bg={'button-primary-gradient'}
						onClick={() => navigate(ROUTES.CREATE_DECK())}
					>
						Создать колоду
					</Button>
				</div>
			</div>
			<Wrap gap={4} my={8}>
				{publicDecks?.items.map(deck => (
					<DeckCard
						key={deck.id}
						deckId={deck.id}
						title={deck.title}
						description={deck.description}
						totalCards={deck.totalCards ?? 0}
						deckCoverUrl={deck.coverImageUrl}
						tagNames={deck.deckTags.map(tagInfo => tagInfo.tag.name)}
					/>
				))}
			</Wrap>
		</Box>
	);
}

export default DecksPage;
