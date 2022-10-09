
/**
 * Clippet context options
 */
export interface ClippetContextValue {
  isMuted: boolean;

  volume: number;
  minVolume: number;
  maxVolume: number;
  mutedVolume: number;

  pitch: number;
}

export type ClippetProviderOptions = ClippetContextValue;

export interface UseClippetAdvancedOptions {
  isMuted: boolean;

  volume: number;

  pitch: number;
}

/**
 * useClippet hook signature return value
 */
export type UseClippet = [ClippetPlay, ClippetAdvancedTuple];

export interface Clippet {
  name: string;
  url: string;
}

export type ClippetPlay = () => void;
export type ClippetStop = () => void;
export interface ClippetAdvancedTuple {
  stop: ClippetStop;
};

export interface AudioCache {
  [key: string]: HTMLAudioElement;
}
