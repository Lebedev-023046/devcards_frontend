import { deckApi } from "@/entities/deck/api";
import { useQuery } from "@tanstack/react-query";

export function useGetTopDecks(limit = 3) {
	return useQuery({
		...deckApi.getTopDecksQueryOptions(limit),
	});
}
