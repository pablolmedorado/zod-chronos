import { z } from 'zod'
import type { TemporalErrorMessage } from './types.js'

/**
 * Helper function to create Temporal schemas.
 * @internal
 */
export const createTemporalSchema = <T>(
  check: (val: unknown) => val is T,
  defaultErrorMessage: string,
  errorMessages?: TemporalErrorMessage
) => {
  const message = errorMessages?.invalid_type ?? defaultErrorMessage
  return z.custom<T>(val => check(val), { message })
}
