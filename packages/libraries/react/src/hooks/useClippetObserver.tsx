import { useState, useEffect, useCallback, RefObject, useMemo } from 'react';

import { Clippet, ClippetObserverOptions } from '../types';
import { debugClippet } from '../utilities/logging';
import { DEFAULT_MUTATION_OBSERVER_DEBOUNCE_MS, DEFAULT_MUTATION_OBSERVER_OPTIONS } from '../constants';

import { useClippet } from './useClippet';
import { timeHasPassed } from '../utilities/timing';

export function useClippetObserver<T extends HTMLElement | null>(ref: RefObject<T>, clippet: Clippet, options?: Partial<ClippetObserverOptions>) {
  const {
    mutationObserverOptions = DEFAULT_MUTATION_OBSERVER_OPTIONS,
    syncWithAnimation = false,
  } = options ?? {};
  const [playSound, { stop: stopSound }] = useClippet(clippet, options);
  const [lastMutatedAt, setLastMutatedAt] = useState<Date | null>(null);
  const [lastPlayedAt, setLastPlayedAt] = useState<Date | null>(null);
  const [observer, setObserver] = useState<MutationObserver | null>(null);
  const mutationCallback = useCallback((_mutationsList: MutationRecord[]) => {
    const now = new Date();
    const canTrigger = timeHasPassed(lastPlayedAt, DEFAULT_MUTATION_OBSERVER_DEBOUNCE_MS);

    // always track when the last mutation took place
    setLastMutatedAt(now);

    // guard: skip playing of the sound if recently triggered
    if (!canTrigger) {
      return;
    }

    debugClippet(clippet, '👀 Handling observed mutation...');
    setLastPlayedAt(now);
    playSound();
  }, [playSound, lastPlayedAt, setLastPlayedAt, setLastMutatedAt]);

  // stop the sound when the mutations are done
  useEffect(() => {
    if (!syncWithAnimation || !lastPlayedAt || !lastMutatedAt) {
      return;
    }

    const interval = setInterval(() => {
      const shouldStopSound = timeHasPassed(lastMutatedAt, 100);

      if (shouldStopSound) {
        debugClippet(clippet, '✋ Stopping sound because mutations seems to be done...');
        stopSound();
        setLastPlayedAt(null);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [syncWithAnimation, lastPlayedAt, lastMutatedAt, stopSound, setLastPlayedAt]);

  // initialize the observer instance
  useEffect(() => {
    const newObserver = new MutationObserver(mutationCallback);
    setObserver(newObserver);

    // cleanup the new observer
    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, [options, setObserver, mutationCallback]);

  // change the element to observe
  useEffect(() => {

    // guard: make sure the observer is available and the target element is available
    if (!observer || !ref || !ref.current) {
      return;
    }

    observer.observe(ref.current, mutationObserverOptions);
  }, [observer, ref?.current, options]);
}
