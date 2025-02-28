import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.Duration objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.Duration objects.
 * @example
 * ```ts
 * const schema = temporalDuration();
 * schema.parse(Temporal.Duration.from('P1Y2M3DT4H5M6S')); // ✅ OK
 * ```
 */
export const temporalDuration = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.Duration>(
    (val): val is Temporal.Duration => val instanceof Temporal.Duration,
    'Invalid Temporal.Duration',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.Duration objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.Duration objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalDuration();
 * schema.parse('P1Y2M3DT4H5M6S'); // ✅ Returns Temporal.Duration
 * ```
 */
export const coercedTemporalDuration = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.Duration.from(val)
      } catch (_e) {
        throw new Error(errorMessages?.invalid_type ?? `Invalid Temporal.Duration string: ${val}`)
      }
    }
    return val
  }, temporalDuration(errorMessages))
