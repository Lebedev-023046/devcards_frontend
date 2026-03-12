import {
	type InternalAxiosRequestConfig,
	type AxiosInstance,
	type AxiosRequestConfig,
} from "axios";

export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
	skipAuth?: boolean;
}

export interface CustomAxiosRequestConfig<
	D = unknown,
> extends AxiosRequestConfig<D> {
	skipAuth?: boolean;
}

export interface CustomAxiosInstance extends AxiosInstance {
	get<T = unknown, R = T, D = unknown>(
		url: string,
		config?: CustomAxiosRequestConfig<D>,
	): Promise<R>;
	delete<T = unknown, R = T, D = unknown>(
		url: string,
		config?: CustomAxiosRequestConfig<D>,
	): Promise<R>;
	post<T = unknown, R = T, D = unknown>(
		url: string,
		data?: D,
		config?: CustomAxiosRequestConfig<D>,
	): Promise<R>;
	put<T = unknown, R = T, D = unknown>(
		url: string,
		data?: D,
		config?: CustomAxiosRequestConfig<D>,
	): Promise<R>;
	patch<T = unknown, R = T, D = unknown>(
		url: string,
		data?: D,
		config?: CustomAxiosRequestConfig<D>,
	): Promise<R>;
}
