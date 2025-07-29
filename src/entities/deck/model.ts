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
	cards?: CardCreateRequest[];
}

export interface DeckResponse {
	id: string;
	title: string;
	description: string;
	isPublic: boolean;

	coverImageUrl: string;

	ownerId: string;

	views: number;
	totalReviews: number;

	createdAt: string;
	updatedAt: string;

	cardsCount?: number;
	tagIds?: string[];
	tags?: { id: string; name: string }[];
}
