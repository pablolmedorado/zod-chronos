import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalTimeZone, temporalTimeZone } from '../schemas/time-zone.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.TimeZone',
  value: Temporal.TimeZone.from('Europe/Paris'),
  stringValue: 'Europe/Paris',
  fn: temporalTimeZone,
  zFn: errorMessages => extendedZ.temporalTimeZone(errorMessages),
  coerceFn: coercedTemporalTimeZone,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalTimeZone(errorMessages),
})
