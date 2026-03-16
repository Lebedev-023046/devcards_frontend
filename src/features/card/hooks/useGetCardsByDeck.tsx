import { cardApi } from "@/entities/card/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCardsByDeck(deckId: string, page = 1, limit = 24) {
	return useQuery({
		...cardApi.getCardsByDeckQueryOptions(deckId, page, limit),
		enabled: Boolean(deckId),
	});
}
