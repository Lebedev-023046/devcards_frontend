import { userApi } from '@/entities/user/api';
import { useQuery } from '@tanstack/react-query';

export function useGetFavoriteDeckIds() {
	const {
		data: favoriteDeckIdsInfo,
		error,
		isLoading,
	} = useQuery({
		...userApi.getFavoriteDeckIdsQueryOptions(),
	});

	if (!favoriteDeckIdsInfo) {
		return { data: null, error: 'Deck ids not found', isLoading: false };
	}

	const favoriteDeckIds = favoriteDeckIdsInfo.data?.map(item => item.deckId);

	return { data: favoriteDeckIds, error, isLoading };
}
