import { JsonObject, Print } from "../types";
import ArrayProperty from "./array";
import ObjectProperty from "./object";
import PrimitiveProperty from "./primitive";

interface Props {
  print: (Partial<Print> & Pick<Print, 'value'>);
}

export default function Property({
  print: {
    value,
    propertyName = '',
    spaces = 0
  } }: Props): JSX.Element {
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return <PrimitiveProperty print={{ value, propertyName, spaces }} />;
  }

  if (Array.isArray(value)) {
    return <ArrayProperty print={{ value, propertyName, spaces }} />;
  }

  if (typeof value === 'object') {
    return <ObjectProperty print={{
      value: value as JsonObject,
      propertyName,
      spaces
    }} />;
  }

  return <span>Unexpected data type</span>;
}
