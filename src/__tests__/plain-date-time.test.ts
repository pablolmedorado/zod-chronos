import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalPlainDateTime, temporalPlainDateTime } from '../schemas/plain-date-time.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.PlainDateTime',
  value: Temporal.PlainDateTime.from('2024-02-09T12:00:00'),
  stringValue: '2024-02-09T12:00:00',
  fn: temporalPlainDateTime,
  zFn: errorMessages => extendedZ.temporalPlainDateTime(errorMessages),
  coerceFn: coercedTemporalPlainDateTime,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalPlainDateTime(errorMessages),
})
