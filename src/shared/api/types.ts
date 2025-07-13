export interface ApiResponse<T> {
	success: boolean;
	message: string;
	statusCode: number;
	error?: string;
	data: T;
}
