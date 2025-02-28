import { Temporal } from '@js-temporal/polyfill'
import { z } from 'zod'
import type { TemporalErrorMessage } from '../types.js'
import { createTemporalSchema } from '../utils.js'

/**
 * Creates a Zod schema that validates Temporal.Instant objects.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that validates Temporal.Instant objects.
 * @example
 * ```ts
 * const schema = temporalInstant();
 * schema.parse(Temporal.Now.instant()); // ✅ OK
 * schema.parse('invalid'); // ❌ Throws ZodError
 * ```
 */
export const temporalInstant = (errorMessages?: TemporalErrorMessage) =>
  createTemporalSchema<Temporal.Instant>(
    (val): val is Temporal.Instant => val instanceof Temporal.Instant,
    'Invalid Temporal.Instant',
    errorMessages
  )

/**
 * Creates a coerced schema that accepts both Temporal.Instant objects and strings.
 * @param errorMessages - Optional custom error messages.
 * @returns A Zod schema that accepts both Temporal.Instant objects and strings.
 * @example
 * ```ts
 * const schema = coercedTemporalInstant();
 * schema.parse('2024-02-09T12:00:00Z'); // ✅ Returns Temporal.Instant
 * schema.parse(Temporal.Now.instant()); // ✅ Returns the same instant
 * ```
 */
export const coercedTemporalInstant = (errorMessages?: TemporalErrorMessage) =>
  z.preprocess(val => {
    if (typeof val === 'string') {
      try {
        return Temporal.Instant.from(val)
      } catch (_e) {
        throw new Error(errorMessages?.invalid_type ?? `Invalid Temporal.Instant string: ${val}`)
      }
    }
    return val
  }, temporalInstant(errorMessages))
