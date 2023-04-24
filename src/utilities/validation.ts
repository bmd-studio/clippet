
/**
 * Helper to cap a value to be between a specific range.
 *
 * @param value The value that should fall between a specific range.
 * @param minValue The minimum value allowed.
 * @param maxValue The maximum value allowed.
 * @returns The new value between `minValue` and `maxValue`.
 */
export function capValueWithinRange(value: number, minValue: number, maxValue: number) {

  // guard: check if the minimum value is exceeded
  if (value < minValue) {
    return minValue;
  }

  // guard: check if the maximum value is exceeded
  if (value > maxValue) {
    return maxValue;
  }

  return value;
};
