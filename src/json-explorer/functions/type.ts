import { Value } from "../types";

export const isPrimitiveValue = <T>(value: T): boolean => {
  return typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string' || value === null;
}

export const isArray = <T extends Value>(value: T): boolean => {
  return Array.isArray(value);
}

export const isObject = <T>(value: T): boolean => {
  return typeof value === 'object';
}
