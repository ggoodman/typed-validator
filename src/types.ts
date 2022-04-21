import type { ErrorObject } from "./validator";

export interface Codec<T> {
  /**
   * Identify function returning the given argument as a value matching the schema.
   *
   * This can be useful to use in non-TypeScript code to construct a valid object while
   * benefitting from suggestions from a TypeScript language service.
   */
  identity(obj: T): T;

  /**
   * Check if a value matches the schema.
   */
  is(obj: unknown): obj is T;

  /**
   * Validate that a value matches the schema and throws if not.
   */
  validate(obj: unknown): T;
}

export interface ValidateFunction<T = unknown> {
  (data: unknown): data is T;
  errors?: ErrorObject[];
}
