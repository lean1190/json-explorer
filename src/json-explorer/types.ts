export type Value = boolean | number | string | object | [] | null;
export type JsonObject = Record<string, Value>;

export interface DisplayPropertyComponent {
  print: Partial<Print>;
  path: string;
  onPropertyClicked: (path: string) => void;
}

export interface Print {
  value: Value,
  propertyName: string,
  spaces: number
}
