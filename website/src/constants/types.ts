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

export const status: Status[] = ['both', 'complete', 'uncomplete'];

export type Difficulty = 'easy' | 'medium' | 'hard' | 'insane';

export const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'insane'];
