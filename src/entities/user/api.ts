import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import type { UserInfo } from './model';

export async function fetchUser(id: string): Promise<ApiResponse<UserInfo>> {
	const data = await api.get<ApiResponse<UserInfo>>(`/users/${id}`);
	return data.data;
}
