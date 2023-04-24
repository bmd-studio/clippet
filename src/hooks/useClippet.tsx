import { useState, useEffect, useCallback, useMemo } from 'react';

import { Clippet, UseClippet, ClippetOptions } from '../types';
import { getPooledAudio, debugClippet, getAudioVolumeTuple, playAudio, resetAudio, pauseAudio } from '../utilities';

import { useClippetProvider } from './useClippetProvider';

/**
 * Hook to load a Clippet and play it on request.
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

  const play = useCallback(() => {
    const playIcon = isMuted ? '🔇' : '🔊';
    debugClippet(clippet, `${playIcon} Executing play with volume: `, volume);
    resetAudio(audio);
    playAudio(audio, volume);
  }, [isMuted, volume, audio]);
  const stop = useCallback(() => {
    debugClippet(clippet, '🛑 Executing stop');
    pauseAudio(audio);
    resetAudio(audio);
  }, [audio]);

  // load the audio clip when the audio file changes
  useEffect(() => {
    debugClippet(clippet, '🎛 Handling clippet change...');
    setAudio(getPooledAudio(pooledAudioOptions));
  }, [clippet, setAudio, pooledAudioOptions]);

  // handle clip changes
  useEffect(() => {
    debugClippet(clippet, '🎛 Handling audio clip change...');
    resetAudio(audio);
  }, [audio]);

  return [
    play,
    {
      stop,
    },
  ];
}
