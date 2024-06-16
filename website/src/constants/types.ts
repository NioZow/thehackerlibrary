export type Column = '' | 'name' | 'tags' | 'price' | 'authors' | 'time to read' | 'date' | 'difficulty' | 'actions';

export const columns: Column[] = [
  '',
  'name',
  'tags',
  'authors',
  'date',
  'time to read',
  'difficulty',
  'price',
  'actions',
];

export type Status = 'both' | 'complete' | 'uncomplete';

export const status: Status[] = ['complete', 'uncomplete', 'both'];

export type Difficulty = 'easy' | 'medium' | 'hard' | 'insane';

export const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'insane'];

export type Tag = 'bookmark' | 'favorite';

export const tags: Tag[] = ['bookmark', 'favorite'];

export interface Author {
  id: number;
  name: string;
  resourcesId: number | null;
}

interface TagResource {
  id: number;
  name: string | null;
  resourcesId: number | null;
}

export enum EnumDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface Resource {
  id?: number;
  type?: string | null;
  name?: string | null;
  date?: string | null;
  url?: string | null;
  price?: number | null;
  difficulty?: EnumDifficulty | null;
  time?: number | null;
  authors?: Author[];
  tags?: TagResource[];
}

export interface SearchParams {
  columns: Column[];
  where: string | null;
}
