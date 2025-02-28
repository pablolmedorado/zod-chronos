import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalPlainDate, temporalPlainDate } from '../schemas/plain-date.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.PlainDate',
  value: Temporal.PlainDate.from('2024-02-09'),
  stringValue: '2024-02-09',
  fn: temporalPlainDate,
  zFn: errorMessages => extendedZ.temporalPlainDate(errorMessages),
  coerceFn: coercedTemporalPlainDate,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalPlainDate(errorMessages),
})
