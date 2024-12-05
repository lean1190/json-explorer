import { useMemo } from "react";
import { DisplayPropertyComponent, Print } from "../types";
import useJsonProperty from "./hooks/use-json-property";

interface Props extends DisplayPropertyComponent {
  print: Print;
}

export default function PrimitiveProperty({
  print,
  path,
  onPropertyClicked
}: Props): JSX.Element {

  const {
    spaceCharacters,
    onPropertySelected
  } = useJsonProperty({ print, path, onPropertyClicked });

  const isString = useMemo(() => typeof print.value === 'string', [print.value]);

  return (
    <span>
      {spaceCharacters}
      {(print.propertyName ? (
        <>
          <span
            className="property"
            onClick={onPropertySelected}
          >
            {print.propertyName}
          </span>
          :{' '}
        </>
      ) : '')}
      {(isString ? `'${print.value}'` : `${print.value}`)}
      {',\n'}
    </span>
  );
}
