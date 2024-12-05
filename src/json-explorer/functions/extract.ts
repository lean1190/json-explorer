import { JsonObject, Value } from '../types';

export function extractNestedValue(res: JsonObject, path: string): Value | undefined {
  if (!path || typeof path !== 'string') {
    return undefined;
  }

  try {
    // Remove "res." prefix and split the path into segments
    const pathSegments = path
      .replace(/^res\./, '')
      .split(/[.[\]]/)
      .filter(Boolean);

    // Traverse the res object based on the segments
    let value: JsonObject | Value = res;
    for (const segment of pathSegments) {
      const index = Number(segment);
      if (!isNaN(index)) {
        // Handle array indexing
        if (!Array.isArray(value) || index >= value.length) {
          return undefined;
        }
        value = value[index];
      } else {
        // Handle object properties
        if (!value || typeof value !== 'object' || !(segment in value)) {
          return undefined;
        }
        value = (value as JsonObject)[segment];
      }
    }

    // Return undefined if the resolved value is an array, object, or null
    if (value === null) {
      return null;
    }

    if (typeof value === 'object') {
      return undefined;
    }

    return value;
  } catch {
    return undefined;
  }
}
