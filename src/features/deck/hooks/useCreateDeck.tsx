import { deckApi } from "@/entities/deck/api";
import type { DeckRequest } from "@/entities/deck/model";
import type { ApiResponse } from "@/shared/api/types";
import { ROUTES } from "@/shared/routes";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useCreateDeck() {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: deckApi.createDeck,
		async onSuccess(deck) {
			navigate(ROUTES.DECK(deck.id), {
				replace: true,
			});
			toast.success("Колода успешно создана!");
		},
		async onError(error) {
			const apiResponse = (error as AxiosError<ApiResponse<DeckRequest>>)
				?.response?.data;
			if (apiResponse) {
				toast.error(apiResponse.message);
			}
		},
	});
}
