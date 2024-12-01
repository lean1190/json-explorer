import { DisplayPropertyComponent, JsonObject, Print } from "../types";
import ArrayProperty from "./array";
import ObjectProperty from "./object";
import PrimitiveProperty from "./primitive";

interface Props extends DisplayPropertyComponent {
  print: (Partial<Print> & Pick<Print, 'value'>);
}

export default function Property({
  print: {
    value,
    propertyName = '',
    spaces = 0
  },
  path,
  onPropertyClicked
}: Props): JSX.Element {
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return <PrimitiveProperty
      print={{ value, propertyName, spaces }}
      path={path}
      onPropertyClicked={onPropertyClicked}
    />;
  }

  if (Array.isArray(value)) {
    return <ArrayProperty
      print={{ value, propertyName, spaces }}
      path={path}
      onPropertyClicked={onPropertyClicked}
    />;
  }

  if (typeof value === 'object') {
    return <ObjectProperty
      print={{
        value: value as JsonObject,
        propertyName,
        spaces
      }}
      path={path}
      onPropertyClicked={onPropertyClicked}
    />;
  }

  return <span>Unexpected data type</span>;
}
