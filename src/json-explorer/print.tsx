import { Fragment } from "react/jsx-runtime";
import { Print, Value, JsonObject } from "./types";

export const getSpaceCharacters = (spaces: number): string => Array.from<string>({ length: spaces }).reduce((acc) => `${acc} `, '');

export const printPrimitiveProperty = ({ value, propertyName, spaces }: Print): JSX.Element => {
  const isString = typeof value === 'string';

  return (
    <span>
      {
        getSpaceCharacters(spaces) +
        (propertyName ? `${propertyName}: ` : '') +
        (isString ? `'${value.toString()}'` : value.toString()) +
        ',\n'
      }
    </span>
  );
}

export const printArrayProperty = ({
  value,
  propertyName,
  spaces
}: (Print & { value: Value[] })): JSX.Element => {
  return (
    <span>
      {
        `${getSpaceCharacters(spaces)}${propertyName}: [\n`
      }
      {
        value.map((current, index) => (
          <Fragment key={index}>
            {
              printProperty({
                value: current,
                spaces: spaces + 2
              })
            }
          </Fragment>
        ))
      }
      {'\n],\n'}
    </span>
  );
}

export const printObjectProperty = ({
  value,
  propertyName,
  spaces
}: (Print & { value: JsonObject })): JSX.Element => {
  const spaceCharacters = getSpaceCharacters(spaces);
  return (
    <span>
      {
        spaceCharacters +
        (propertyName ? `${propertyName}: ` : '') +
        (`{\n`)
      }
      {
        Object
          .getOwnPropertyNames((value))
          .map((property) => (
            <Fragment key={property}>{
              printProperty({
                value: (value as JsonObject)[property],
                propertyName: property,
                spaces: spaces + 2
              })
            }</Fragment>)
          )
      }
      {`${spaceCharacters}},`}
    </span>
  );
}

export const printProperty = ({
  value,
  propertyName = '',
  spaces = 0
}: (Partial<Print> & Pick<Print, 'value'>)): JSX.Element => {
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

  return <span>Unexpected data type</span>;
}
