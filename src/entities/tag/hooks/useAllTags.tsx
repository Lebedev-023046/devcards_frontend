import { useInfiniteQuery } from '@tanstack/react-query';
import { tagsApi } from '../api';

export const useAllTags = (page: number = 1, limit: number = 10) => {
	const { data, isLoading, error, fetchNextPage } = useInfiniteQuery({
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

	return { data, isLoading, error, fetchNextPage };
};
