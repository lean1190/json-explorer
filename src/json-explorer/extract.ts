import { JsonObject, Value } from './types';

export function extractNestedValue(res: JsonObject, path: string): Value | undefined {
  if (!path || typeof path !== 'string') {
    return undefined;
  }

  try {
    // Remove "res." prefix and split the path into segments
    const pathSegments = path.replace(/^res\./, '').split(/[.[\]]/).filter(Boolean);

    // Traverse the res object based on the segments
    let current: JsonObject | Value = res;
    for (const segment of pathSegments) {
      // Check if the segment is a number (for array indices)
      const index = Number(segment);
      if (!isNaN(index)) {
        // Handle array indexing
        if (!Array.isArray(current) || index >= current.length) {
          return undefined;
        }
        current = current[index];
      } else {
        // Handle object properties
        if (!current || typeof current !== 'object' || !(segment in current)) {
          return undefined;
        }
        current = (current as JsonObject)[segment];
      }
    }

    return current;
  } catch {
    return undefined;
  }
}
