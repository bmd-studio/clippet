/**
 * Whether package is running in development.
 */
export const IN_DEVELOPMENT = false;

/**
 * Whether debugging for this package is enabled.
 */
export const DEBUG_ENABLED = IN_DEVELOPMENT;

/**
 * One second in milliseconds.
 */
export const ONE_SECOND_MS = 1000;

/**
 * Whether debugging for this package is enabled.
 */
export const DEBUG_PREFIX = `[CLIPPET]`;

/**
 * CSS styling of the debug prefix
 */
export const DEBUG_PREFIX_STYLE = 'background: #222; color: #bada55';

/**
 * The default of the muted flag.
 */
export const DEFAULT_MUTED = false;

/**
 * The default of the auto unmute flag.
 */
export const DEFAULT_AUTO_UNMUTE = false;

/**
 * The default volume level of the provider.
 */
export const DEFAULT_PROVIDER_VOLUME = 1.0;

/**
 * The default volume level of the clippet.
 */
 export const DEFAULT_CLIPPET_VOLUME = 1.0;

/**
 * The default minimum volume level.
 */
export const DEFAULT_MIN_VOLUME = 0.0;

/**
 * The default maximum volume level.
 */
export const DEFAULT_MAX_VOLUME = 1.0;

/**
 * The default volume level while muted.
 */
export const DEFAULT_MUTED_VOLUME = 0.0;

/**
 * The default pitch level.
 */
export const DEFAULT_PITCH = 1.0;

/**
 * The default minimum pitch level.
 */
export const DEFAULT_MIN_PITCH = 0.0;

/**
 * The default maximum pitch level.
 */
export const DEFAULT_MAX_PITCH = 10.0;

/**
 * The default time required between mutations to trigger the handler.
 * Please note that this debounce time should be smaller than the stop timeout when synchronising changes.
 */
export const DEFAULT_MUTATION_OBSERVER_DEBOUNCE_MS = 100;

/**
 * The default frame rate per second where the movement should be checked.
 */
export const DEFAULT_MOVEMENT_OBSERVER_FRAME_RATE = 10;

/**
 * The default frame rate per second where the synchronisation should be checked.
 */
export const DEFAULT_SYNCHRONISATION_OBSERVER_FRAME_RATE = 10;

/**
 * The default time it takes after the last change before the sound should be stopped when synchronisation is enabled.
 */
export const DEFAULT_SYNCRONISATION_OBSERVER_STOP_TIMEOUT_MS = 200;

/**
 * The default amount of movement in pixels required to trigger a sound.
 */
export const DEFAULT_MOVEMENT_OBSERVER_THRESHOLD_PX = 0.01;
