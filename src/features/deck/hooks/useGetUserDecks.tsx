import { deckApi } from "@/entities/deck/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserDecks() {
	return useQuery({
		...deckApi.getUserDecksQueryOptions(),
	});
}
