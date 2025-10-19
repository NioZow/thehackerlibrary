export const getPageNumber = (value: string | undefined | null): number => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 ? num : 0;
};

export const constructParams = (page: number, query?: string): string => {
  const elements = [];

  if (query) elements.push(`query=${query}`);
  if (page) elements.push(`page=${page}`);

  return elements.join("&");
};
