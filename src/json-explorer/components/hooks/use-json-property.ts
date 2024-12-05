import { useMemo, useCallback, useEffect } from "react";
import { DisplayPropertyComponent } from "../../types";
import { getSpaceCharacters } from "../../functions/print";
import { useDispatch } from "react-redux";
import { subscribe, unsubscribe } from "../../store/path-slice";

export default function useJsonProperty({
  print,
  path,
  onPropertyClicked
}: DisplayPropertyComponent) {

  const dispatch = useDispatch();

  const spaceCharacters = useMemo(() => getSpaceCharacters(print.spaces ?? 0), [print.spaces]);
  const calculatedPath = useMemo(() => `${path}${print.propertyName ? `.${print.propertyName}` : ''}`, [path, print.propertyName]);
  const calculateItemPath = useCallback((index: number) => `${calculatedPath}[${index}]`, [calculatedPath]);

  const onPropertySelected = useCallback(() => onPropertyClicked(calculatedPath), [calculatedPath, onPropertyClicked]);

  useEffect(() => {
    const payload = { path: calculatedPath, value: print.value };
    dispatch(subscribe(payload));

    return () => {
      dispatch(unsubscribe(payload));
    };
  }, [calculatedPath, dispatch, print.value]);

  return {
    spaceCharacters,
    calculatedPath,
    calculateItemPath,
    onPropertySelected
  }
}
