import { userApi } from "@/entities/user/api";
import { useQuery } from "@tanstack/react-query";

export function useGetFavoriteDecks() {
	return useQuery({
		...userApi.getFavoriteDecksQueryOptions(),
	});
}
