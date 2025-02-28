import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalDuration, temporalDuration } from '../schemas/duration.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.Duration',
  value: Temporal.Duration.from('P1Y2M3DT4H5M6S'),
  stringValue: 'P1Y2M3DT4H5M6S',
  fn: temporalDuration,
  zFn: errorMessages => extendedZ.temporalDuration(errorMessages),
  coerceFn: coercedTemporalDuration,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalDuration(errorMessages),
})
