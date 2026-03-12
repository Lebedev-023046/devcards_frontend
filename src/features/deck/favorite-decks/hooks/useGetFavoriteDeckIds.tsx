import { userApi } from "@/entities/user/api";
import { useQuery } from "@tanstack/react-query";

export function useGetFavoriteDeckIds() {
	const {
		data: favoriteDeckIdsInfo = [],
		error,
		isLoading,
	} = useQuery({
		...userApi.getFavoriteDeckIdsQueryOptions(),
	});

	const favoriteDeckIds = favoriteDeckIdsInfo.map((item) => item.deckId);

	return { data: favoriteDeckIds, error, isLoading };
}
