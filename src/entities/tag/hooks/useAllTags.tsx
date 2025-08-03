import { useQuery } from '@tanstack/react-query';
import { tagsApi } from '../api';

export const useAllTags = () => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['allTags'],
		queryFn: () => tagsApi.getAllTags(),
	});

	return { data, isLoading, error };
};
