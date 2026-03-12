import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import type { Deck, DeckPagineted, DeckRequest } from "./model";

export const deckApi = {
	baseKey: "decks",

	// GET
	getPublicDecks: () => api.get<DeckPagineted>(ENDPOINTS.decks.getPublic()),

	getUserDecks: () => api.get<Deck[]>(ENDPOINTS.decks.getMy()),

	getDeckById: (id: string) => api.get<Deck>(ENDPOINTS.decks.getById(id)),

	// POST
	createDeck: (payload: DeckRequest) =>
		api.post<Deck>(ENDPOINTS.decks.create(), payload),

	// DELETE
	deleteDeck: (id: string) => api.delete<Deck>(ENDPOINTS.decks.remove(id)),

	//  QUERY OPTIONS
	// GET
	getPublicDecksQueryOptions: () => {
		return queryOptions({
			queryKey: [deckApi.baseKey, "publicDecks"],
			queryFn: () => deckApi.getPublicDecks(),
		});
	},

	getUserDecksQueryOptions: () => {
		return queryOptions({
			queryKey: [deckApi.baseKey, "userDecks"],
			queryFn: () => deckApi.getUserDecks(),
		});
	},
	getDeckByIdQueryOptions: (id: string) => {
		return queryOptions({
			queryKey: [deckApi.baseKey, "deck", id],
			queryFn: () => deckApi.getDeckById(id),
		});
	},
};
