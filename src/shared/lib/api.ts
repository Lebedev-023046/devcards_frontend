import axios from 'axios';
import { useSession } from '../hooks/useSession';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(config => {
	if (config.skipAuth) {
		console.log('skip auth check');
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
	res => res,
	error => {
		if (error.response?.status === 401) {
			useSession.getState().signout();
		}
		return Promise.reject(error);
	},
);
