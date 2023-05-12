/**
 * Published hooks
 */
export { useClippet } from './hooks/useClippet';
export { useClippetObserver } from './hooks/useClippetObserver';
export { useClippetProvider } from './hooks/useClippetProvider';
export { useClippetWindowEvents } from './hooks/useClippetWindowEvents';

/**
 * Published providers
 */
export { ClippetProvider } from './context/ClippetProvider';

/**
 * Published types
 */
export {

  // `useClippet` hook
  UseClippet,
  ClippetOptions,
  Clippet,

  // `useClippetObserver` hook
  ClippetObserverOptions,

  // provider
  ClippetProviderOptions,
  ClippetContextOptions,

  // window events
  ClippetWindowEventsOptions,
  ClippetWindowEventType,
} from './types';
