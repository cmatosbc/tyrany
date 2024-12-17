/**
 * UnionToArray.ts
 * 
 * This file contains a utility type `UnionToArray` that converts a union type `U` 
 * into an array type. This is useful for cases where you need to work with the 
 * individual types in a union as an array.
 * 
 * @template U - The union type to convert to an array.
 * 
 * @example
 * // Given a union type
 * type Example = 'a' | 'b' | 'c';
 * 
 * // Resulting type will be ['a', 'b', 'c']
 * type Result = UnionToArray<Example>;
 */

export type UnionToArray<T> = T extends any ? T[] : never;
