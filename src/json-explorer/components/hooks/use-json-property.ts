import { useMemo, useCallback } from "react";
import { DisplayPropertyComponent } from "../../types";
import { getSpaceCharacters } from "../../functions/print";

export default function useJsonProperty({
  print,
  path,
  onPropertyClicked
}: DisplayPropertyComponent) {

  const spaceCharacters = useMemo(() => getSpaceCharacters(print.spaces ?? 0), [print.spaces]);
  const calculatedPath = useMemo(() => `${path}${print.propertyName ? `.${print.propertyName}` : ''}`, [path, print.propertyName]);
  const calculateItemPath = useCallback((index: number) => `${calculatedPath}[${index}]`, [calculatedPath]);

  const onPropertySelected = useCallback(() => onPropertyClicked(calculatedPath), [calculatedPath, onPropertyClicked]);

  return {
    spaceCharacters,
    calculatedPath,
    calculateItemPath,
    onPropertySelected
  }
}
