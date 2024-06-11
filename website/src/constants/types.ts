export type Column = '' | 'name' | 'tags' | 'price' | 'authors' | 'time to read' | 'date' | 'difficulty' | 'actions';

export const columns: Column[] = [
  '',
  'name',
  'tags',
  'price',
  'authors',
  'time to read',
  'date',
  'difficulty',
  'actions',
];

export type Status = 'both' | 'complete' | 'uncomplete';

export const status: Status[] = ['complete', 'uncomplete', 'both'];

export type Difficulty = 'easy' | 'medium' | 'hard' | 'insane';

export const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'insane'];

export type Tag = 'bookmark' | 'favorite';

export const tags: Tag[] = ['bookmark', 'favorite'];
