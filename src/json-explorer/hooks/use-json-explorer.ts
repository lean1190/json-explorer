import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function useJsonExplorer() {
  const paths = useSelector((state: RootState) => state.paths);
  const [typedPropertyAccessor, setTypedPropertyAccessor] = useState<string>('');

  const accessedPropertyValue = useMemo(() => {
    const value = paths[typedPropertyAccessor];

    if (value === null) {
      return 'null';
    }

    return value?.toString() ?? 'undefined';
  }, [paths, typedPropertyAccessor]);

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
