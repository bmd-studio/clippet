import { useState, useEffect, useCallback, RefObject } from 'react';

import { Clippet, ClippetObserverOptions } from '../types';
import { debugClippet } from '../utilities/logging';
import {
  DEFAULT_MOVEMENT_OBSERVER_FRAME_RATE,
  DEFAULT_MOVEMENT_OBSERVER_THRESHOLD_PX,
  DEFAULT_MUTATION_OBSERVER_DEBOUNCE_MS as DEFAULT_OBSERVATION_DEBOUNCE_MS,
  DEFAULT_SYNCHRONISATION_OBSERVER_FRAME_RATE,
  DEFAULT_SYNCRONISATION_OBSERVER_STOP_TIMEOUT_MS,
} from '../constants';
import { getTimeoutMsByFrameRate, timeHasPassed } from '../utilities/timing';

import { useClippet } from './useClippet';

export function useClippetObserver<T extends HTMLElement | null>(ref: RefObject<T>, clippet: Clippet, options?: ClippetObserverOptions) {
  const {
    mutations,
    movements,
    synchronisation,
    debounceMs = DEFAULT_OBSERVATION_DEBOUNCE_MS,
  } = options ?? {};
  const [playSound, { stop: stopSound, audio }] = useClippet(clippet, options);
  const [lastChangedAt, setLastChangedAt] = useState<Date | null>(null);
  const [lastPlayedAt, setLastPlayedAt] = useState<Date | null>(null);
  const [observer, setObserver] = useState<MutationObserver | null>(null);
  const [lastBoundingBox, setLastBoundingBox] = useState<DOMRect | null>(null);
  const hasMutationsObserver = !!mutations;
  const hasMovementsObserver = !!movements?.enabled;
  const hasSynchronisation = !!synchronisation?.enabled;

  // handler that can be triggered when a change is observed which can be observed
  // by both the mutation observer and the bounding box observer
  const onChange = useCallback(() => {
    const now = new Date();
    const isPlaying = !audio?.ended && (audio?.currentTime ?? 0) > 0;
    const enoughTimeHasPassed = timeHasPassed(lastPlayedAt, debounceMs);
    const synchronisationMayInterrupt = (synchronisation?.interrupt || !isPlaying);
    const canTrigger = (enoughTimeHasPassed && synchronisationMayInterrupt);

    // always track when the last change took place
    setLastChangedAt(now);

    // guard: skip playing of the sound if recently triggered
    if (!canTrigger) {
      return;
    }

    debugClippet(clippet, '👀 Handling observed change to play sound...');
    setLastPlayedAt(now);
    playSound();
  }, [playSound, lastPlayedAt, setLastPlayedAt, setLastChangedAt, debounceMs]);

  // stop the sound when the observed changes are timed out
  // this is only active when a sync with animation is enabled
  useEffect(() => {
    if (!hasSynchronisation || !lastPlayedAt || !lastChangedAt) {
      return;
    }

    const {
      stopTimeoutMs = DEFAULT_SYNCRONISATION_OBSERVER_STOP_TIMEOUT_MS,
      frameRate = DEFAULT_SYNCHRONISATION_OBSERVER_FRAME_RATE,
    } = synchronisation;
    const intervalMs = getTimeoutMsByFrameRate(frameRate);
    const interval = setInterval(() => {
      const shouldStopSound = timeHasPassed(lastChangedAt, stopTimeoutMs);

      // guard: skip when stop is not needed
      if (!shouldStopSound) {
        return;
      }

      debugClippet(clippet, '✋ Stopping sound because changes seems to be done...');
      stopSound();
      setLastPlayedAt(null);
    }, intervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [hasSynchronisation, synchronisation, lastPlayedAt, lastChangedAt, stopSound, setLastPlayedAt]);

  // initialize the mutation observer instance
  useEffect(() => {

    if (!hasMutationsObserver) {
      return;
    }

    const newObserver = new MutationObserver(onChange);
    setObserver(newObserver);

    // cleanup the new observer
    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, [hasMutationsObserver, setObserver, onChange]);

  // change the element to observe
  useEffect(() => {

    // guard: make sure the observer is available and the target element is available
    if (!observer || !ref?.current) {
      return;
    }

    observer.observe(ref.current, mutations);
  }, [observer, ref?.current, mutations]);

  // observe bounding box movements
  useEffect(() => {
    if (!hasMovementsObserver || !ref?.current) {
      return;
    }

    const {
      frameRate = DEFAULT_MOVEMENT_OBSERVER_FRAME_RATE,
      threshold = DEFAULT_MOVEMENT_OBSERVER_THRESHOLD_PX,
    } = movements;
    const intervalMs = getTimeoutMsByFrameRate(frameRate);
    const interval = setInterval(() => {
      const boundingBox = ref?.current?.getBoundingClientRect();

      // guard: skip if the bounding box is not available
      if (!boundingBox) {
        return;
      }

      // guard: the initial render should not trigger something
      if (!lastBoundingBox) {
        setLastBoundingBox(boundingBox);
        return;
      }

      const hasMovedEnough = (
        Math.abs(boundingBox.x - lastBoundingBox.x) >= threshold ||
        Math.abs(boundingBox.y - lastBoundingBox.y) >= threshold
      );

      // guard: skip when not moved enough
      if (!hasMovedEnough) {
        return;
      }

      onChange();
      setLastBoundingBox(boundingBox);
    }, intervalMs);

    return () => {
      clearInterval(interval);
    }
  }, [hasMovementsObserver, movements, lastBoundingBox, onChange]);
}
