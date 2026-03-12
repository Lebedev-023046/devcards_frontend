import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import type { Card, CardRequest } from "./model";

export const cardApi = {
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
};
