import { deckApi } from "@/entities/deck/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useGetDeckById() {
	const { deckId } = useParams();

	const {
		data: deckInfo,
		error,
		isLoading,
	} = useQuery({
		...deckApi.getDeckByIdQueryOptions(deckId ?? "0"),
		enabled: !!deckId,
	});

	return { data: deckInfo ?? null, error, isLoading };
}
