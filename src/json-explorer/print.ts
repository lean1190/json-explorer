import { Print, Value, JsonObject } from "./types";

export const getSpaceCharacters = (spaces: number): string => Array.from<string>({ length: spaces }).reduce((acc) => `${acc} `, '');

export const printPrimitiveProperty = ({ value, propertyName, spaces }: Print): string => {
  const isString = typeof value === 'string';

  return getSpaceCharacters(spaces) +
    (propertyName ? `${propertyName}: ` : '') +
    (isString ? `'${value.toString()}'` : value.toString()) +
    ',\n';
}

export const printArrayProperty = ({
  value,
  propertyName,
  spaces
}: (Print & { value: Value[] })): string => {
  return `${getSpaceCharacters(spaces)}${propertyName}: [\n` +
    value.reduce((acc, current) => `${acc}${printProperty({
        value: current,
        spaces: spaces + 2
    })}\n`, '') +
  '],\n';
}

export const printObjectProperty = ({
  value,
  propertyName,
  spaces
}: (Print & { value: JsonObject })): string => {
  const spaceCharacters = getSpaceCharacters(spaces);
  return spaceCharacters +
    (propertyName ? `${propertyName}: ` : '') +
    (`{\n`) +
    Object
      .getOwnPropertyNames((value))
      .reduce((acc, property) => `${acc}${printProperty({
        value: (value as JsonObject)[property],
        propertyName: property,
        spaces: spaces + 2
      })}`, '') +
    (`${spaceCharacters}},`);
}

export const printProperty = ({
  value,
  propertyName = '',
  spaces = 0
}: (Partial<Print> & Pick<Print, 'value'>)): string => {
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return printPrimitiveProperty({ value, propertyName, spaces });
  }

  if (Array.isArray(value)) {
    return printArrayProperty({ value, propertyName, spaces });
  }

  if (typeof value === 'object') {
    return printObjectProperty({
      value: value as JsonObject,
      propertyName,
      spaces
    });
  }

  return 'Unexpected data type';
}
