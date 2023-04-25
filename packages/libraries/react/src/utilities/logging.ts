import { Clippet } from '../../../../shared';

import {
  DEBUG_ENABLED,
  DEBUG_PREFIX,
  DEBUG_PREFIX_STYLE,
} from '../constants';

/**
 * Helper to debug the library that checks whether the debugging flag is enabled.
 *
 * @param messages The messages that should be debugged.
 * @returns void
 */
export function debug(...messages: any[]) {

  // guard: skip when debug is not enabled
  if (!DEBUG_ENABLED) {
    return;
  }

  console.log(
    `%c ${DEBUG_PREFIX}`,
    DEBUG_PREFIX_STYLE,
    ...messages,
  );
}

/**
 * Helper to have a shortcut to debug for specific Clippet instances.
 * This will automatically include information to identity the Clippet instance
 * as a prefix in the debug message.
 *
 * @param clippet The Clippet instance to debug  for.
 * @param messages The messages that should be debugged.
 */
export function debugClippet(clippet: Clippet, ...messages: any[]) {
  debug(`[CLIPPET ${clippet.name}]`, ...messages);
}
