import type { DeckRequest } from '@/entities/deck/model';
import { userApi } from '@/entities/user/api';
import type { ApiResponse } from '@/shared/api/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useRemoveFromFavoriteDecks() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: userApi.removeFromFavoriteDecks,
		async onError(error) {
			const apiResponse = (error as AxiosError<ApiResponse<DeckRequest>>)
				?.response?.data;
			if (apiResponse) {
				toast.error(apiResponse.message);
			}
		},

		onSettled() {
			queryClient.invalidateQueries({
				queryKey: [userApi.baseFavoriteDecksKey],
			});
		},
	});
}
