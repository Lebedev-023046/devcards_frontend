import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import type { TagResponse } from './model';

export const tagsApi = {
	async getAllTags({
		page = 1,
		limit = 10,
		search = '',
	}): Promise<ApiResponse<TagResponse>> {
		const data = await api.get<ApiResponse<TagResponse>>(
			ENDPOINTS.tags.getAll({ page, limit, search }),
		);

		return data.data;
	},
};
