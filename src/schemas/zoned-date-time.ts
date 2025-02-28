import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.ZonedDateTime objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.ZonedDateTime objects.
 * @example
 * ```ts
 * const schema = temporalZonedDateTime();
 * schema.parse(Temporal.ZonedDateTime.from('2024-02-09T12:00:00+01:00[Europe/Paris]')); // ✅ OK
 * ```
 */
export const temporalZonedDateTime = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.ZonedDateTime>(
    (val): val is Temporal.ZonedDateTime => val instanceof Temporal.ZonedDateTime,
    'Invalid Temporal.ZonedDateTime',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.ZonedDateTime objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.ZonedDateTime objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalZonedDateTime();
 * schema.parse('2024-02-09T12:00:00+01:00[Europe/Paris]'); // ✅ Returns Temporal.ZonedDateTime
 * ```
 */
export const coercedTemporalZonedDateTime = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.ZonedDateTime.from(val)
      } catch (_e) {
        throw new Error(
          errorMessages?.invalid_type ?? `Invalid Temporal.ZonedDateTime string: ${val}`
        )
      }
    }
    return val
  }, temporalZonedDateTime(errorMessages))
