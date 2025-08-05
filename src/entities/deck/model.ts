import type { Card } from '../card/model';
import type { DeckTag } from '../tag/model';

export interface CardCreateRequest {
	question: string;
	answer: string;
	type: 'open' | 'boolean' | 'multipleChoice';
}

export interface DeckRequest {
	title: string;
	description?: string;
	isPublic?: boolean;
	coverImageUrl?: string;
	tagIds?: string[];
}

export interface Deck {
	id: string;
	title: string;
	description: string;
	isPublic: boolean;
	totalCards: number;

	coverImageUrl: string;

	ownerId: string;

	views: number;
	totalReviews: number;

	createdAt: string;
	updatedAt: string;

	cards: Card[];
	deckTags: DeckTag[];
}

export interface DeckPagineted {
	items: Deck[];
	page: number;
	limit: number;
	total: number;
	lastPage: number;
}
