import { useState, useEffect, useCallback, useMemo } from 'react';

import {
  DEFAULT_CLIPPET_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_PITCH,
} from '../constants';
import { Clippet, UseClippet, ClippetOptions } from '../types';
import { capValueWithinRange, getPooledAudio, debugClippet } from '../utilities';

import { useClippetProvider } from './useClippetProvider';

/**
 * Hook to load a Clippet and play it on demand.
 *
 * By default the same sound is re-used across hooks with pooling for performance reasons.
 * This does mean it can only be played one at a time.
 *
 * @param clippet The Clippet you would like to trigger using this hook.
 * @param options Advanced options to customize the behaviour of this single hook.
 * @returns Tuple to play and have access to the advanced API to for example stop the sound on request.
 */
export function useClippet(clippet: Clippet, options?: Partial<ClippetOptions>): UseClippet {
  const {
    isMuted: providerIsMuted,
    volume: providerVolume,
    minVolume,
    maxVolume,
    mutedVolume,
    // pitch: providerPitch,
  } = useClippetProvider();
  const {
    isMuted: clipIsMuted = DEFAULT_MUTED,
    forceUnmute = false,
    volume: clipVolume = DEFAULT_CLIPPET_VOLUME,
    // pitch: clipPitch = DEFAULT_PITCH,
    enablePooling = true,
  } = options ?? {};
  const pooledAudioOptions = useMemo(() => {
    return {
      clippet,
      enablePooling,
    };
  }, [clippet, enablePooling]);
  const [audio, setAudio] = useState(getPooledAudio(pooledAudioOptions));
  const cappedProviderVolume = capValueWithinRange(providerVolume, minVolume, maxVolume);
  const cappedClipVolume = capValueWithinRange(clipVolume, minVolume, maxVolume);
  const cappedMutedVolume = capValueWithinRange(mutedVolume, minVolume, maxVolume);

  // Merge the provider options with the clip options. Behaviour for each option can be defined here.
  // For example some options require a multiplication operation and other options something else.
  const isMuted = (providerIsMuted || clipIsMuted) && !forceUnmute;
  const volume = isMuted ? cappedMutedVolume : (cappedProviderVolume * cappedClipVolume);

  // TODO: implement pich using the Web Audio API (HTML5 is not possible?)
  // const pitch = providerPitch * clipPitch;

  const reset = useCallback(() => {
    debugClippet(clippet, '🕛 Executing reset');
    audio.currentTime = 0;
  }, [audio]);
  const play = useCallback(() => {
    const playIcon = isMuted ? '🔇' : '🔊';
    debugClippet(clippet, `${playIcon} Executing play with volume: `, volume);

    reset();
    audio.volume = volume;
    audio.play();
  }, [isMuted, volume, audio, reset]);
  const stop = useCallback(() => {
    debugClippet(clippet, '🛑 Executing stop');
    audio.pause();
    reset();
  }, [audio, reset]);

  // load the audio clip when the audio file changes
  useEffect(() => {
    debugClippet(clippet, '🎛 Handle clippet change');
    setAudio(getPooledAudio(pooledAudioOptions));
  }, [clippet, setAudio, pooledAudioOptions]);

  // handle clip changes
  useEffect(() => {
    debugClippet(clippet, '🎛 Handle clip change');
    reset();
  }, [audio, reset]);

  return [
    play,
    {
      stop,
    },
  ];
}
