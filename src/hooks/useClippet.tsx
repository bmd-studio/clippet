import { useState, useEffect } from 'react';

import {
  DEFAULT_CLIPPET_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_PITCH,
} from '../constants';
import { Clippet, UseClippet, UseClippetAdvancedOptions } from '../types';
import { capValueWithinRange, getAudioByClippet, debugClippet } from '../utilities';

import useClippetProvider from './useClippetProvider';

export default function useClippet(clippet: Clippet, options?: Partial<UseClippetAdvancedOptions>): UseClippet {
  const {
    isMuted: providerIsMuted,
    volume: providerVolume,
    minVolume,
    maxVolume,
    mutedVolume,
    pitch: providerPitch,
  } = useClippetProvider();
  const {
    isMuted: clipIsMuted = DEFAULT_MUTED,
    volume: clipVolume = DEFAULT_CLIPPET_VOLUME,
    pitch: clipPitch = DEFAULT_PITCH,
  } = options ?? {};
  const [clip, setClip] = useState(createAudioByClippet(clippet));
  const cappedProviderVolume = capValueWithinRange(providerVolume, minVolume, maxVolume);
  const cappedClipVolume = capValueWithinRange(clipVolume, minVolume, maxVolume);
  const cappedMutedVolume = capValueWithinRange(mutedVolume, minVolume, maxVolume);

  // Merge the provider options with the clip options. Behaviour for each option can be defined here.
  // For example some options require a multiplication operation and other options something else.
  const isMuted = providerIsMuted || clipIsMuted
  const volume = isMuted ? cappedMutedVolume : (cappedProviderVolume * cappedClipVolume);
  const pitch = providerPitch * clipPitch;

  const play = () => {
    const playIcon = isMuted ? '🔇' : '🔊';
    debugClippet(clippet, `${playIcon} Executing play with volume: `, volume);

    reset();
    clip.volume = volume;
    clip.play();
  };
  const stop = () => {
    debugClippet(clippet, '🛑 Executing stop');
    clip.pause();
    reset();
  }
  const reset = () => {
    debugClippet(clippet, '🕛 Executing reset');
    clip.currentTime = 0;
  };

  // load the audio clip when the audio file changes
  useEffect(() => {
    debugClippet(clippet, '🎛 Handle clippet change');
    setClip(getAudioByClippet(clippet));
  }, [clippet]);

  // handle clip changes
  useEffect(() => {
    debugClippet(clippet, '🎛 Handle clip change');
    reset();
  }, [clip]);

  return [
    play,
    {
      stop,
    },
  ];
}
