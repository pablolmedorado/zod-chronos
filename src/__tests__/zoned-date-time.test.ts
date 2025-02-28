import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalZonedDateTime, temporalZonedDateTime } from '../schemas/zoned-date-time.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.ZonedDateTime',
  value: Temporal.ZonedDateTime.from('2024-02-09T12:00:00+01:00[Europe/Paris]'),
  stringValue: '2024-02-09T12:00:00+01:00[Europe/Paris]',
  fn: temporalZonedDateTime,
  zFn: errorMessages => extendedZ.temporalZonedDateTime(errorMessages),
  coerceFn: coercedTemporalZonedDateTime,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalZonedDateTime(errorMessages),
})
