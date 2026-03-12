import axios from "axios";
import { ENDPOINTS } from "../api/endpoints";
import { useSession } from "../hooks/useSession";
import type { CustomAxiosInstance, ExtendedAxiosRequestConfig } from "./types";

export const api: CustomAxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config: ExtendedAxiosRequestConfig) => {
	if (config.skipAuth) {
		return config;
	}

	const token = useSession.getState().getAccessToken();
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(res) => {
		// If the response is from a refresh call, return it as is to handle it in the refresh logic
		if (res.config.url?.includes(ENDPOINTS.auth.refresh())) {
			return res;
		}

		// Handle standard response format
		const body = res.data;
		if (body && typeof body === "object" && "success" in body) {
			if (!body.success) {
				return Promise.reject(body);
			}
			return body.data;
		}

		return body;
	},
	async (error) => {
		const originalRequest = error.config as ExtendedAxiosRequestConfig;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.skipAuth
		) {
			originalRequest._retry = true;
			const refreshToken = useSession.getState().getRefreshToken();

			if (refreshToken) {
				try {
					const res = await axios.post(
						`${import.meta.env.VITE_API_URL}${ENDPOINTS.auth.refresh()}`,
						{
							refresh_token: refreshToken,
						},
					);

					const { access_token, refresh_token } = res.data.data;
					useSession.getState().setTokens(access_token, refresh_token);

					originalRequest.headers.Authorization = `Bearer ${access_token}`;
					return api(originalRequest);
				} catch (refreshError) {
					useSession.getState().signout();
					return Promise.reject(refreshError);
				}
			} else {
				useSession.getState().signout();
			}
		}

		return Promise.reject(error);
	},
);
