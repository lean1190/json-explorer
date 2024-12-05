import { isArray, isObject, isPrimitiveValue } from "../functions/type";
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
  if (isPrimitiveValue(value)) {
    return <PrimitiveProperty
      print={{ value, propertyName, spaces }}
      path={path}
      onPropertyClicked={onPropertyClicked}
    />;
  }

  if (isArray(value)) {
    return <ArrayProperty
      print={{
        value: value as [],
        propertyName,
        spaces
      }}
      path={path}
      onPropertyClicked={onPropertyClicked}
    />;
  }

  if (isObject(value)) {
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
