export interface Tag {
	id: string;
	name: string;
}

export interface TagResponse {
	data: Tag[];
	total: number;
	page: number;
	lastPage: number;
}

export interface DeckTag {
	deckId: string;
	tagId: string;
	tag: Tag;
}
