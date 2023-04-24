import {
  DEBUG_ENABLED,
  DEBUG_PREFIX,
  DEBUG_PREFIX_STYLE,
  DEFAULT_CLIPPET_VOLUME,
  DEFAULT_MAX_VOLUME,
  DEFAULT_MIN_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_MUTED_VOLUME,
  DEFAULT_PROVIDER_VOLUME,
} from './constants';
import { Clippet, AudioPool, GetPooledClipOptions, ClippetProviderOptions, ClippetOptions } from './types';

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
 export function capValueWithinRange(value: number, minValue: number, maxValue: number) {

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
export function getPooledAudio(options: GetPooledClipOptions) {
  const { clippet, enablePooling } = options;
  const { url } = clippet;
  const isPooled = url in audioPool;

  // guard: check if we can get the pooled audio instance
  if (enablePooling && isPooled) {
    return audioPool[url];
  }

  const audio = new Audio(clippet.url);

  // pool the new instance if pooling is enabled
  if (enablePooling) {
    audioPool[url] = audio;
  }

  return audio;
}

/**
 * Helper to get the volume and whether it is muted of a specific clippet.
 */
export function getAudioVolumeTuple(providerOptions: Partial<ClippetProviderOptions>, clippetOptions?: Partial<ClippetOptions>) {
  const {
    isMuted: providerIsMuted,
    volume: providerVolume = DEFAULT_PROVIDER_VOLUME,
    minVolume = DEFAULT_MIN_VOLUME,
    maxVolume = DEFAULT_MAX_VOLUME,
    mutedVolume = DEFAULT_MUTED_VOLUME,
  } = providerOptions;
  const {
    isMuted: clipIsMuted = DEFAULT_MUTED,
    forceUnmute = false,
    volume: clipVolume = DEFAULT_CLIPPET_VOLUME,
  } = clippetOptions ?? {};
  const cappedProviderVolume = capValueWithinRange(providerVolume, minVolume, maxVolume);
  const cappedClipVolume = capValueWithinRange(clipVolume, minVolume, maxVolume);
  const cappedMutedVolume = capValueWithinRange(mutedVolume, minVolume, maxVolume);

  // Merge the provider options with the clip options. Behaviour for each option can be defined here.
  // For example some options require a multiplication operation and other options something else.
  const isMuted = (providerIsMuted || clipIsMuted) && !forceUnmute;
  const volume = isMuted ? cappedMutedVolume : (cappedProviderVolume * cappedClipVolume);

  return {
    isMuted,
    volume,
  };
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
