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
  onPropertyClicked
}: Props): JSX.Element {
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return <PrimitiveProperty onPropertyClicked={onPropertyClicked} print={{ value, propertyName, spaces }} />;
  }

  if (Array.isArray(value)) {
    return <ArrayProperty onPropertyClicked={onPropertyClicked} print={{ value, propertyName, spaces }} />;
  }

  if (typeof value === 'object') {
    return <ObjectProperty onPropertyClicked={onPropertyClicked} print={{
      value: value as JsonObject,
      propertyName,
      spaces
    }} />;
  }

  return <span>Unexpected data type</span>;
}
