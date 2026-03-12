import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import { infiniteQueryOptions } from "@tanstack/react-query";
import type { TagResponse } from "./model";

export const tagsApi = {
	getAllTags: ({
		page = 1,
		limit = 10,
		search = "",
	}: {
		page?: number;
		limit?: number;
		search?: string;
	}) => api.get<TagResponse>(ENDPOINTS.tags.getAll({ page, limit, search })),

	getAllTagsInfinityQueryOptions: ({
		page = 1,
		limit = 10,
		search = "",
	}: {
		page?: number;
		limit?: number;
		search?: string;
	}) => {
		return infiniteQueryOptions({
			queryKey: ["allTags", page, limit, search],
			queryFn: (meta) =>
				tagsApi.getAllTags({ page: meta.pageParam, limit, search }),
			initialPageParam: 1,
			getNextPageParam: (lastPageResponse) => {
				if (lastPageResponse.lastPage > lastPageResponse.page)
					return lastPageResponse.page + 1;
				return undefined;
			},
			select: (res) =>
				res.pages
					.flatMap((page) => page.data)
					.map((tag) => ({
						label: tag.name,
						value: tag.id,
					})),
		});
	},
};
