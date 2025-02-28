import { Temporal } from '@js-temporal/polyfill'
import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { withTemporal } from '../index.js'
import type { TemporalErrorMessage } from '../types.js'

export const extendedZ = withTemporal(z)

export type TestCase<T> = {
  type: string
  value: T
  stringValue: string
  fn: (errorMessages?: TemporalErrorMessage) => z.ZodType<T>
  zFn: (errorMessages?: TemporalErrorMessage) => z.ZodType<T>
  coerceFn: (errorMessages?: TemporalErrorMessage) => z.ZodType<T>
  zCoerceFn: (errorMessages?: TemporalErrorMessage) => z.ZodType<T>
}

export const runTestSuite = <T>(testCase: TestCase<T>) => {
  const { type, value, stringValue, fn, zFn, coerceFn, zCoerceFn } = testCase

  describe(`${type} Schema`, () => {
    describe('Type validation', () => {
      it('validates using functional approach', () => {
        expect(fn().parse(value)).toBe(value)
        expect(() => fn().parse('invalid')).toThrow()
      })

      it('validates using extended instance', () => {
        expect(zFn().parse(value)).toBe(value)
        expect(() => zFn().parse('invalid')).toThrow()
      })
    })

    describe('Error messages', () => {
      it('supports custom error messages using functional approach', () => {
        const customMessage = 'Custom error message'
        const schema = fn({ invalid_type: customMessage })
        expect(() => schema.parse('invalid')).toThrow(customMessage)
      })

      it('supports custom error messages using extended instance', () => {
        const customMessage = 'Custom error message'
        const schema = zFn({ invalid_type: customMessage })
        expect(() => schema.parse('invalid')).toThrow(customMessage)
      })

      it('provides descriptive default error messages', () => {
        const invalidValue = 'not-a-date'
        expect(() => fn().parse(invalidValue)).toThrow(`Invalid ${type}`)
        expect(() => zFn().parse(invalidValue)).toThrow(`Invalid ${type}`)
      })
    })

    describe('Coercion', () => {
      it('coerces valid strings using functional approach', () => {
        const result = coerceFn().parse(stringValue)
        expect(result).toBeInstanceOf(Temporal[type.split('.')[1] as keyof typeof Temporal])
      })

      it('coerces valid strings using extended instance', () => {
        const result = zCoerceFn().parse(stringValue)
        expect(result).toBeInstanceOf(Temporal[type.split('.')[1] as keyof typeof Temporal])
      })

      it('provides descriptive error messages for invalid coercion using functional approach', () => {
        const invalidValue = 'not-a-date'
        expect(() => coerceFn().parse(invalidValue)).toThrow(
          `Invalid ${type} string: ${invalidValue}`
        )
      })

      it('provides descriptive error messages for invalid coercion using extended instance', () => {
        const invalidValue = 'not-a-date'
        expect(() => zCoerceFn().parse(invalidValue)).toThrow(
          `Invalid ${type} string: ${invalidValue}`
        )
      })

      it('supports custom error messages in coercion using functional approach', () => {
        const customMessage = 'Custom error message'
        const schema = coerceFn({ invalid_type: customMessage })
        expect(() => schema.parse('invalid')).toThrow(customMessage)
      })

      it('supports custom error messages in coercion using extended instance', () => {
        const customMessage = 'Custom error message'
        const schema = zCoerceFn({ invalid_type: customMessage })
        expect(() => schema.parse('invalid')).toThrow(customMessage)
      })
    })
  })
}
