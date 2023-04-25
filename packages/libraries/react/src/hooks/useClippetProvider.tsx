import { useContext } from 'react';

import ClippetContext from '../context/ClippetContext';

/**
 * Hook to get the current global options influencing each Clippet instance.
 *
 * @returns ClippetContextOptions
 */
export function useClippetProvider() {
  return useContext(ClippetContext);
}
