import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import { queryOptions } from '@tanstack/react-query';
import type { Deck, DeckPagineted, DeckRequest } from './model';

export const deckApi = {
	baseKey: 'decks',

	// GET
	getPublicDecks: () =>
		api
			.get<ApiResponse<DeckPagineted>>(ENDPOINTS.decks.getPublic())
			.then(res => res.data),

	getUserDecks: () =>
		api.get<ApiResponse<Deck[]>>(ENDPOINTS.decks.getMy()).then(res => res.data),

	getDeckById: (id: string) =>
		api
			.get<ApiResponse<Deck>>(ENDPOINTS.decks.getById(id))
			.then(res => res.data),

	// POST
	createDeck: (payload: DeckRequest) =>
		api
			.post<ApiResponse<Deck>>(ENDPOINTS.decks.create(), payload)
			.then(res => res.data),

	// DELETE
	deleteDeck: (id: string) =>
		api
			.delete<ApiResponse<Deck>>(ENDPOINTS.decks.remove(id))
			.then(res => res.data),

	//  QUERY OPTIONS
	// GET
	getPublicDecksQueryOptions: () => {
		return queryOptions({
			queryKey: [deckApi.baseKey, 'publicDecks'],
			queryFn: () => deckApi.getPublicDecks(),
		});
	},

	getUserDecksQueryOptions: () => {
		return queryOptions({
			queryKey: [deckApi.baseKey, 'userDecks'],
			queryFn: () => deckApi.getUserDecks(),
		});
	},
	getDeckByIdQueryOptions: (id: string) => {
		return queryOptions({
			queryKey: [deckApi.baseKey, 'deck', id],
			queryFn: () => deckApi.getDeckById(id),
		});
	},
};
