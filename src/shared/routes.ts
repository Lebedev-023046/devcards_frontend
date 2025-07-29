export const ROUTES = {
	LANDING: () => '/',

	SIGNIN: () => '/signin',
	SIGNUP: () => '/signup',

	DECKS: () => '/decks',
	DECK: (deckId: string) => `/decks/${deckId}`,
	CREATE_DECK: () => '/decks/create',
	UPDATE_DECK: () => '/decks/update',

	DECK_CARDS: (deckId: string) => `/decks/${deckId}/cards`,

	PROFILE: () => '/profile',
};
