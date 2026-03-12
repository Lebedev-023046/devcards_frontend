import { useInfiniteQuery } from "@tanstack/react-query";
import { tagsApi } from "../api";

export const useAllTags = (page: number = 1, limit: number = 10) => {
	const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
		...tagsApi.getAllTagsInfinityQueryOptions({ page, limit }),
	});

	return { data, isLoading, error, fetchNextPage };
};
