export const getSpaceCharacters = (spaces: number): string => Array
  .from<string>({ length: spaces })
  .reduce((acc) => `${acc} `, '');
