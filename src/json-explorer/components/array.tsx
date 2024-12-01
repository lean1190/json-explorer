import { useCallback, useMemo } from "react";
import { getSpaceCharacters } from "../functions/print";
import { DisplayPropertyComponent, Print, Value } from "../types";
import Property from "./property";
import { getPathFromClickEvent } from "../functions/path";

interface Props extends DisplayPropertyComponent {
  print: (Print & { value: Value[] });
}

export default function ArrayProperty({
  print: { value, propertyName, spaces },
  path,
  onPropertyClicked
}: Props) : JSX.Element {

  const calculatedPath = useMemo(() => `${path}.${propertyName}`, [path, propertyName]);
  const calculateItemPath = useCallback((index: number) => `${calculatedPath}[${index}]`, [calculatedPath]);

  const createPropertyPath = useCallback((event: React.MouseEvent<HTMLElement>) => {
    onPropertyClicked(getPathFromClickEvent(event));
  }, [onPropertyClicked]);

  return (
    <span>
      {getSpaceCharacters(spaces)}
      {
        <>
          <span
            className="property"
            data-path={calculatedPath}
            onClick={createPropertyPath}
          >
            {propertyName}
          </span>
          {': [\n'}
        </>
      }
      {
        value.map((current, index) => {
          const itemPath = calculateItemPath(index);
          return <Property
            key={itemPath}
            print={{ value: current, spaces: spaces + 2 }}
            path={itemPath}
            onPropertyClicked={onPropertyClicked}
          />
        })
      }
      {'\n],\n'}
    </span>
  );
}
