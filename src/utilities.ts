import {
  DEBUG_ENABLED,
  DEBUG_PREFIX,
  DEBUG_PREFIX_STYLE,
} from './constants';
import { Clippet, AudioPool, GetPooledClipOptions } from './types';

const audioPool: AudioPool = {};

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

export function getPooledAudio(options: GetPooledClipOptions): HTMLAudioElement {
  const { clippet, enablePooling } = options;
  const { url } = clippet;
  const isPooled = url in audioPool;

  if (enablePooling && isPooled) {
    return audioPool[url];
  }

  const audio = new Audio(clippet.url);

  if (enablePooling) {
    audioPool[url] = audio;
  }

  return audio;
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
