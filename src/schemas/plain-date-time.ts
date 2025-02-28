import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.PlainDateTime objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.PlainDateTime objects.
 * @example
 * ```ts
 * const schema = temporalPlainDateTime();
 * schema.parse(Temporal.PlainDateTime.from('2024-02-09T12:00:00')); // ✅ OK
 * ```
 */
export const temporalPlainDateTime = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.PlainDateTime>(
    (val): val is Temporal.PlainDateTime => val instanceof Temporal.PlainDateTime,
    'Invalid Temporal.PlainDateTime',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.PlainDateTime objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.PlainDateTime objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalPlainDateTime();
 * schema.parse('2024-02-09T12:00:00'); // ✅ Returns Temporal.PlainDateTime
 * ```
 */
export const coercedTemporalPlainDateTime = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.PlainDateTime.from(val)
      } catch (_e) {
        throw new Error(
          errorMessages?.invalid_type ?? `Invalid Temporal.PlainDateTime string: ${val}`
        )
      }
    }
    return val
  }, temporalPlainDateTime(errorMessages))
