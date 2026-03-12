import { api } from "../lib/api";
import { ENDPOINTS } from "./endpoints";

// export type UploadResponse = {};

export const uploadsApi = {
	uploadDeckCover: async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await api.post<{ url: string }>(
			ENDPOINTS.uploads.deckCover(),
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			},
		);

		return response.url;
	},
};
