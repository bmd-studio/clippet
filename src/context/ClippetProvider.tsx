import { ReactNode, useState } from 'react';

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

/**
 * Provider properties to set global options affecting all Clippet instances.
 */
export interface ClippetProviderProps {
  children?: ReactNode | ReactNode[] | null;
  options?: Partial<ClippetProviderOptions>;
}

/**
 * Provider to easily adjust the behaviour and settings of all Clippet instances that are
 * children of this provider. The provider is usually placed somewhere near the root of the DOM tree.
 *
 * Please note that each provider has an individual instance of the React Context, making it easy
 * to create multiple groups of configurations if such an advanced setup is required.
 *
 * @param props properties to configure the global options.
 * @returns ClippetProvider
 */
export function ClippetProvider(props: ClippetProviderProps) {
  const { children, options } = props;
  const {
    isMuted = DEFAULT_MUTED,

    volume = DEFAULT_PROVIDER_VOLUME,
    minVolume = DEFAULT_MIN_VOLUME,
    maxVolume = DEFAULT_MAX_VOLUME,
    mutedVolume = DEFAULT_MUTED_VOLUME,

    // pitch = DEFAULT_PITCH,
  } = options ?? {};

  return(
    <ClippetContext.Provider value={{
      isMuted,

      volume,
      minVolume,
      maxVolume,
      mutedVolume,

      // pitch,

      windowEventListeners: [],
    }}>
      {children}
    </ClippetContext.Provider>
  );
}
