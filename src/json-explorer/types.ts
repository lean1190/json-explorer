export type Value = boolean | number | string | object | [];
export type JsonObject = Record<string, Value>;

export interface Print {
  value: Value,
  propertyName: string,
  spaces: number
}
