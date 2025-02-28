import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalInstant, temporalInstant } from '../schemas/instant.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.Instant',
  value: Temporal.Now.instant(),
  stringValue: '2024-02-09T12:00:00Z',
  fn: temporalInstant,
  zFn: errorMessages => extendedZ.temporalInstant(errorMessages),
  coerceFn: coercedTemporalInstant,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalInstant(errorMessages),
})
