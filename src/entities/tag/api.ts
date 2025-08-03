import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import type { Tag } from './model';

export const tagsApi = {
	async getAllTags(
		page: number = 1,
		limit: number = 10,
	): Promise<ApiResponse<Tag>> {
		const data = await api.get<ApiResponse<Tag>>(
			ENDPOINTS.tags.getAll(page, limit),
		);

		return data.data;
	},
};
