import { expectType } from './test-utils';
import type { Try } from '../Try';

describe('Try', () => {
  class CustomError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'CustomError';
    }
  }

  it('should handle success case with string value', () => {
    type Result = Try<string, Error>;
    expectType<Result, { success: true; value: string } | { success: false; error: Error }>({} as any);
  });

  it('should handle error case with custom error', () => {
    type Result = Try<number, CustomError>;
    expectType<Result, { success: true; value: number } | { success: false; error: CustomError }>({} as any);
  });

  it('should work with complex value types', () => {
    type ComplexType = {
      id: number;
      data: string[];
    };
    type Result = Try<ComplexType, Error>;
    expectType<Result, { success: true; value: ComplexType } | { success: false; error: Error }>({} as any);
  });

  it('should work with union types', () => {
    type Result = Try<string | number, Error>;
    expectType<Result, { success: true; value: string | number } | { success: false; error: Error }>({} as any);
  });

  it('should work with multiple error types', () => {
    type Result = Try<string, Error | CustomError>;
    expectType<Result, { success: true; value: string } | { success: false; error: Error | CustomError }>({} as any);
  });

  it('should work with void value type', () => {
    type Result = Try<void, Error>;
    expectType<Result, { success: true; value: void } | { success: false; error: Error }>({} as any);
  });
});
