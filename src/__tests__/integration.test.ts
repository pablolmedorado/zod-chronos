import { Temporal } from '@js-temporal/polyfill'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import {
  coercedTemporalZonedDateTime,
  temporalInstant,
  temporalPlainDate,
  temporalPlainTime,
} from '../schemas/index.js'

describe('Integration with Zod Features', () => {
  it('works with complex object schemas using functional approach', () => {
    const schema = z.object({
      required: temporalInstant(),
      optional: temporalPlainDate().optional(),
      nullable: temporalPlainTime().nullable(),
      coerced: coercedTemporalZonedDateTime(),
    })

    const now = Temporal.Now.instant()
    const date = Temporal.PlainDate.from('2024-02-09')
    const time = Temporal.PlainTime.from('12:00:00')
    const zdt = Temporal.ZonedDateTime.from('2024-02-09T12:00:00+01:00[Europe/Paris]')

    // Test full object with all fields
    const valid = {
      required: now,
      optional: date,
      nullable: time,
      coerced: zdt,
    }
    expect(schema.parse(valid)).toEqual(valid)

    // Test with optional field omitted
    const withoutOptional = {
      required: now,
      nullable: time,
      coerced: zdt,
    }
    expect(schema.parse(withoutOptional)).toEqual(withoutOptional)

    // Test with nullable field as null and coerced string
    const withNullAndCoerced = {
      required: now,
      nullable: null,
      coerced: zdt.toString(),
    }
    const parsedWithNullAndCoerced = schema.parse(withNullAndCoerced)
    expect(parsedWithNullAndCoerced.required).toBe(now)
    expect(parsedWithNullAndCoerced.nullable).toBeNull()
    expect(parsedWithNullAndCoerced.coerced).toBeInstanceOf(Temporal.ZonedDateTime)
    expect(parsedWithNullAndCoerced.coerced.toString()).toBe(zdt.toString())
  })
})
