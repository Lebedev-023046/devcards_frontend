import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import type { Deck, DeckPagineted, DeckRequest } from './model';

export const deckApi = {
	getPublicDecks: () =>
		api
			.get<ApiResponse<DeckPagineted>>(ENDPOINTS.decks.getPublic())
			.then(res => res.data),

	getUserDecks: () =>
		api.get<ApiResponse<Deck[]>>(ENDPOINTS.decks.getMy()).then(res => res.data),

	createDeck: (payload: DeckRequest) =>
		api
			.post<ApiResponse<Deck>>(ENDPOINTS.decks.create(), payload)
			.then(res => res.data),

	getDeckById: (id: string) =>
		api
			.get<ApiResponse<Deck>>(ENDPOINTS.decks.getById(id))
			.then(res => res.data),
};
