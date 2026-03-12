import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import type { Card, CardRequest } from "./model";

export const cardApi = {
	baseKey: "cards",

	getCardsByDeck: (deckId: string, page = 1, limit = 10) =>
		api.get<Card[]>(ENDPOINTS.cards.getByDeck(deckId), {
			params: { page, limit },
		}),

	getCardById: (id: string) => api.get<Card>(ENDPOINTS.cards.getById(id)),

	createCard: (payload: CardRequest) =>
		api.post<Card>(ENDPOINTS.cards.create(), payload),

	updateCard: (id: string, payload: Partial<CardRequest>) =>
		api.patch<Card>(ENDPOINTS.cards.update(id), payload),

	deleteCard: (id: string) => api.delete<Card>(ENDPOINTS.cards.remove(id)),

	// QUERY OPTIONS
	getCardsByDeckQueryOptions: (
		deckId: string,
		page?: number,
		limit?: number,
	) => {
		return queryOptions({
			queryKey: [cardApi.baseKey, "by-deck", deckId, page, limit],
			queryFn: () => cardApi.getCardsByDeck(deckId, page, limit),
		});
	},
};
