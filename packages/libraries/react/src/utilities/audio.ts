import {
  DEFAULT_CLIPPET_VOLUME,
  DEFAULT_MAX_VOLUME,
  DEFAULT_MIN_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_MUTED_VOLUME,
  DEFAULT_PROVIDER_VOLUME,
} from '../constants';
import { AudioPool, GetPooledClipOptions, ClippetProviderOptions, ClippetOptions, ClippetAudio } from '../types';

import { capValueWithinRange } from './validation';

/**
 * Object to pool the audio instances in.
 */
const audioPool: AudioPool = {};

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
 * Helper to reset the audio instance to the start.
 * This is useful when the audio instance is reused.
 *
 * @param audio The audio instance that should be reset.
 */
export function resetAudio(audio: ClippetAudio) {
  if (!audio) {
    return;
  }

  audio.currentTime = 0;
}

/**
 * Helper to set the volume of a specific audio instance.
 *
 * @param audio The audio instance that should be set.
 * @param volume The volume that it should be set to.
 */
export function setAudioVolume(audio: ClippetAudio, volume: number) {
  if (!audio) {
    return;
  }

  audio.volume = volume;
}

/**
 * Helper to play a specific audio instance.
 *
 * @param audio The audio instance that should be played.
 * @param volume The volume that it should be played with.
 */
export function playAudio(audio: ClippetAudio, volume: number) {
  setAudioVolume(audio, volume);
  audio?.play();
}

/**
 * Helper to pause a specific audio instance.
 *
 * @param audio The audio instance that should be paused.
 */
export function pauseAudio(audio: ClippetAudio) {
  audio?.pause();
}

/**
 * Helper to stop a specific audio instance.
 *
 * @param audio The audio instance that should be stopped.
 */
export function stopAudio(audio: ClippetAudio) {
  pauseAudio(audio);
  resetAudio(audio);
}

/**
 * Helper to get the volume and whether it is muted of a specific clippet.
 */
export function getAudioVolumeTuple(providerOptions: ClippetProviderOptions, clippetOptions?: ClippetOptions) {
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

