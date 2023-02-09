import { useEffect } from 'react';

import { ClippetWindowEventsOptions } from '../types';

export function useClippetWindowEvents(options: ClippetWindowEventsOptions) {
  const {
    windowEvents = [],
  } = options;

  useEffect(() => {
    const eventListeners: Function[] = [];

    windowEvents?.map?.((windowEvent) => {
      const { eventTypes, selectors, clippet, clippetOptions } = windowEvent;

      eventTypes?.map?.((eventType) => {
        // window.addEventListener(eventType, (event) => {
        //   const { target } = event;

        // })
      });
    });

    return () => {
      // eventListeners.map((eventListener) => {
      //   window.removeEventListener('click', eventListener);
      // })
    };
  }, [windowEvents]);

  return null;
}
