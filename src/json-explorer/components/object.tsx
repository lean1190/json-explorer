import { getSpaceCharacters } from "../functions/print";
import { Print } from "../types";
import { JsonObject } from "../types";
import { useMemo } from "react";
import Property from "./property";

interface Props {
  print: (Print & { value: JsonObject });
}

export default function ObjectProperty({ print: { value, propertyName, spaces } }: Props): JSX.Element {
  const spaceCharacters = useMemo(() => getSpaceCharacters(spaces), [spaces]);

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
            <Property key={property} print={{
              value: (value as JsonObject)[property],
              propertyName: property,
              spaces: spaces + 2
            }} />
          ))
      }
      {`${spaceCharacters}},`}
    </span>
  );
}
