import { useEffect } from 'react';

import { ClippetWindowEventsOptions } from '../types';
import { getAudioVolumeTuple, getPooledAudio, playAudio, resetAudio } from '../utilities/audio';
import { debugClippet } from '../utilities/logging';

type EventListener = (event: Event) => void;

export function useClippetWindowEvents(options: ClippetWindowEventsOptions) {
  const {
    windowEvents = [],
    providerOptions = {},
  } = options;

  // set all window events reactively
  useEffect(() => {
    const eventListeners: EventListener[] = [];

    windowEvents?.map?.((windowEvent) => {
      const { eventTypes, selectors, clippet, options: clippetOptions } = windowEvent;
      const { enablePooling = true } = clippetOptions ?? {};
      const { volume, isMuted } = getAudioVolumeTuple(providerOptions, clippetOptions);
      const audio = getPooledAudio({
        enablePooling,
        clippet,
      });

      // add event listeners for each event type
      eventTypes?.map?.((eventType) => {
        const eventListener: EventListener = (event: Event) => {
          const { target } = event;

          // add event listener for each selector
          selectors?.map((selector) => {
            // @ts-ignore, matches is not a property of target even though it is a property of Element
            const matches = target?.matches?.(selector);

            // guard: make sure the target matches the selector
            if (!matches) {
              return;
            }

            // reset the audio to the beginning to support multiple clicks in a row
            debugClippet(clippet, `${isMuted ? '🔇' : '🔊'} Playing from window event with volume: `, volume);
            resetAudio(audio);
            playAudio(audio, volume);
          });
        }

        // add listener to window and push to array for cleanup later
        window.addEventListener(eventType, eventListener)
        eventListeners.push(eventListener);
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
