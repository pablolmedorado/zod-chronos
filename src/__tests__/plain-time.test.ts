import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalPlainTime, temporalPlainTime } from '../schemas/plain-time.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.PlainTime',
  value: Temporal.PlainTime.from('12:00:00'),
  stringValue: '12:00:00',
  fn: temporalPlainTime,
  zFn: errorMessages => extendedZ.temporalPlainTime(errorMessages),
  coerceFn: coercedTemporalPlainTime,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalPlainTime(errorMessages),
})
