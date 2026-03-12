import { useSession } from "@/shared/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import type { UserInfo } from "../model";

import { userApi } from "../api";

interface UseUserResult {
	data: UserInfo | null;
	error: unknown;
	isLoading: boolean;
	isAuth: boolean;
}

export const useUser = (): UseUserResult => {
	const token = useSession((s) => s.getAccessToken());

	const sub = token ? jwtDecode(token).sub : undefined;

	const {
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["userInfo", sub],
		queryFn: () => (sub ? userApi.getUser(sub) : null),
		enabled: !!sub,
	});

	const isAuth = Boolean(user);

	return { data: user || null, error, isLoading, isAuth };
};
