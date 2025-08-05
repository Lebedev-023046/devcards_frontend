import { deckApi } from '@/entities/deck/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useGetDeckById() {
	const { deckId } = useParams();

	if (!deckId) {
		return { data: null, error: 'Deck id not found', isLoading: false };
	}

	const enabled = !!deckId;

	const {
		data: deckInfo,
		error,
		isLoading,
	} = useQuery({
		...deckApi.getDeckByIdQueryOptions(deckId),
		enabled,
	});

	return { data: deckInfo?.data, error, isLoading };
}
