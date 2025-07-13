import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionState {
	access_token: string | null;
	signin: (token: string) => void;
	signout: () => void;
	getAccessToken: () => string | null;
}

export const useSession = create<SessionState>()(
	persist(
		(set, get) => ({
			access_token: null,

			signin: (token: string) => {
				set({ access_token: token });
			},

			signout: () => {
				set({ access_token: null });
			},

			getAccessToken: () => {
				return get().access_token;
			},
		}),
		{
			name: 'token',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
