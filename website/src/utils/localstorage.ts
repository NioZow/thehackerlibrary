export function saveData<T>(name: string, elements: T[]) {
  window.localStorage.setItem(name, JSON.stringify(elements));
}

export function getData<T>(name: string): T[] {
  const items: string | null = window.localStorage.getItem(name);

  if (items !== null) {
    return JSON.parse(items) as T[];
  }

  return [];
}
