import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import type { Card, CardRequest } from './model';

export const cardApi = {
	createCard: (payload: CardRequest) =>
		api.post<ApiResponse<Card[]>>(ENDPOINTS.cards.create(), payload),
};
