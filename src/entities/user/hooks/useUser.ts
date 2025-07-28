import type { ApiResponse } from '@/shared/api/types';
import { useSession } from '@/shared/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import type { UserInfo } from '../model';

import { userApi } from '../api';

/**
 * @param withMeta - if true, returns user info with meta
 * 	( success: boolean;
		message: string;
		statusCode: number;
		error?: string; )
 */

interface Props {
	withMeta?: boolean;
}

interface UseUserResult {
	data: UserInfo | null;
	error: unknown;
	isLoading: boolean;
	isAuth: boolean;
	meta?: ApiResponse<UserInfo>;
}

function isApiResponse<T>(obj: any): obj is ApiResponse<T> {
	return obj && typeof obj === 'object' && 'data' in obj && 'statusCode' in obj;
}

export const useUser = ({ withMeta = false }: Props = {}): UseUserResult => {
	const token = useSession(s => s.getAccessToken());

	const sub = token ? jwtDecode(token).sub : undefined;

	const {
		data: raw,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['userInfo', sub],
		queryFn: () => userApi.getUser(sub!),
		enabled: !!sub,
	});

	let user: UserInfo | null = null;
	let meta: ApiResponse<UserInfo> | undefined;

	if (raw) {
		if (isApiResponse<UserInfo>(raw)) {
			user = raw.data;
			meta = raw;
		} else {
			user = raw as unknown as UserInfo;
		}
	}

	const isAuth = Boolean(user);

	return withMeta
		? { data: user, meta, error, isLoading, isAuth }
		: { data: user, error, isLoading, isAuth };
};
