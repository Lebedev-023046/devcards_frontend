import { useSession } from "@/shared/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { userApi } from "../api";
import type { UserInfo } from "../model";

interface UseUserResult {
	data: UserInfo | null;
	error: unknown;
	isLoading: boolean;
	isAuth: boolean;
}

interface AccessTokenPayload {
	sub: string;
}

export const useUser = (): UseUserResult => {
	const token = useSession((s) => s.getAccessToken());
	const sub = token ? jwtDecode<AccessTokenPayload>(token).sub : undefined;
	const isAuth = Boolean(token);

	const {
		data: user,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["userInfo", sub],
		queryFn: () => userApi.getUser(sub as string),
		enabled: isAuth && Boolean(sub),
	});

	return { data: user || null, error, isLoading, isAuth };
};
