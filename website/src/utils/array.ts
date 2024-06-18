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

export const isDefined = <T>(el: T | undefined | null): el is T => {
  return !!el;
};

export const commaSeparatedToArray = (text: string): string[] => {
  return text.split(',');
};

export const Capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
