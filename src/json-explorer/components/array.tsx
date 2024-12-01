import { useCallback } from "react";
import { getSpaceCharacters } from "../functions/print";
import { DisplayPropertyComponent, Print, Value } from "../types";
import Property from "./property";

interface Props extends DisplayPropertyComponent {
  print: (Print & { value: Value[] });
}

export default function ArrayProperty({
  print: { value, propertyName, spaces },
  onPropertyClicked
}: Props) : JSX.Element {
  const createPropertyPath = useCallback((event: React.MouseEvent<HTMLElement>) => {
    onPropertyClicked('');
  }, [onPropertyClicked]);

  return (
    <span>
      {getSpaceCharacters(spaces)}
      {
        <>
          <span
            className="property"
            onClick={createPropertyPath}
          >
            {propertyName}
          </span>
          {': [\n'}
        </>
      }
      {
        value.map((current, index) => (
          <Property onPropertyClicked={onPropertyClicked} key={index} print={{ value: current, spaces: spaces + 2 }} />
        ))
      }
      {'\n],\n'}
    </span>
  );
}
