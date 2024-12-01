import { getSpaceCharacters } from "../functions/print";
import { DisplayPropertyComponent, Print } from "../types";
import { JsonObject } from "../types";
import { useMemo } from "react";
import Property from "./property";

interface Props extends DisplayPropertyComponent {
  print: (Print & { value: JsonObject });
}

export default function ObjectProperty({
  print: { value, propertyName, spaces },
  path,
  onPropertyClicked
}: Props): JSX.Element {
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
            <Property
              key={property}
              path={path}
              print={{
                value: (value as JsonObject)[property],
                propertyName: property,
                spaces: spaces + 2
              }}
              onPropertyClicked={onPropertyClicked}
            />
          ))
      }
      {`${spaceCharacters}},`}
    </span>
  );
}
