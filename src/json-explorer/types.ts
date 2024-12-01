export type Value = boolean | number | string | object | [];
export type JsonObject = Record<string, Value>;

export interface DisplayPropertyComponent {
  print: Partial<Print>;
  onPropertyClicked: (path: string) => void;
}

export interface Print {
  value: Value,
  propertyName: string,
  spaces: number
}
