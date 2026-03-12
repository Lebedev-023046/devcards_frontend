import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SessionState {
	access_token: string | null;
	refresh_token: string | null;
	signin: (access_token: string, refresh_token: string) => void;
	signout: () => void;
	getAccessToken: () => string | null;
	getRefreshToken: () => string | null;
	setTokens: (access_token: string, refresh_token: string) => void;
}

export const useSession = create<SessionState>()(
	persist(
		(set, get) => ({
			access_token: null,
			refresh_token: null,

			signin: (access_token: string, refresh_token: string) => {
				set({ access_token, refresh_token });
			},

			signout: () => {
				set({ access_token: null, refresh_token: null });
			},

			getAccessToken: () => {
				return get().access_token;
			},

			getRefreshToken: () => {
				return get().refresh_token;
			},

			setTokens: (access_token: string, refresh_token: string) => {
				set({ access_token, refresh_token });
			},
		}),
		{
			name: "token",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
