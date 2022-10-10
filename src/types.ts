
/**
 * Global settings to adjust behaviour of all Clippet sounds at once using the Context API.
 */
export interface ClippetContextValue {

  /**
   * Flag to identify whether the sounds are globally muted.
   */
  isMuted: boolean;

  /**
   * A normalized number to set the global volume of each sound.
   * This volume level is multiplied with the volume specific settings of a hook.
   */
  volume: number;

  /**
   * The minimum volume when a sound is played. Each play request is checked against this volume,
   * with the exception when the sound is muted. In that case `mutedVolume` is used.
   */
  minVolume: number;

  /**
   * The maximum volume when a sound is played. Each play request is checked against this volume.
   */
  maxVolume: number;

  /**
   * The volume used when a sound is muted. This by default is (of course) `0`, but can be adjusted in more advanced situations.
   */
  mutedVolume: number;

  /**
   * The global pitch level for all sounds. This pitch level is multiplied with the pitch specific settings of a hook.
   */
  pitch: number;
}

export type ClippetProviderOptions = ClippetContextValue;

/**
 * Optional options that can be passed to a `useClippet` hook to fine-tune the behaviour.
 */
export interface UseClippetAdvancedOptions {

  /**
   * Flag to identify whether the sound of this hook should be muted.
   */
  isMuted: boolean;

  /**
   * True when the sound should be played regardless of any mute options passed to the provider or hook.
   */
  forceUnmute: boolean;

  /**
   * A normalized number (between 0 and 1) to adjust the volume of the sound of this hook.
   * This number is multiplied with the volume level of the provider making it possible to set a global volume
   * and adjust the relative volume for each invidual hook.
   */
  volume: number;

  /**
   * A normalized number (between 0 and 1) to adjust the pitch of the sound of this hook.
   * This number is multiplied with the pitch of the provider making it possible to set a global pitch
   * and adjust the relative pitch for each invidual hook.
   */
  pitch: number;

  /**
   * Flag to identity whether the `Audio` instance should be re-used across unique `useClippet` hook instances.
   */
  enablePooling: boolean;
}

/**
 * The `useClippet` hook return tuple.
 */
export type UseClippet = [ClippetPlay, ClippetAdvancedTuple];

/**
 * The definition of a unique Clippet sound which the `useClippet` hook expects to specify the sound.
 */
export interface Clippet {
  name: string;
  url: string;
}

export type ClippetPlay = () => void;
export type ClippetStop = () => void;
export interface ClippetAdvancedTuple {
  stop: ClippetStop;
};

export interface GetPooledClipOptions {
  clippet: Clippet;
  enablePooling: boolean;
}

export interface AudioPool {
  [key: string]: HTMLAudioElement;
}
