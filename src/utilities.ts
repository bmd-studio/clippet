import {
  DEBUG_ENABLED,
  DEBUG_PREFIX,
  DEBUG_PREFIX_STYLE,
} from './constants';
import { Clippet, AudioPool, GetPooledClipOptions } from './types';

/**
 * Object to pool the audio instances in.
 */
const audioPool: AudioPool = {};

/**
 * Helper to cap a value to be between a specific range.
 *
 * @param value The value that should fall between a specific range.
 * @param minValue The minimum value allowed.
 * @param maxValue The maximum value allowed.
 * @returns The new value between `minValue` and `maxValue`.
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

/**
 * Helper to get HTML5 `Audio` instances for a specific Clippet.
 *
 * @param options The options to identify the clippet and other advanced options
 * @returns
 */
export function getPooledAudio(options: GetPooledClipOptions): HTMLAudioElement {
  const { clippet, enablePooling } = options;
  const { url } = clippet;
  const isPooled = url in audioPool;

  // guard: check if we can get the pooled audio instance
  if (enablePooling && isPooled) {
    return audioPool[url];
  }

  // TODO: add react native support
  const audio = new Audio(clippet.url);

  // pool the new instance if pooling is enabled
  if (enablePooling) {
    audioPool[url] = audio;
  }

  return audio;
}

/**
 * Helper to debug the library that checks whether the debugging flag is enabled.
 *
 * @param messages The messages that should be debugged.
 * @returns void
 */
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

/**
 * Helper to have a shortcut to debug for specific Clippet instances.
 * This will automatically include information to identity the Clippet instance
 * as a prefix in the debug message.
 *
 * @param clippet The Clippet instance to debug  for.
 * @param messages The messages that should be debugged.
 */
export function debugClippet(clippet: Clippet, ...messages: any[]) {
  debug(`[CLIPPET ${clippet.name}]`, ...messages);
}
