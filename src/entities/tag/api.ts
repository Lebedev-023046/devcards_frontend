import { ENDPOINTS } from "@/shared/api/endpoints";
import { api } from "@/shared/lib/api";
import { infiniteQueryOptions } from "@tanstack/react-query";
import type { TagResponse } from "./model";

export const tagsApi = {
	getAllTags: ({ page = 1, limit = 10 }) =>
		api.get<TagResponse>(ENDPOINTS.tags.getAll({ page, limit })),

	getAllTagsInfinityQueryOptions: ({ page = 1, limit = 10 }) => {
		return infiniteQueryOptions({
			queryKey: ["allTags", page, limit],
			queryFn: (meta) =>
				tagsApi.getAllTags({ page: meta.pageParam, limit: 10 }),
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
