import { useCallback, useMemo } from "react";
import { getSpaceCharacters } from "../functions/print";
import { DisplayPropertyComponent, Print } from "../types";

interface Props extends DisplayPropertyComponent {
  print: Print;
}

export default function PrimitiveProperty({
  print: { value, propertyName, spaces },
  onPropertyClicked
}: Props): JSX.Element {
  const isString = useMemo(() => typeof value === 'string', [value]);
  const createPropertyPath = useCallback((event: React.MouseEvent<HTMLElement>) => {
    onPropertyClicked('');
  }, [onPropertyClicked]);

  return (
    <span>
      {getSpaceCharacters(spaces)}
      {(propertyName ? (
        <>
          <span
            className="property"
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
