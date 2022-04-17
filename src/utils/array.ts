const groupBy = <T extends any>(
  array: T[],
  predicate: (v: T) => string,
): T[][] =>
  Object.values(
    array.reduce((acc, value) => {
      (acc[predicate(value)] ||= []).push(value);
      return acc;
    }, {} as { [key: string]: T[] }),
  );

export { groupBy };
