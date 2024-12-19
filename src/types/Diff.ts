/**
 * Diff.ts
 * 
 * This file contains a utility type [Diff](cci:2://file:///home/carlos/Projects/typescript/src/types/Diff.ts:0:0-0:42) that computes the difference 
 * between two types `T` and `U`. It is useful for scenarios where you 
 * need to exclude properties of type `U` from type `T`.
 * 
 * @template T - The first type to compare.
 * @template U - The second type to compare.
 * 
 * @example
 * // Given types
 * type A = { x: number; y: string; };
 * type B = { y: string; };
 * 
 * // Resulting type will be { x: number; }
 * type Result = Diff<A, B>;
 */

export type Diff<T, U> = T extends U
  ? never
  : T;