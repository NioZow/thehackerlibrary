import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tw-merge';

/**
 * Conditionally render and merge the class names of a React component.
 * This is a combination of `clsx` and `twMerge`.
 * @param classList The class names
 * @returns A class list
 */
export const cn = (...classList: ClassValue[]) => twMerge(clsx(classList));
