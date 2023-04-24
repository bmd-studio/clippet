import { useEffect } from 'react';

import { ClippetWindowEventsOptions } from '../types';
import { getAudioVolumeTuple, getPooledAudio } from '../utilities';

type EventListener = (event: Event) => void;

export function useClippetWindowEvents(options: ClippetWindowEventsOptions) {
  const {
    windowEvents = [],
    providerOptions = {},
  } = options;
  providerOptions

  // set all window events reactively
  useEffect(() => {
    const eventListeners: EventListener[] = [];

    windowEvents?.map?.((windowEvent) => {
      const { eventTypes, selectors, clippet, options: clippetOptions } = windowEvent;
      const { enablePooling = true } = clippetOptions ?? {};
      const { volume } = getAudioVolumeTuple(providerOptions, clippetOptions);
      const audio = getPooledAudio({
        enablePooling,
        clippet,
      });

      // guard: check if the audio element is valid
      if (!audio) {
        return;
      }

      eventTypes?.map?.((eventType) => {
        const eventListener: EventListener = (event: Event) => {
          const { target } = event;

          selectors?.map((selector) => {
            // @ts-ignore, matches is not a property of target even though it is a property of Element
            const matches = target?.matches?.(selector);

            // when a match is found, play the audio
            // reset the audio to the beginning to support multiple clicks in a row
            if (matches) {
              audio.currentTime = 0;
              audio.volume = volume;
              audio?.play();
            }
          });
        }

        eventListeners.push(eventListener);
        window.addEventListener(eventType, eventListener)
      });
    });

    return () => {
      eventListeners.map((eventListener) => {
        window.removeEventListener('click', eventListener);
      })
    };
  }, [JSON.stringify(windowEvents), JSON.stringify(providerOptions)]);

  return null;
}
