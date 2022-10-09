import { DEBUG_ENABLED, DEBUG_PREFIX, DEBUG_PREFIX_STYLE } from "./constants";
import { Clippet } from "./types";

/**
 * Helper to cap a value to a certain range.
 *
 * @param value
 * @param minValue
 * @param maxValue
 * @returns
 */
 export function capValueWithinRange(value: number, minValue: number, maxValue: number): number {

  // guard: check if the minimum value is exceeded
  if (value < minValue) {
    return minValue;
  }

  // guard: check if the maximum value is exceeded
  if (value > maxValue) {
    return maxValue;
  }

  return value;
};

export function createAudioByClippet(clippet: Clippet): HTMLAudioElement {
  return new Audio(clippet.url);
}

export function debug(...messages: any[]) {

  // guard: skip when debug is not enabled
  if (!DEBUG_ENABLED) {
    return;
  }

  console.log(
    `%c ${DEBUG_PREFIX}`,
    DEBUG_PREFIX_STYLE,
    ...messages,
  );
}

export function debugClippet(clippet: Clippet, ...messages: any[]) {
  debug(`[CLIPPET ${clippet.name}]`, ...messages);
}
