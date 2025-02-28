import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.PlainTime objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.PlainTime objects.
 * @example
 * ```ts
 * const schema = temporalPlainTime();
 * schema.parse(Temporal.PlainTime.from('12:00:00')); // ✅ OK
 * ```
 */
export const temporalPlainTime = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.PlainTime>(
    (val): val is Temporal.PlainTime => val instanceof Temporal.PlainTime,
    'Invalid Temporal.PlainTime',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.PlainTime objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.PlainTime objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalPlainTime();
 * schema.parse('12:00:00'); // ✅ Returns Temporal.PlainTime
 * ```
 */
export const coercedTemporalPlainTime = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.PlainTime.from(val)
      } catch (_e) {
        throw new Error(errorMessages?.invalid_type ?? `Invalid Temporal.PlainTime string: ${val}`)
      }
    }
    return val
  }, temporalPlainTime(errorMessages))
