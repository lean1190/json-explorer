import { useMemo } from "react";
import { getSpaceCharacters } from "../functions/print";
import { Print } from "../types";

interface Props {
  print: Print;
}

export default function PrimitiveProperty({ print: { value, propertyName, spaces } }: Props): JSX.Element {
  const isString = useMemo(() => typeof value === 'string', [value]);

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
