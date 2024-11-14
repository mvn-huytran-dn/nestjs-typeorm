export const getEnumNumberValues = (enumVal: {
  [val: number]: string;
}): number[] => {
  return Object.keys(enumVal)
    .filter((item) => {
      return !isNaN(Number(item));
    })
    .map((item: string) => parseInt(item, 10));
};

export const getEnumDescription = (enumVal: {
  [val: number]: string;
}): string => {
  const mappingString = getEnumNumberValues(enumVal)
    .filter((key) => enumVal[key].includes('UNKNOWN') === false)
    .map((key) => `${key} : ${enumVal[key]}`)
    .join(', ');
  return `{ ${mappingString} }`;
};

export const getStringEnumDescription = (enumVal: {
  [val: string]: string;
}): string => {
  return getEnumValues(enumVal).join(', ');
};

export const enumKeys = (target: Record<string, number | string>): string[] => {
  const allKeys: string[] = Object.keys(target);
  const parsedKeys: string[] = [];

  for (const key of allKeys) {
    const needToIgnore: boolean =
      target[target[key]]?.toString() === key && !isNaN(parseInt(key));

    if (!needToIgnore) {
      parsedKeys.push(key);
    }
  }
  return parsedKeys;
};
function getEnumValues(enumVal: { [val: string]: string }) {
  return Object.keys(enumVal).map((key) => enumVal[key]);
}
