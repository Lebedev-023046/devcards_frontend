import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import type { DeckRequest, DeckResponse } from './model';

export const deckApi = {
	getPublicDecks: () =>
		api
			.get<ApiResponse<DeckResponse[]>>(ENDPOINTS.decks.getPublic())
			.then(res => res.data),

	getUserDecks: () =>
		api
			.get<ApiResponse<DeckResponse[]>>(ENDPOINTS.decks.getMy())
			.then(res => res.data),

	createDeck: (payload: DeckRequest) =>
		api
			.post<ApiResponse<DeckResponse>>(ENDPOINTS.decks.create(), payload)
			.then(res => res.data),
};
