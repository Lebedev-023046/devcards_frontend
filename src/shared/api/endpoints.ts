export const ENDPOINTS = {
	auth: {
		signin: () => '/auth/signin',
		signup: () => '/auth/signup',
	},

	decks: {
		getPublic: () => `/decks/public`, // query params: page, limit, query?, tagId?
		getTop: () => `/decks/top`,
		getMy: () => `/decks/my`,
		getById: (id: string) => `/decks/${id}`,
		create: () => `/decks`,
		update: (id: string) => `/decks/${id}`,
		remove: (id: string) => `/decks/${id}`,
	},

	cards: {
		getByDeck: (deckId: string) => `/cards/by-deck/${deckId}`, // query params: page limit
		getById: (id: string) => `/cards/${id}`,
		create: () => `/cards`,
		update: (id: string) => `/cards/${id}`,
		remove: (id: string) => `/cards/${id}`,
	},

	deckTags: {
		getAll: () => `/tags`,
		getByDeck: (deckId: string) => `/decks/${deckId}/tags`,
		create: () => `/tags`,
		attachToDeck: (deckId: string, tagId: string) => `/decks/${deckId}/tags/${tagId}`,
		detachFromDeck: (deckId: string, tagId: string) => `/decks/${deckId}/tags/${tagId}`,
	},

	progress: {
		getDeckProgress: (deckId: string) => `/decks/${deckId}/progress`, // query params: filter ('all' | 'learned' | 'inProgress')
		addCardReview: (cardId: string) => `/cards/${cardId}/review`,
		resetDeckProgress: (deckId: string) => `/decks/${deckId}/progress`,
	},

	favorites: {
		getFavoriteDecks: () => `/decks/favorites`,
		addFavoriteDeck: (deckId: string) => `/decks/${deckId}/favorite`,
		remove: (deckId: string) => `/favorites/${deckId}`,
		removeFavoriteDeck: (deckId: string) => `/decks/${deckId}/favorite`,
	},
} as const;
