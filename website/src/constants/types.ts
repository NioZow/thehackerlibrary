export type Column = 'name' | 'tags' | 'price' | 'authors' | 'time' | 'date' | 'difficulty';

export type Status = 'both' | 'complete' | 'incomplete';

export const status: Status[] = ['complete', 'incomplete', 'both'];

export type Difficulty = 'easy' | 'medium' | 'hard' | 'insane';

export const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'insane'];

export type Tag = 'bookmark';

export const DifficultyColor: Record<Difficulty, string> = {
  easy: 'green',
  medium: 'orange',
  hard: 'red',
  insane: 'gray',
};

export interface Author {
  id: number;
  name: string;
  resourcesId: number | null;
}

export interface TagResource {
  id: number;
  name: string | null;
  resourcesId: number | null;
}

export enum EnumDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  INSANE = 'insane',
}

export interface Resource {
  id?: number;
  type?: string | null;
  name?: string | null;
  date?: string | null;
  url?: string | null;
  price?: number | null;
  difficulty?: Difficulty | null;
  time?: number | null;
  authors?: Author[];
  tags?: TagResource[];
}

export interface SearchParams {
  columns: Column[];
  difficulty: Difficulty[];
  where: string | null;
  reload: boolean;
  page: number;
  ids: number[];
  status: Status;
  bookmarks: number[];
}
