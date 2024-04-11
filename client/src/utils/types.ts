export interface Training {
  Type: string;
  Tags: Array<string>;
  Price: number;
  Url: string;
  Authors: Array<string>;
  Name: string;
  Time: number;
  Date: string;
  Difficulty: number;
}

export interface Resources {
  resources: Array<Training>;
  size: number;
}

export let transformDifficulty: Record<number, string> = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
  4: "Insane",
};

export interface WrapperProps {
  children: React.ReactNode;
}

export type column =
  | ""
  | "Type"
  | "Name"
  | "Tags"
  | "Price"
  | "Authors"
  | "Time to read"
  | "Date"
  | "Difficulty"
  | "Read"
  | "Actions";
export type columnStrict =
  | "Type"
  | "Name"
  | "Tags"
  | "Price"
  | "Authors"
  | "Time"
  | "Date"
  | "Difficulty";
export type columnString = "Type" | "Name" | "Date";
export type columnNumber = "Time" | "Price" | "Difficulty";
export type columnArray = "Authors" | "Tags";
