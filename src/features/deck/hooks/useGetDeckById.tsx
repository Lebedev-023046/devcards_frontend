import { deckApi } from '@/entities/deck/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function useGetDeckById() {
	const { deckId } = useParams();

	const enabled = !!deckId;

	const {
		data: deckInfo,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['getDeckById', deckId],
		queryFn: () => deckApi.getDeckById(deckId!),
		enabled,
	});

	return { data: deckInfo?.data, error, isLoading };
}
