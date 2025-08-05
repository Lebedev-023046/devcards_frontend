import { ENDPOINTS } from '@/shared/api/endpoints';
import type { ApiResponse } from '@/shared/api/types';
import { api } from '@/shared/lib/api';
import { infiniteQueryOptions } from '@tanstack/react-query';
import type { TagResponse } from './model';

export const tagsApi = {
	getAllTags: ({ page = 1, limit = 10 }) =>
		api
			.get<ApiResponse<TagResponse>>(ENDPOINTS.tags.getAll({ page, limit }))
			.then(res => res.data),

	getAllTagsInfinityQueryOptions: ({ page = 1, limit = 10 }) => {
		return infiniteQueryOptions({
			queryKey: ['allTags', page, limit],
			queryFn: meta => tagsApi.getAllTags({ page: meta.pageParam, limit: 10 }),
			initialPageParam: 1,
			getNextPageParam: lastPageResponse => {
				if (lastPageResponse.data.lastPage > lastPageResponse.data.page)
					return lastPageResponse.data.page + 1;
				return undefined;
			},
			select: res =>
				res.pages
					.flatMap(page => page.data.data)
					.map(tag => ({
						label: tag.name,
						value: tag.id,
					})),
		});
	},
};
