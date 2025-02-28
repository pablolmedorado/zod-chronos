import { Temporal } from '@js-temporal/polyfill'
import { coercedTemporalCalendar, temporalCalendar } from '../schemas/calendar.js'
import { extendedZ, runTestSuite } from './helpers.js'

runTestSuite({
  type: 'Temporal.Calendar',
  value: Temporal.Calendar.from('iso8601'),
  stringValue: 'iso8601',
  fn: temporalCalendar,
  zFn: errorMessages => extendedZ.temporalCalendar(errorMessages),
  coerceFn: coercedTemporalCalendar,
  zCoerceFn: errorMessages => extendedZ.coerce.temporalCalendar(errorMessages),
})
