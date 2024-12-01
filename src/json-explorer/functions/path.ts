export const getPathFromClickEvent = (event: React.MouseEvent): string => {
  return (event.target as HTMLElement).dataset.path ?? '';
};
