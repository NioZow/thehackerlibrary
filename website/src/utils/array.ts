/**
 * Stringify an array by putting "," and an "and" between each element.
 * @param arr The array to stringify
 * @returns A stringified version of the array
 */
export const arrayToString = (arr: string[]): string => {
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, arr.length - 1).join(', ')} and ${arr[arr.length - 1]}`;
};

export const arrayToCommaSeparated = <T>(array: T[]): string => {
  let str: string = '';
  array.map((value) => {
    str += `${value},`;
  });

  return str.slice(0, -1);
};

export const commaSeparatedToArray = <T>(text: string): T[] => {
  return text.split(',') as T[];
};
