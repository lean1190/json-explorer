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
    calculatedPath,
    calculateItemPath,
    onPropertySelected
  } = useJsonProperty({ print, path, onPropertyClicked });

  return (
    <span>
      {spaceCharacters}
      {
        <>
          <span
            className="property"
            data-path={calculatedPath}
            onClick={onPropertySelected}
          >
            {print.propertyName}
          </span>
          {': [\n'}
        </>
      }
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
      {'\n],\n'}
    </span>
  );
}
