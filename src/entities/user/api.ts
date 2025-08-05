import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import { ENDPOINTS } from '@shared/api/endpoints';
import { queryOptions } from '@tanstack/react-query';
import type { Deck } from '../deck/model';
import type { AuthRequestDto, AuthResponseDto, UserInfo } from './model';

type AuthResponse = Promise<ApiResponse<AuthResponseDto>>;
type AuthRequest = AuthRequestDto;

export const userApi = {
	baseFavoriteDecksKey: 'favoriteDecks',

	getUser: async (id: string) =>
		api
			.get<ApiResponse<UserInfo>>(ENDPOINTS.user.getUser(id))
			.then(res => res.data),

	getFavoriteDecks: () =>
		api
			.get<ApiResponse<Deck[]>>(ENDPOINTS.user.getFavoriteDecks())
			.then(res => res.data),
	getFavoriteDeckIds: () =>
		api
			.get<ApiResponse<{ deckId: string }[]>>(
				ENDPOINTS.user.getFavoriteDeckIds(),
			)
			.then(res => res.data),

	// MUTATIONS
	addToFavoriteDecks: (deckId: string) =>
		api
			.post<ApiResponse<Deck[]>>(ENDPOINTS.user.addToFavoriteDecks(), {
				deckId,
			})
			.then(res => res.data),

	removeFromFavoriteDecks: (deckId: string) =>
		api
			.delete<ApiResponse<Deck[]>>(
				ENDPOINTS.user.removeFromFavoriteDecks(deckId),
			)
			.then(res => res.data),

	// QUERY OPTIONS
	getFavoriteDecksQueryOptions: () => {
		return queryOptions({
			queryKey: [userApi.baseFavoriteDecksKey],
			queryFn: () => userApi.getFavoriteDecks(),
		});
	},

	getFavoriteDeckIdsQueryOptions: () => {
		return queryOptions({
			queryKey: [userApi.baseFavoriteDecksKey, 'ids'],
			queryFn: () => userApi.getFavoriteDeckIds(),
		});
	},
};

export const authApi = {
	/**
	 * register new user
	 * @param payload.email
	 * @param payload.password
	 */
	signUp: async (payload: AuthRequest, signal?: AbortSignal): AuthResponse => {
		const res = await api.post<AuthResponse>(ENDPOINTS.auth.signup(), payload, {
			skipAuth: true,
			signal,
		});
		return res.data;
	},

	/**
	 * sign in
	 * @param payload.email
	 * @param payload.password
	 */
	signIn: async (payload: AuthRequest, signal?: AbortSignal): AuthResponse => {
		const res = await api.post<AuthResponse>(ENDPOINTS.auth.signin(), payload, {
			signal,
			skipAuth: true,
		});
		return res.data;
	},
};
