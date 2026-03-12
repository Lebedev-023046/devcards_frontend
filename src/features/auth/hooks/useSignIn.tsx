import { authApi } from "@/entities/user/api";
import type { ApiResponse } from "@/shared/api/types";
import { useSession } from "@/shared/hooks/useSession";
import { ROUTES } from "@/shared/routes";
import { translateServerMessage } from "@/shared/utils/translateServerMessage";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useSignIn() {
	const { signin } = useSession();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.signIn,
		onSuccess(data) {
			signin(data.access_token, data.refresh_token);
			navigate(ROUTES.DECKS(), {
				replace: true,
			});
			toast.success("Добро пожаловать!");
		},
		onError(error) {
			const apiResponse = (error as AxiosError<ApiResponse<unknown>>)?.response
				?.data;
			if (apiResponse) {
				toast.error(translateServerMessage(apiResponse.message));
			}
		},
	});
}
