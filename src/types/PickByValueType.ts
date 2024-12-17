/**
 * PickByValueType.ts
 * 
 * This file contains a utility type `PickByValue` that constructs a new type by picking 
 * properties from an existing type `T` whose values are of a specified type `V`.
 * 
 * @template T - The source type from which to pick properties.
 * @template V - The value type to match for picking properties.
 * 
 * @example
 * // Given type
 * type Example = {
 *   a: number;
 *   b: string;
 *   c: boolean;
 * };
 * 
 * // Resulting type will be { b: string; }
 * type Picked = PickByValue<Example, string>;
 */

export type PickByValue<T, V> = {
    [K in keyof T as T[K] extends V ? K : never]: T[K];
};
