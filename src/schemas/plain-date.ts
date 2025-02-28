import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.PlainDate objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.PlainDate objects.
 * @example
 * ```ts
 * const schema = temporalPlainDate();
 * schema.parse(Temporal.PlainDate.from('2024-02-09')); // ✅ OK
 * ```
 */
export const temporalPlainDate = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.PlainDate>(
    (val): val is Temporal.PlainDate => val instanceof Temporal.PlainDate,
    'Invalid Temporal.PlainDate',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.PlainDate objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.PlainDate objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalPlainDate();
 * schema.parse('2024-02-09'); // ✅ Returns Temporal.PlainDate
 * ```
 */
export const coercedTemporalPlainDate = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.PlainDate.from(val)
      } catch (_e) {
        throw new Error(errorMessages?.invalid_type ?? `Invalid Temporal.PlainDate string: ${val}`)
      }
    }
    return val
  }, temporalPlainDate(errorMessages))
