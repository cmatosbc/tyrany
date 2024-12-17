import { IsExact } from 'conditional-type-checks';

/**
 * Utility function to check if two types are exactly the same
 */
export function expectType<T, U>(_result: IsExact<T, U> extends true ? true : false): void {
  // This function is only used for type checking
}

/**
 * Utility function to check if one type extends another
 */
export function expectExtends<T, U>(_result: T extends U ? true : false): void {
  // This function is only used for type checking
}

/**
 * Asserts that a condition is true
 * This is a compile-time type check
 */
export function expectTrue<T extends true>() {}
