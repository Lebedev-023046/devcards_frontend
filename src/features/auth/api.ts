import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import { ENDPOINTS } from '@shared/api/endpoints';
import type { AuthRequestDto, AuthResponseDto } from './types';

type AuthResponse = Promise<ApiResponse<AuthResponseDto>>;
type AuthRequest = AuthRequestDto;

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
