/**
 * Extracts the common keys between two types.
 * 
 * @template T - First type to compare
 * @template U - Second type to compare
 * @returns A union type of all keys that exist in both T and U
 * 
 * @example
 * ```typescript
 * type A = { x: number; y: string; z: boolean };
 * type B = { x: string; y: number; w: boolean };
 * type Common = IntersectKeys<A, B>; // 'x' | 'y'
 * ```
 */
export type IntersectKeys<T, U> = keyof T & keyof U;