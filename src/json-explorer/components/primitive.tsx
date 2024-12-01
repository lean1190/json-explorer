import { useCallback, useMemo } from "react";
import { getSpaceCharacters } from "../functions/print";
import { DisplayPropertyComponent, Print } from "../types";
import { getPathFromClickEvent } from "../functions/path";

interface Props extends DisplayPropertyComponent {
  print: Print;
}

export default function PrimitiveProperty({
  print: { value, propertyName, spaces },
  path,
  onPropertyClicked
}: Props): JSX.Element {
  const calculatedPath = useMemo(() => `${path}.${propertyName}`, [path, propertyName]);
  const isString = useMemo(() => typeof value === 'string', [value]);

  const createPropertyPath = useCallback((event: React.MouseEvent<HTMLElement>) => {
    onPropertyClicked(getPathFromClickEvent(event));
  }, [onPropertyClicked]);

  return (
    <span>
      {getSpaceCharacters(spaces)}
      {(propertyName ? (
        <>
          <span
            className="property"
            data-path={calculatedPath}
            onClick={createPropertyPath}
          >
            {propertyName}
          </span>
          :{' '}
        </>
      ) : '')}
      {(isString ? `'${value.toString()}'` : value.toString())}
      {',\n'}
    </span>
  );
}
