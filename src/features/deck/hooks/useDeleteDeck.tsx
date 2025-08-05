import { deckApi } from '@/entities/deck/api';
import type { Deck, DeckRequest } from '@/entities/deck/model';
import type { ApiResponse } from '@/shared/api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useDeleteDeck() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deckApi.deleteDeck,
		onSuccess(_, variables) {
			const todos = queryClient.getQueryData<Deck[]>([deckApi.baseKey]);

			if (todos) {
				queryClient.setQueryData(
					[deckApi.baseKey],
					todos.filter(todo => todo.id !== variables),
				);
			}
			toast.success('Колода удалена');
		},
		onError(error) {
			const apiResponse = (error as AxiosError<ApiResponse<DeckRequest>>)
				?.response?.data;
			if (apiResponse) {
				toast.error(apiResponse.message);
			}
		},
		onSettled() {
			queryClient.invalidateQueries({ queryKey: [deckApi.baseKey] });
		},
	});
}
