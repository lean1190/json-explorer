import { useState, useMemo, useCallback } from "react";
import { extractNestedValue } from "../functions/extract";
import { JsonObject } from "../types";

export default function useJsonExplorer<T extends JsonObject>(jsonObject: T) {
  const [typedPropertyAccessor, setTypedPropertyAccessor] = useState<string>('');

  const accessedPropertyValue = useMemo(() => {
    return extractNestedValue(jsonObject, typedPropertyAccessor)?.toString() ?? 'undefined';
  }, [jsonObject, typedPropertyAccessor]);

  const onPropertyClicked = useCallback((propertyPath: string) => {
    setTypedPropertyAccessor(() => propertyPath);
  }, []);

  return {
    typedPropertyAccessor,
    accessedPropertyValue,
    setTypedPropertyAccessor,
    onPropertyClicked
  };
}
