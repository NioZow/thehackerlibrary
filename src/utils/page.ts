export const getPageNumber = (value: string | undefined | null): number => {
  const num = Number(value);
  return !isNaN(num) && num >= 0 ? num : 0;
};

export const constructParams = (
  page: number,
  query?: string,
  review?: string,
): string => {
  const elements = [];

  if (query) elements.push(`query=${query}`);
  if (page) elements.push(`page=${page}`);
  if (review) elements.push(`review=${review}`);

  return elements.join("&");
};
