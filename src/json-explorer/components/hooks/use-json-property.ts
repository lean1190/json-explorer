import { useMemo, useCallback } from "react";
import { getPathFromClickEvent } from "../../functions/path";
import { DisplayPropertyComponent } from "../../types";
import { getSpaceCharacters } from "../../functions/print";

export default function useJsonProperty({
  print,
  path,
  onPropertyClicked
}: DisplayPropertyComponent) {

  const spaceCharacters = useMemo(() => getSpaceCharacters(print.spaces ?? 0), [print.spaces]);
  const calculatedPath = useMemo(() => `${path}.${print.propertyName}`, [path, print.propertyName]);
  const calculateItemPath = useCallback((index: number) => `${calculatedPath}[${index}]`, [calculatedPath]);

  const onPropertySelected = useCallback((event: React.MouseEvent<HTMLElement>) => {
    onPropertyClicked(getPathFromClickEvent(event));
  }, [onPropertyClicked]);

  return {
    spaceCharacters,
    calculatedPath,
    calculateItemPath,
    onPropertySelected
  }
}
