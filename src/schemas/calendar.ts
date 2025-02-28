import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.Calendar objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.Calendar objects.
 * @example
 * ```ts
 * const schema = temporalCalendar();
 * schema.parse(Temporal.Calendar.from('iso8601')); // ✅ OK
 * ```
 */
export const temporalCalendar = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.Calendar>(
    (val): val is Temporal.Calendar => val instanceof Temporal.Calendar,
    'Invalid Temporal.Calendar',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.Calendar objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.Calendar objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalCalendar();
 * schema.parse('iso8601'); // ✅ Returns Temporal.Calendar
 * ```
 */
export const coercedTemporalCalendar = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.Calendar.from(val)
      } catch (_e) {
        throw new Error(errorMessages?.invalid_type ?? `Invalid Temporal.Calendar string: ${val}`)
      }
    }
    return val
  }, temporalCalendar(errorMessages))
