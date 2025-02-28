import type { z } from 'zod'
import {
  coercedTemporalCalendar,
  coercedTemporalDuration,
  coercedTemporalInstant,
  coercedTemporalPlainDate,
  coercedTemporalPlainDateTime,
  coercedTemporalPlainTime,
  coercedTemporalTimeZone,
  coercedTemporalZonedDateTime,
  temporalCalendar,
  temporalDuration,
  temporalInstant,
  temporalPlainDate,
  temporalPlainDateTime,
  temporalPlainTime,
  temporalTimeZone,
  temporalZonedDateTime,
} from './schemas/index.js'

/**
 * Extends a Zod instance with Temporal schemas.
 * @param zodInstance - The Zod instance to extend.
 * @returns The extended Zod instance with Temporal schemas.
 * @example
 * ```ts
 * import { z } from 'zod';
 * import { withTemporal } from 'zod-temporal';
 *
 * const extendedZ = withTemporal(z);
 * const schema = extendedZ.temporalInstant();
 * ```
 */
export const withTemporal = (zodInstance: typeof z) => {
  // Create a new object that inherits from the Zod instance
  const extendedZ = Object.create(zodInstance)

  // Add Temporal schemas
  Object.assign(extendedZ, {
    temporalInstant,
    temporalPlainDate,
    temporalPlainTime,
    temporalPlainDateTime,
    temporalZonedDateTime,
    temporalDuration,
    temporalTimeZone,
    temporalCalendar,
  })

  // Create a new coerce object that inherits from the original
  const coerce = Object.create(zodInstance.coerce)

  // Add Temporal coercion schemas
  Object.assign(coerce, {
    temporalInstant: coercedTemporalInstant,
    temporalPlainDate: coercedTemporalPlainDate,
    temporalPlainTime: coercedTemporalPlainTime,
    temporalPlainDateTime: coercedTemporalPlainDateTime,
    temporalZonedDateTime: coercedTemporalZonedDateTime,
    temporalDuration: coercedTemporalDuration,
    temporalTimeZone: coercedTemporalTimeZone,
    temporalCalendar: coercedTemporalCalendar,
  })

  // Assign the coerce object
  Object.defineProperty(extendedZ, 'coerce', {
    value: coerce,
    enumerable: true,
    configurable: true,
  })

  return extendedZ as typeof zodInstance & {
    temporalInstant: typeof temporalInstant
    temporalPlainDate: typeof temporalPlainDate
    temporalPlainTime: typeof temporalPlainTime
    temporalPlainDateTime: typeof temporalPlainDateTime
    temporalZonedDateTime: typeof temporalZonedDateTime
    temporalDuration: typeof temporalDuration
    temporalTimeZone: typeof temporalTimeZone
    temporalCalendar: typeof temporalCalendar
    coerce: {
      temporalInstant: typeof coercedTemporalInstant
      temporalPlainDate: typeof coercedTemporalPlainDate
      temporalPlainTime: typeof coercedTemporalPlainTime
      temporalPlainDateTime: typeof coercedTemporalPlainDateTime
      temporalZonedDateTime: typeof coercedTemporalZonedDateTime
      temporalDuration: typeof coercedTemporalDuration
      temporalTimeZone: typeof coercedTemporalTimeZone
      temporalCalendar: typeof coercedTemporalCalendar
    } & (typeof zodInstance)['coerce']
  }
}
