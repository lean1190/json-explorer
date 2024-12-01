import { getSpaceCharacters } from "../functions/print";
import { Print, Value } from "../types";
import Property from "./property";

interface Props {
  print: (Print & { value: Value[] });
}

export default function ArrayProperty({ print: { value, propertyName, spaces } }: Props) : JSX.Element {
  return (
    <span>
      {
        `${getSpaceCharacters(spaces)}${propertyName}: [\n`
      }
      {
        value.map((current, index) => (
          <Property key={index} print={{ value: current, spaces: spaces + 2 }} />
        ))
      }
      {'\n],\n'}
    </span>
  );
}
