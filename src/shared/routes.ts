export const ROUTES = {
	SIGNIN: () => '/signin',
	SIGNUP: () => '/signup',
	LANDING: () => '/',
	DECKS: () => '/decks',
	DECK: (deckId: string) => `/decks/${deckId}`,
	CARDS: (deckId: string) => `/decks/${deckId}/cards`,
	PROFILE: () => '/profile',
};
