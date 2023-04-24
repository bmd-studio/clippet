import { useState, useEffect, useCallback, useMemo } from 'react';

import { Clippet, UseClippet, ClippetOptions } from '../types';
import { getPooledAudio, debugClippet, getAudioVolumeTuple } from '../utilities';

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
  const providerOptions = useClippetProvider();
  const {
    enablePooling = true,
  } = options ?? {};
  const pooledAudioOptions = useMemo(() => {
    return {
      clippet,
      enablePooling,
    };
  }, [clippet, enablePooling]);

  // initially the audio element should be `null` to support server-sided rendering!
  // when initializing the Audio element directly here SSR would not work because,
  // this element is not available. Recommended pattern is to use `useEffect` to initialize it.
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { isMuted, volume } = getAudioVolumeTuple(providerOptions, options);

  const reset = useCallback(() => {
    if (!audio) {
      debugClippet(clippet, 'Could not reset due to invalid audio');
      return;
    }

    debugClippet(clippet, '🕛 Executing reset');
    audio.currentTime = 0;
  }, [audio]);
  const play = useCallback(() => {
    if (!audio) {
      debugClippet(clippet, 'Could not play due to invalid audio');
      return;
    }

    const playIcon = isMuted ? '🔇' : '🔊';
    debugClippet(clippet, `${playIcon} Executing play with volume: `, volume);

    reset();
    audio.volume = volume;
    audio.play();
  }, [isMuted, volume, audio, reset]);
  const stop = useCallback(() => {
    if (!audio) {
      debugClippet(clippet, 'Could not stop play to invalid audio');
      return;
    }

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
