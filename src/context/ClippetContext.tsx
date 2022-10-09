import { createContext } from 'react';

import {
  DEFAULT_MAX_VOLUME,
  DEFAULT_MIN_VOLUME,
  DEFAULT_MUTED,
  DEFAULT_MUTED_VOLUME,
  DEFAULT_PITCH,
  DEFAULT_PROVIDER_VOLUME,
} from '../constants';
import { ClippetContextValue } from '../types';

/*
  A react context to store global variables for all clippet hooks
*/
const ClippetContext = createContext<ClippetContextValue>({
  isMuted: DEFAULT_MUTED,

  volume: DEFAULT_PROVIDER_VOLUME,
  minVolume: DEFAULT_MIN_VOLUME,
  maxVolume: DEFAULT_MAX_VOLUME,
  mutedVolume: DEFAULT_MUTED_VOLUME,

  pitch: DEFAULT_PITCH,
});

export default ClippetContext;
