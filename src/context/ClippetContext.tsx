import { createContext } from 'react';

import {
  DEFAULT_MAX_VOLUME,
  DEFAULT_MIN_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_MUTED_VOLUME,
  DEFAULT_PITCH,
  DEFAULT_PROVIDER_VOLUME,
} from '../constants';
import { ClippetContextOptions } from '../types';

/**
 * Factory for the context instance to store the global configuration for all Clippet instances.
 *
 * @return Context
 */
export function createClippetContext() {
  return createContext<ClippetContextOptions>({
    isMuted: DEFAULT_MUTED,

    volume: DEFAULT_PROVIDER_VOLUME,
    minVolume: DEFAULT_MIN_VOLUME,
    maxVolume: DEFAULT_MAX_VOLUME,
    mutedVolume: DEFAULT_MUTED_VOLUME,

    pitch: DEFAULT_PITCH,

    globalEvents: [],
  });
}

/**
 * The default clippet context instance.
 */
const ClippetContext = createClippetContext();

export default ClippetContext;
