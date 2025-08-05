import { deckApi } from '@/entities/deck/api';
import { useQuery } from '@tanstack/react-query';

export function useGetPublicDecks() {
	return useQuery({
		queryKey: ['getPublicDecks'],
		queryFn: () => deckApi.getPublicDecks(),
	});
}
