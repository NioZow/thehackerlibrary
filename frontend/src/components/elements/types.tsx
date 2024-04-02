export interface Training {
  Type: string;
  Tags: Array<string>; 
  Price: number;
  Url: string;
  Authors: Array<string>;
  Name: string;
  Time: number;
  Date: string;
  Difficulty: string;
}

export interface WrapperProps {
  children: React.ReactNode;
}

export interface TrainingProps {
  setTraining: React.Dispatch<React.SetStateAction<Training | undefined>>;
  training: Training | undefined;
}

export type column = '' | 'Type' | 'Name' | 'Tags' | 'Price' | 'Authors' | 'Time to read' | 'Date' | 'Difficulty' | 'Read' | 'Actions'
export type columnStrict = 'Type' | 'Name' | 'Tags' | 'Price' | 'Authors' | 'Time' | 'Date' | 'Difficulty'
export type columnString = 'Type' | 'Name' | 'Date' | 'Difficulty'
export type columnNumber = 'Time' | 'Price'
export type columnArray = 'Authors' | 'Tags'