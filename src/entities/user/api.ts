import { api } from "@/shared/lib/api";
import { ENDPOINTS } from "@shared/api/endpoints";
import { queryOptions } from "@tanstack/react-query";
import type { Deck } from "../deck/model";
import type { AuthRequestDto, AuthResponseDto, UserInfo } from "./model";

type AuthResponse = Promise<AuthResponseDto>;
type AuthRequest = AuthRequestDto;

export const userApi = {
	baseFavoriteDecksKey: "favoriteDecks",

	getUser: async (id: string) => api.get<UserInfo>(ENDPOINTS.user.getUser(id)),

	getFavoriteDecks: () => api.get<Deck[]>(ENDPOINTS.user.getFavoriteDecks()),
	getFavoriteDeckIds: () =>
		api.get<{ deckId: string }[]>(ENDPOINTS.user.getFavoriteDeckIds()),

	// MUTATIONS
	addToFavoriteDecks: (deckId: string) =>
		api.post<Deck[]>(ENDPOINTS.user.addToFavoriteDecks(), {
			deckId,
		}),

	removeFromFavoriteDecks: (deckId: string) =>
		api.delete<Deck[]>(ENDPOINTS.user.removeFromFavoriteDecks(deckId)),

	// QUERY OPTIONS
	getFavoriteDecksQueryOptions: () => {
		return queryOptions({
			queryKey: [userApi.baseFavoriteDecksKey],
			queryFn: () => userApi.getFavoriteDecks(),
		});
	},

	getFavoriteDeckIdsQueryOptions: () => {
		return queryOptions({
			queryKey: [userApi.baseFavoriteDecksKey, "ids"],
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
		return api.post<AuthResponseDto>(ENDPOINTS.auth.signup(), payload, {
			skipAuth: true,
			signal,
		});
	},

	/**
	 * sign in
	 * @param payload.email
	 * @param payload.password
	 */
	signIn: async (payload: AuthRequest, signal?: AbortSignal): AuthResponse => {
		return api.post<AuthResponseDto>(ENDPOINTS.auth.signin(), payload, {
			signal,
			skipAuth: true,
		});
	},
};
