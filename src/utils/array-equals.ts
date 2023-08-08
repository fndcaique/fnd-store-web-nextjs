export const arrayEquals = (a: unknown[], b: unknown[]) =>
  a &&
  b &&
  (a === b ||
    (a.length === b.length &&
      a.every((element, index) => element === b[index])));
