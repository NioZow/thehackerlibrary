const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const reconstructName = (basename: string) => {
  return basename
    .split("-")
    .map((name) => capitalize(name))
    .join(" ");
};
