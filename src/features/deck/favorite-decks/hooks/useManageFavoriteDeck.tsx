import { useAddToFavoriteDecks } from '@/features/favorite/hooks/useAddToFavoriteDecks';
import { useRemoveFromFavoriteDecks } from '@/features/favorite/hooks/useRemoveFromFavoriteDecks';
import { IconButton, useToken } from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { useMemo } from 'react';
// import styles from './DeckCard.module.css';
import { useGetFavoriteDeckIds } from './useGetFavoriteDeckIds';

export function useManageFavoriteDeck({ deckId }: { deckId: string }) {
	const { data: favoriteDeckIds } = useGetFavoriteDeckIds();

	const { mutate: addToFavorite } = useAddToFavoriteDecks();
	const { mutate: removeFromFavorite } = useRemoveFromFavoriteDecks();

	const [yellow300] = useToken('colors', ['yellow.300']);

	const isDeckInFavorite = useMemo(
		() => !!favoriteDeckIds?.includes(deckId),
		[favoriteDeckIds, deckId],
	);

	const handleToggleFavorite = () => {
		if (isDeckInFavorite) {
			removeFromFavorite(deckId);
		} else {
			addToFavorite(deckId);
		}
	};

	const renderFavoriteDeckIcon = () => (
		<IconButton
			aria-label='toggle favorite'
			unstyled
			flexShrink={0}
			cursor='pointer'
			transition='transform 0.3s ease'
			transform={isDeckInFavorite ? 'rotate(72deg)' : undefined}
			onClick={handleToggleFavorite}
		>
			<Star size='1.5rem' fill={isDeckInFavorite ? yellow300 : 'none'} />
		</IconButton>
	);

	return {
		renderFavoriteDeckIcon,
	};
}
