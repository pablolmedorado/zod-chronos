import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.TimeZone objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.TimeZone objects.
 * @example
 * ```ts
 * const schema = temporalTimeZone();
 * schema.parse(Temporal.TimeZone.from('Europe/Paris')); // ✅ OK
 * ```
 */
export const temporalTimeZone = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.TimeZone>(
    (val): val is Temporal.TimeZone => val instanceof Temporal.TimeZone,
    'Invalid Temporal.TimeZone',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.TimeZone objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.TimeZone objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalTimeZone();
 * schema.parse('Europe/Paris'); // ✅ Returns Temporal.TimeZone
 * ```
 */
export const coercedTemporalTimeZone = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.TimeZone.from(val)
      } catch (_e) {
        throw new Error(errorMessages?.invalid_type ?? `Invalid Temporal.TimeZone string: ${val}`)
      }
    }
    return val
  }, temporalTimeZone(errorMessages))
