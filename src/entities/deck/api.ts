import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import type { Deck, DeckPaginated, DeckRequest } from "./model";

export const deckApi = {
	baseKey: "decks",

	// GET
	getPublicDecks: (page = 1, limit = 10, query = "") => {
		return api.get<DeckPaginated>(ENDPOINTS.decks.getPublic(), {
			params: { page, limit, query },
		});
	},

	getTopDecks: (limit = 5) =>
		api.get<Deck[]>(ENDPOINTS.decks.getTop(), {
			params: { limit },
		}),

	getUserDecks: () => api.get<Deck[]>(ENDPOINTS.decks.getMy()),

	getDeckById: (id: string) => api.get<Deck>(ENDPOINTS.decks.getById(id)),

	// POST
	createDeck: (payload: DeckRequest) =>
		api.post<Deck>(ENDPOINTS.decks.create(), payload),

	// DELETE
	deleteDeck: (id: string) => api.delete<Deck>(ENDPOINTS.decks.remove(id)),

	// QUERY OPTIONS
	getPublicDecksQueryOptions: (
		page?: number,
		limit?: number,
		query?: string,
	) => {
		return queryOptions({
			queryKey: [deckApi.baseKey, "publicDecks", page, limit, query],
			queryFn: () => deckApi.getPublicDecks(page, limit, query),
		});
	},

	getTopDecksQueryOptions: (limit?: number) => {
		return queryOptions({
			queryKey: [deckApi.baseKey, "topDecks", limit],
			queryFn: () => deckApi.getTopDecks(limit),
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
