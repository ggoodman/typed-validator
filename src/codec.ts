import { ValidationError } from "./validator";
import type { Codec, ValidateFunction } from "./types";

class CodecImpl<T> implements Codec<T> {
  constructor(
    readonly name: string,
    readonly uri: string,
    private validateFn: ValidateFunction<T>
  ) {}

  /**
   * Identify function returning the given argument as a value matching the schema.
   *
   * This can be useful to use in non-TypeScript code to construct a valid object while
   * benefitting from suggestions from a TypeScript language service.
   */
  identity(obj: T): T {
    return obj;
  }

  /**
   * Check if a value matches the schema.
   */
  is(obj: unknown): obj is T {
    return this.validateFn(obj);
  }

  /**
   * Validate that a value matches the schema and throws if not.
   */
  validate(obj: unknown): T {
    if (!this.validateFn(obj)) {
      throw new ValidationError(this.name, obj, this.validateFn.errors || []);
    }

    return obj;
  }
}

export function createCodec<T>(
  name: string,
  uri: string,
  validateFn: ValidateFunction<T>
): Codec<T> {
  return new CodecImpl(name, uri, validateFn);
}
