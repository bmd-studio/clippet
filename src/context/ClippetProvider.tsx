import { ReactNode, useMemo } from 'react';

import {
  DEFAULT_MAX_VOLUME,
  DEFAULT_MIN_VOLUME,
  DEFAULT_MUTED_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_PITCH,
  DEFAULT_PROVIDER_VOLUME,
} from '../constants';
import { ClippetProviderOptions } from '../types';

import ClippetContext from './ClippetContext';

export interface ClippetProviderProps {
  children?: ReactNode | ReactNode[] | null;
  options?: Partial<ClippetProviderOptions>;
}

export default function ClippetProvider(props: ClippetProviderProps) {
  const { children, options } = props;
  const {
    isMuted = DEFAULT_MUTED,

    volume = DEFAULT_PROVIDER_VOLUME,
    minVolume = DEFAULT_MIN_VOLUME,
    maxVolume = DEFAULT_MAX_VOLUME,
    mutedVolume = DEFAULT_MUTED_VOLUME,

    pitch = DEFAULT_PITCH,
  } = options ?? {};

  return(
    <ClippetContext.Provider value={{
      isMuted,

      volume,
      minVolume,
      maxVolume,
      mutedVolume,

      pitch,
    }}>
      {children}
    </ClippetContext.Provider>
  );
}
