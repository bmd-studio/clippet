import { ONE_SECOND_MS } from '../constants';

export function throttle(callback: Function, delay: number) {
  let shouldWait = false

  return (...args: any[]) => {
    if (shouldWait) {
      return;
    }

    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  }
}

export function debounce(callback: Function, delay: number) {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  }
}

export function timeHasPassed(date: Date | null | undefined, ms: number) {
  if (!date) {
    return true;
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  return diff > ms;
}

export function getTimeoutMsByFrameRate(frameRate: number) {

  // guard: skip invalid frame rates
  if (frameRate === 0) {
    return 0;
  }

  return ONE_SECOND_MS / Math.abs(frameRate);
}
