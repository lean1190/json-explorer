import { DisplayPropertyComponent, Print, Value } from "../types";
import Property from "./property";
import useJsonProperty from "./hooks/use-json-property";

interface Props extends DisplayPropertyComponent {
  print: (Print & { value: Value[] });
}

export default function ArrayProperty({
  print,
  path,
  onPropertyClicked
}: Props) : JSX.Element {

  const {
    spaceCharacters,
    calculateItemPath,
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
      {`[\n`}
      {
        print.value.map((current, index) => {
          const itemPath = calculateItemPath(index);
          return <Property
            key={itemPath}
            print={{ value: current, spaces: print.spaces + 2 }}
            path={itemPath}
            onPropertyClicked={onPropertyClicked}
          />
        })
      }
      {`${spaceCharacters}],\n`}
    </span>
  );
}
