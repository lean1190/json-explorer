import { DisplayPropertyComponent, Print } from "../types";
import { JsonObject } from "../types";
import Property from "./property";
import useJsonProperty from "./hooks/use-json-property";

interface Props extends DisplayPropertyComponent {
  print: (Print & { value: JsonObject });
}

export default function ObjectProperty({
  print,
  path,
  onPropertyClicked
}: Props): JSX.Element {

  const { spaceCharacters } = useJsonProperty({ print, path, onPropertyClicked });

  return (
    <span>
      {
        spaceCharacters +
        (print.propertyName ? `${print.propertyName}: ` : '') +
        (`{\n`)
      }
      {
        Object
          .getOwnPropertyNames((print.value))
          .map((property) => (
            <Property
              key={property}
              path={path}
              print={{
                value: (print.value as JsonObject)[property],
                propertyName: property,
                spaces: print.spaces + 2
              }}
              onPropertyClicked={onPropertyClicked}
            />
          ))
      }
      {`${spaceCharacters}},`}
    </span>
  );
}
