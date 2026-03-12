import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";

export type ProgressFilter = "all" | "learned" | "inProgress";

export interface CardReviewPayload {
	answer: string | string[] | null;
}

export const progressApi = {
	baseKey: "progress",

	getDeckProgress: (deckId: string, filter?: ProgressFilter) =>
		api.get(ENDPOINTS.progress.getDeckProgress(deckId), {
			params: filter ? { filter } : undefined,
		}),

	addCardReview: (cardId: string, payload: CardReviewPayload) =>
		api.post(ENDPOINTS.progress.addCardReview(cardId), payload),

	resetDeckProgress: (deckId: string) =>
		api.post(ENDPOINTS.progress.resetDeckProgress(deckId)),

	// QUERY OPTIONS
	getDeckProgressQueryOptions: (deckId: string, filter?: ProgressFilter) => {
		return queryOptions({
			queryKey: [progressApi.baseKey, "deck", deckId, filter],
			queryFn: () => progressApi.getDeckProgress(deckId, filter),
		});
	},
};
