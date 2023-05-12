/**
 * The definition of a unique Clippet sound shared across packages.
 */
export interface Clippet {
  name: string;
  url: string;
}

/**
 * Global settings to adjust behaviour of all Clippet sounds at once using the Context API.
 */
export interface ClippetContextOptions {

  /**
   * Flag to identify whether the sounds are globally muted.
   */
  isMuted?: boolean;

  /**
   * A normalized number to set the global volume of each sound.
   * This volume level is multiplied with the volume specific settings of a hook.
   */
  volume?: number;

  /**
   * The minimum volume when a sound is played. Each play request is checked against this volume,
   * with the exception when the sound is muted. In that case `mutedVolume` is used.
   */
  minVolume?: number;

  /**
   * The maximum volume when a sound is played. Each play request is checked against this volume.
   */
  maxVolume?: number;

  /**
   * The volume used when a sound is muted. This by default is (of course) `0`, but can be adjusted in more advanced situations.
   */
  mutedVolume?: number;

  /**
   * The global pitch level for all sounds. This pitch level is multiplied with the pitch specific settings of a hook.
   */
  // pitch: number;

  /**
   * Global events on the document to play clippets to make it easy to introduce accessibility features application-wide.
   */
  windowEvents?: ClippetWindowEvent[];
}

export type ClippetWindowEventType = keyof WindowEventMap;

/**
 * Global event definition to allow for easy
 */
export interface ClippetWindowEvent {
  eventTypes: ClippetWindowEventType[];
  selectors: ClippetDocumentSelector[];
  clippet: Clippet;
  options?: ClippetOptions;
}

/**
 * The Clippet global event handler options.
 */
export interface ClippetWindowEventsOptions {
  windowEvents: ClippetWindowEvent[];
  providerOptions?: ClippetProviderOptions;
}

/**
 * The Clippet document selector type to define what the global events can select on.
 */
export type ClippetDocumentSelector = string;

/**
 * The Clippet provider options that can be passed along to configure the React Context instance.
 */
export type ClippetProviderOptions = ClippetContextOptions;

/**
 * Optional options that can be passed to a `useClippet` hook to fine-tune the behaviour.
 */
export interface ClippetOptions {

  /**
   * Flag to identify whether the sound of this hook should be muted.
   */
  isMuted?: boolean;

  /**
   * True when the sound should be played regardless of any mute options passed to the provider or hook.
   */
  forceUnmute?: boolean;

  /**
   * A normalized number (between 0 and 1) to adjust the volume of the sound of this hook.
   * This number is multiplied with the volume level of the provider making it possible to set a global volume
   * and adjust the relative volume for each invidual hook.
   */
  volume?: number;

  /**
   * Flag to identity whether the `Audio` instance should be re-used across unique `useClippet` hook instances.
   */
  enablePooling?: boolean;
}

/**
 * Optional options that can be passed to a `useClippetObserver` hook to fine-tune the behaviour.
 */
export interface ClippetObserverOptions extends ClippetOptions {
  /**
   * The options to pass along to the `MutationObserver` instance when observing the DOM.
   */
  mutations?: MutationObserverInit;
  /**
   * The options to enable observing movements using the `getClientBoundingRect` state.
   */
  movements?: MovementObserverOptions;
  /**
   * The amount of time in milliseconds a change can be observed and with that a sound can be played.
   */
  debounceMs?: number;
  /**
   * Advanced options to synchronize the observerations done with the playback of the sound.
   * This for example allow for a sound to be played when a element moves and stop when it stops moving.
   */
  synchronisation?: SynchronisationObserverOptions;
}

/**
 * Optional options that can be passed to a `useMovementObserver` hook to fine-tune the behaviour.
 */
export interface MovementObserverOptions {
  /**
   * Flag to identify whether observing movements is enabled.
   */
  enabled?: boolean;
  /**
   * The minimum movement in pixels to trigger a sound. This can be on both the y and x axis.
   */
  threshold?: number;
  /**
   * The frame rate at which the movement should be checked. This is in frames per second.
   */
  frameRate?: number;
}

export interface SynchronisationObserverOptions {
  /**
   * Flag to identify whether synchronizing the observer with the sound is enabled
   */
  enabled?: boolean;
  /**
   * The amount of time in milliseconds before a sound is stopped when any changes stop.
   */
  stopTimeoutMs?: number;
  /**
   * The frame rate at which any synchronisation should be checked. This is in frames per second.
   */
  frameRate?: number;
}

/**
 * The `useClippet` hook return tuple.
 */
export type UseClippet = [ClippetPlay, ClippetAdvancedTuple];

/**
 * API for advanced usage of the `useClippet` hook.
 */
export interface ClippetAdvancedTuple {
  stop: ClippetStop;
};

/**
 * Function signature of the `play` function of a Clippet.
 */
export type ClippetPlay = () => void;

 /**
  * Function signature of the `stop` function of a Clippet.
  */
export type ClippetStop = () => void;

 /**
  * Data structure of the `Audio` pool.
  */
export interface AudioPool {
  [key: string]: HTMLAudioElement;
}

/**
 * Nullable HTML5 `Audio` instance.
 */
export type ClippetAudio = HTMLAudioElement | null;

/**
 * Options to be passed along when fetching a pooled `Audio` instance.
 */
export interface GetPooledClipOptions {
  clippet: Clippet;
  enablePooling: boolean;
}
