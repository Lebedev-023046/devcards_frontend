import type { ApiResponse } from '@/shared/api/types';
import { useSession } from '@/shared/hooks/useSession';
import { ROUTES } from '@/shared/routes';
import { translateServerMessage } from '@/shared/utils/translateServerMessage';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from '../api';
import type { AuthRequestDto } from '../model';

export function useSignUp() {
	const { signin } = useSession();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.signUp,
		onSuccess(apiResponse) {
			signin(apiResponse.data.access_token);
			navigate(ROUTES.DECKS(), {
				replace: true,
			});
			toast.success('Добро пожаловать!');
		},
		onError(error) {
			const apiResponse = (error as AxiosError<ApiResponse<AuthRequestDto>>)
				?.response?.data;
			if (apiResponse) {
				toast.error(translateServerMessage(apiResponse.message));
			}
		},
	});
}
