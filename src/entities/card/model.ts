export interface Option {
	id: string;
	text: string;
	isCorrect: boolean;
	cardId: string;

	createdAt: Date;
	updatedAt: Date;
}

export type CardType = 'SINGLE_CHOICE' | 'MULTI_CHOICE' | 'INFO';

export interface Card {
	id: string;
	question: string;
	type: CardType;
	answer?: string | null;
	options?: Option[];
	deckId: string;

	createdAt: Date;
	updatedAt: Date;
}

export interface CardRequest {
	deckId: string;
	question: string;
	type: CardType;
	answer?: string;
	options?: Option[];
}
