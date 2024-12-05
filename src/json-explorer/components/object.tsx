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

  const {
    spaceCharacters,
    calculatedPath,
    onPropertySelected
  } = useJsonProperty({ print, path, onPropertyClicked });

  return (
    <span>
      {spaceCharacters}
      {print.propertyName ? (
        <span
          className="property"
          onClick={onPropertySelected}
        >
          {`${print.propertyName}: `}
        </span>
      ) : ''}
      {`{\n`}
      {
        Object
          .getOwnPropertyNames((print.value))
          .map((property) => (
            <Property
              key={property}
              path={calculatedPath}
              print={{
                value: (print.value as JsonObject)[property],
                propertyName: property,
                spaces: print.spaces + 2
              }}
              onPropertyClicked={onPropertyClicked}
            />
          ))
      }
      {`${spaceCharacters}},\n`}
    </span>
  );
}
